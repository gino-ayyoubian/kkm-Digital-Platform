import * as React from 'react';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RoomEnvironment } from 'three/examples/jsm/environments/RoomEnvironment.js';
import { useLanguage } from '../../LanguageContext';
import { ThreeControlDock, type ThreeSceneControls } from './ThreeControlDock';
import { Info, Sparkles, AlertCircle, RefreshCw } from 'lucide-react';

interface GMELPowerIsland3DProps {
  className?: string;
  autoRotate?: boolean;
  initialPreset?: 'isometric' | 'subsurface' | 'turbine' | 'topDown';
  onComponentSelect?: (componentName: string | null) => void;
}

// Pre-allocated reusable math scratchpads outside render loop (Zero GC)
const _vec3A = new THREE.Vector3();
const _vec3B = new THREE.Vector3();
const _mat4 = new THREE.Matrix4();
const _color = new THREE.Color();

export const GMELPowerIsland3D: React.FC<GMELPowerIsland3DProps> = ({
  className = 'w-full h-[640px]',
  autoRotate = true,
  initialPreset = 'isometric',
  onComponentSelect,
}) => {
  const { isFa } = useLanguage();
  const mountRef = React.useRef<HTMLDivElement>(null);

  // High-level scene interactive state
  const [controlsState, setControlsState] = React.useState<ThreeSceneControls>({
    showSubsurface: true,
    showSurfaceIsland: true,
    showFluidParticles: true,
    showWireframe: false,
    explodedOffset: 0,
    flowSpeedMultiplier: 1.0,
    activeCameraPreset: initialPreset,
    activeComponentInfo: null,
  });

  const [selectedComponentData, setSelectedComponentData] = React.useState<{
    titleEn: string;
    titleFa: string;
    specEn: string;
    specFa: string;
    temp: string;
    pressure: string;
  } | null>(null);

  const [webGlError, setWebGlError] = React.useState<string | null>(null);

  // Mutable refs to bridge React state into the 60fps render loop
  const sceneRef = React.useRef<THREE.Scene | null>(null);
  const cameraRef = React.useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = React.useRef<THREE.WebGLRenderer | null>(null);
  const orbitRef = React.useRef<OrbitControls | null>(null);

  const subsurfaceGroupRef = React.useRef<THREE.Group | null>(null);
  const surfaceGroupRef = React.useRef<THREE.Group | null>(null);
  const particlesMeshRef = React.useRef<THREE.InstancedMesh | null>(null);
  const particlePositionsRef = React.useRef<{ curvePos: number; speed: number }[]>([]);
  const loopCurveRef = React.useRef<THREE.CatmullRomCurve3 | null>(null);

  const controlsStateRef = React.useRef(controlsState);
  controlsStateRef.current = controlsState;

  // Camera Target lerping ref
  const cameraTargetRef = React.useRef({
    x: 0,
    y: 0,
    z: 0,
    camX: 18,
    camY: 14,
    camZ: 22,
    active: false,
  });

  // Apply Camera Preset transitions smoothly
  const applyCameraPreset = React.useCallback((preset: 'isometric' | 'subsurface' | 'turbine' | 'topDown') => {
    setControlsState(prev => ({ ...prev, activeCameraPreset: preset }));
    
    switch (preset) {
      case 'subsurface':
        cameraTargetRef.current = {
          x: 0, y: -9, z: 0,
          camX: 14, camY: -8, camZ: 18,
          active: true,
        };
        break;
      case 'turbine':
        cameraTargetRef.current = {
          x: 0, y: 1.5, z: 0,
          camX: 6, camY: 4.5, camZ: 8,
          active: true,
        };
        break;
      case 'topDown':
        cameraTargetRef.current = {
          x: 0, y: 0, z: 0,
          camX: 0.1, camY: 28, camZ: 0.1,
          active: true,
        };
        break;
      case 'isometric':
      default:
        cameraTargetRef.current = {
          x: 0, y: 0, z: 0,
          camX: 18, camY: 14, camZ: 22,
          active: true,
        };
        break;
    }
  }, []);

  const resetCamera = React.useCallback(() => {
    applyCameraPreset('isometric');
  }, [applyCameraPreset]);

  // Main Three.js Scene Setup & Lifecycle
  React.useEffect(() => {
    const container = mountRef.current;
    if (!container) return;

    // Detect software WebGL per system skill
    const isSoftwareGl = (() => {
      try {
        const gl = document.createElement('canvas').getContext('webgl2');
        if (!gl) return true;
        const ext = gl.getExtension('WEBGL_debug_renderer_info');
        const param = ext ? ext.UNMASKED_RENDERER_WEBGL : gl.RENDERER;
        const gpu = String(gl.getParameter(param));
        gl.getExtension('WEBGL_lose_context')?.loseContext();
        return /SwiftShader|llvmpipe|softpipe|Software|Basic Render/i.test(gpu);
      } catch {
        return true;
      }
    })();

    // 1. Scene & Atmosphere
    const scene = new THREE.Scene();
    sceneRef.current = scene;
    scene.background = new THREE.Color(0x020b18);
    scene.fog = new THREE.FogExp2(0x020b18, 0.016);

    // 2. Camera
    const width = container.clientWidth || 800;
    const height = container.clientHeight || 600;
    const camera = new THREE.PerspectiveCamera(42, width / height, 0.5, 200);
    camera.position.set(18, 14, 22);
    cameraRef.current = camera;

    // 3. Renderer with ACESFilmic Tone Mapping
    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({
        antialias: !isSoftwareGl,
        powerPreference: 'high-performance',
        alpha: false,
      });
    } catch (err) {
      setWebGlError(String(err));
      return;
    }

    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.15;
    renderer.setPixelRatio(isSoftwareGl ? 1 : Math.min(window.devicePixelRatio, 2));
    renderer.setSize(width, height);
    renderer.shadowMap.enabled = !isSoftwareGl;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    rendererRef.current = renderer;

    container.appendChild(renderer.domElement);

    // 4. Studio Environment Reflections via PMREM
    try {
      const pmrem = new THREE.PMREMGenerator(renderer);
      const roomEnv = new RoomEnvironment();
      scene.environment = pmrem.fromScene(roomEnv, 0.04).texture;
      pmrem.dispose();
    } catch (e) {
      console.warn('Three.js PMREM RoomEnvironment fallback:', e);
    }

    // 5. Studio Lighting Rig (Warm Key + Cool Hemisphere + Cyan Accent)
    const keyLight = new THREE.DirectionalLight(0xfff1dc, 2.8);
    keyLight.position.set(16, 26, 14);
    keyLight.castShadow = !isSoftwareGl;
    keyLight.shadow.mapSize.width = 1024;
    keyLight.shadow.mapSize.height = 1024;
    keyLight.shadow.camera.near = 2;
    keyLight.shadow.camera.far = 60;
    keyLight.shadow.camera.left = -16;
    keyLight.shadow.camera.right = 16;
    keyLight.shadow.camera.top = 16;
    keyLight.shadow.camera.bottom = -16;
    keyLight.shadow.bias = -0.0004;
    keyLight.shadow.normalBias = 0.02;
    scene.add(keyLight);

    const hemiLight = new THREE.HemisphereLight(0x00f0ff, 0x07111e, 1.4);
    scene.add(hemiLight);

    const deepGlowLight = new THREE.PointLight(0xffa500, 2.5, 20);
    deepGlowLight.position.set(0, -14, 0);
    scene.add(deepGlowLight);

    const turbineGlowLight = new THREE.PointLight(0x00f0ff, 1.8, 12);
    turbineGlowLight.position.set(0, 2, 0);
    scene.add(turbineGlowLight);

    // 6. Camera OrbitControls with Inertia Damping
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;
    controls.maxPolarAngle = Math.PI / 2 + 0.35; // allow viewing slightly below horizon
    controls.minDistance = 6;
    controls.maxDistance = 55;
    controls.target.set(0, 0, 0);
    orbitRef.current = controls;

    // Track manual interaction
    let userIsInteracting = false;
    controls.addEventListener('start', () => { userIsInteracting = true; });
    controls.addEventListener('end', () => { userIsInteracting = false; });

    // 7. Ground Contact Shadow & Grid Pad
    const contactShadowGeo = new THREE.PlaneGeometry(36, 36);
    const contactShadowMat = new THREE.MeshBasicMaterial({
      color: 0x000000,
      transparent: true,
      opacity: 0.55,
      depthWrite: false,
    });
    const contactShadow = new THREE.Mesh(contactShadowGeo, contactShadowMat);
    contactShadow.rotation.x = -Math.PI / 2;
    contactShadow.position.y = -0.01;
    scene.add(contactShadow);

    // Circular Holographic Grid Floor
    const gridHelper = new THREE.PolarGridHelper(18, 16, 8, 64, 0x00f0ff, 0x1e293b);
    gridHelper.position.y = 0.01;
    scene.add(gridHelper);

    // =========================================================================
    // 8. PROCEDURAL 3D GMEL POWER ISLAND MODEL (3-to-12 Composite Parts)
    // =========================================================================

    // Group A: Subsurface Geothermal Reservoir & Wells
    const subsurfaceGroup = new THREE.Group();
    subsurfaceGroup.name = 'SubsurfaceGroup';
    subsurfaceGroupRef.current = subsurfaceGroup;
    scene.add(subsurfaceGroup);

    // Part 1: Stratum Geological Layer Cylinder (Half Cutaway)
    const stratumGeo = new THREE.CylinderGeometry(11, 12, 16, 48, 4, true, 0, Math.PI * 1.5);
    const stratumMat = new THREE.MeshStandardMaterial({
      color: 0x0b132b,
      roughness: 0.85,
      metalness: 0.15,
      side: THREE.DoubleSide,
      wireframe: false,
    });
    const stratumMesh = new THREE.Mesh(stratumGeo, stratumMat);
    stratumMesh.position.y = -8;
    stratumMesh.receiveShadow = !isSoftwareGl;
    subsurfaceGroup.add(stratumMesh);

    // Part 2: Deep Reservoir Heat Exchange Coil & U-Tube Curve
    const wellCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(-1.8, 0, 0),
      new THREE.Vector3(-1.8, -5, 0),
      new THREE.Vector3(-2.2, -10, 0.5),
      new THREE.Vector3(-1.5, -14, 0),
      new THREE.Vector3(0, -15.5, -0.8), // Bottom reservoir loop apex
      new THREE.Vector3(1.5, -14, 0),
      new THREE.Vector3(2.2, -10, -0.5),
      new THREE.Vector3(1.8, -5, 0),
      new THREE.Vector3(1.8, 0, 0),
      new THREE.Vector3(1.8, 1.2, 0),
      new THREE.Vector3(0, 1.6, 0),
      new THREE.Vector3(-1.8, 1.2, 0),
    ], true);
    loopCurveRef.current = wellCurve;

    const wellTubeGeo = new THREE.TubeGeometry(wellCurve, 128, 0.28, 16, true);
    const wellTubeMat = new THREE.MeshPhysicalMaterial({
      color: 0x00f0ff,
      roughness: 0.2,
      metalness: 0.9,
      transmission: isSoftwareGl ? 0 : 0.75,
      transparent: true,
      opacity: 0.85,
      ior: 1.45,
    });
    const wellTubeMesh = new THREE.Mesh(wellTubeGeo, wellTubeMat);
    wellTubeMesh.name = 'SupercriticalClosedLoop';
    subsurfaceGroup.add(wellTubeMesh);

    // Part 3: Deep Injection Well Casings (Borehole Rings)
    const casingGeo = new THREE.CylinderGeometry(0.55, 0.55, 14, 16);
    const casingMat = new THREE.MeshStandardMaterial({
      color: 0x334155,
      roughness: 0.35,
      metalness: 0.85,
    });
    const injCasing = new THREE.Mesh(casingGeo, casingMat);
    injCasing.position.set(-1.8, -7, 0);
    subsurfaceGroup.add(injCasing);

    const prodCasing = new THREE.Mesh(casingGeo, casingMat);
    prodCasing.position.set(1.8, -7, 0);
    subsurfaceGroup.add(prodCasing);

    // Part 4: Geothermal Heat Reservoir Core (Luminescent Emissive Sphere)
    const reservoirCoreGeo = new THREE.SphereGeometry(3.2, 32, 24);
    const reservoirCoreMat = new THREE.MeshStandardMaterial({
      color: 0xff6600,
      emissive: 0xff4500,
      emissiveIntensity: 0.6,
      roughness: 0.7,
      transparent: true,
      opacity: 0.7,
    });
    const reservoirCore = new THREE.Mesh(reservoirCoreGeo, reservoirCoreMat);
    reservoirCore.position.set(0, -15, 0);
    reservoirCore.name = 'GeothermalReservoirCore';
    subsurfaceGroup.add(reservoirCore);

    // Part 5: Kinetic Supercritical Fluid Particles (InstancedMesh along wellCurve)
    const PARTICLE_COUNT = 90;
    const particleSphereGeo = new THREE.SphereGeometry(0.14, 8, 8);
    const particleMat = new THREE.MeshBasicMaterial({
      color: 0x00f0ff,
    });
    const particlesMesh = new THREE.InstancedMesh(particleSphereGeo, particleMat, PARTICLE_COUNT);
    particlesMesh.name = 'FluidParticles';
    particlesMeshRef.current = particlesMesh;
    subsurfaceGroup.add(particlesMesh);

    const particleStates: { curvePos: number; speed: number }[] = [];
    for (let i = 0; i < PARTICLE_COUNT; i++) {
      particleStates.push({
        curvePos: i / PARTICLE_COUNT,
        speed: 0.0018 + Math.random() * 0.0006,
      });
    }
    particlePositionsRef.current = particleStates;

    // Group B: Surface Power Island & Turbomachinery
    const surfaceGroup = new THREE.Group();
    surfaceGroup.name = 'SurfaceIslandGroup';
    surfaceGroupRef.current = surfaceGroup;
    scene.add(surfaceGroup);

    // Part 6: Foundation Structural Slab (Octagonal / Rounded Platform)
    const slabGeo = new THREE.CylinderGeometry(7.5, 8.2, 0.6, 16);
    const slabMat = new THREE.MeshStandardMaterial({
      color: 0x1e293b,
      roughness: 0.65,
      metalness: 0.45,
    });
    const slabMesh = new THREE.Mesh(slabGeo, slabMat);
    slabMesh.position.y = 0.3;
    slabMesh.castShadow = !isSoftwareGl;
    slabMesh.receiveShadow = !isSoftwareGl;
    surfaceGroup.add(slabMesh);

    // Part 7: Organic Rankine Cycle (ORC) Turbine Generator Hall
    const turbineHallGroup = new THREE.Group();
    turbineHallGroup.name = 'ORCTurbineHall';
    turbineHallGroup.position.set(0, 0.6, 2.5);

    // Turbine housing cylinder
    const turbineBodyGeo = new THREE.CylinderGeometry(0.9, 0.9, 3.4, 24);
    turbineBodyGeo.rotateZ(Math.PI / 2);
    const turbineBodyMat = new THREE.MeshStandardMaterial({
      color: 0x0284c7, // KKM Blue
      roughness: 0.25,
      metalness: 0.92,
    });
    const turbineBody = new THREE.Mesh(turbineBodyGeo, turbineBodyMat);
    turbineBody.position.y = 1.1;
    turbineBody.castShadow = !isSoftwareGl;
    turbineHallGroup.add(turbineBody);

    // Generator housing (Gold accent)
    const generatorGeo = new THREE.CylinderGeometry(1.1, 1.1, 2.2, 24);
    generatorGeo.rotateZ(Math.PI / 2);
    const generatorMat = new THREE.MeshStandardMaterial({
      color: 0xffc107, // KKM Amber/Gold
      roughness: 0.3,
      metalness: 0.85,
    });
    const generatorMesh = new THREE.Mesh(generatorGeo, generatorMat);
    generatorMesh.position.set(2.4, 1.1, 0);
    generatorMesh.castShadow = !isSoftwareGl;
    turbineHallGroup.add(generatorMesh);

    // Steam inlet manifold
    const manifoldGeo = new THREE.TorusGeometry(0.8, 0.15, 12, 24, Math.PI);
    manifoldGeo.rotateX(Math.PI / 2);
    const manifoldMat = new THREE.MeshStandardMaterial({
      color: 0x94a3b8,
      roughness: 0.2,
      metalness: 0.95,
    });
    const manifoldMesh = new THREE.Mesh(manifoldGeo, manifoldMat);
    manifoldMesh.position.set(0, 2.0, 0);
    turbineHallGroup.add(manifoldMesh);

    surfaceGroup.add(turbineHallGroup);

    // Part 8: Shell & Tube Heat Exchanger Array
    const hxGroup = new THREE.Group();
    hxGroup.name = 'HeatExchangerBanks';
    hxGroup.position.set(-3.2, 0.6, -1.5);

    const hxVesselGeo = new THREE.CylinderGeometry(0.65, 0.65, 4.2, 20);
    hxVesselGeo.rotateX(Math.PI / 2);
    const hxVesselMat = new THREE.MeshStandardMaterial({
      color: 0x38bdf8,
      roughness: 0.3,
      metalness: 0.88,
    });

    for (let i = 0; i < 3; i++) {
      const v = new THREE.Mesh(hxVesselGeo, hxVesselMat);
      v.position.set(i * 1.2 - 1.2, 0.9, 0);
      v.castShadow = !isSoftwareGl;
      hxGroup.add(v);
    }
    surfaceGroup.add(hxGroup);

    // Part 9: Hyperbolic Wet/Dry Hybrid Cooling Towers (Lathe Geometry)
    const towerPoints: THREE.Vector2[] = [];
    for (let i = 0; i <= 10; i++) {
      const t = i / 10;
      const y = t * 3.8;
      // Hyperbolic waist contour
      const r = 1.3 - 0.4 * Math.sin(t * Math.PI) + 0.3 * (t > 0.8 ? (t - 0.8) * 2 : 0);
      towerPoints.push(new THREE.Vector2(r, y));
    }
    const towerGeo = new THREE.LatheGeometry(towerPoints, 24);
    const towerMat = new THREE.MeshStandardMaterial({
      color: 0x475569,
      roughness: 0.6,
      metalness: 0.3,
      side: THREE.DoubleSide,
    });

    const tower1 = new THREE.Mesh(towerGeo, towerMat);
    tower1.name = 'CoolingTowerAlpha';
    tower1.position.set(3.4, 0.6, -2.8);
    tower1.castShadow = !isSoftwareGl;
    surfaceGroup.add(tower1);

    const tower2 = new THREE.Mesh(towerGeo, towerMat);
    tower2.name = 'CoolingTowerBeta';
    tower2.position.set(0.6, 0.6, -4.2);
    tower2.castShadow = !isSoftwareGl;
    surfaceGroup.add(tower2);

    // Part 10: Seawater / River Water Nexus Desalination Manifold
    const pipePoints = [
      new THREE.Vector3(-5.5, 0.7, 0),
      new THREE.Vector3(-4.0, 0.7, 0),
      new THREE.Vector3(-3.2, 0.7, -1.2),
      new THREE.Vector3(-3.2, 0.7, -3.5),
    ];
    const pipeCurve = new THREE.CatmullRomCurve3(pipePoints);
    const pipeGeo = new THREE.TubeGeometry(pipeCurve, 32, 0.22, 12, false);
    const pipeMat = new THREE.MeshStandardMaterial({
      color: 0x06b6d4, // Cyan
      roughness: 0.2,
      metalness: 0.9,
    });
    const waterPipeMesh = new THREE.Mesh(pipeGeo, pipeMat);
    waterPipeMesh.name = 'NexusDesalinationLoop';
    surfaceGroup.add(waterPipeMesh);

    // =========================================================================
    // 9. RAYCASTING & INTERACTION
    // =========================================================================
    const raycaster = new THREE.Raycaster();
    const mouse = new THREE.Vector2();

    const handlePointerDown = (event: MouseEvent) => {
      const rect = renderer.domElement.getBoundingClientRect();
      mouse.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      mouse.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      raycaster.setFromCamera(mouse, camera);
      const intersects = raycaster.intersectObjects([
        turbineBody,
        generatorMesh,
        wellTubeMesh,
        reservoirCore,
        tower1,
        waterPipeMesh,
      ], false);

      if (intersects.length > 0) {
        const hit = intersects[0].object;
        let compKey = 'generic';

        if (hit === turbineBody || hit === generatorMesh) {
          compKey = 'turbine';
          setSelectedComponentData({
            titleEn: 'Organic Rankine Cycle (ORC) Turbine Generator',
            titleFa: 'توربین و ژنراتور سیکل رنکین آلی (ORC)',
            specEn: 'Direct sCO2 expansion turbine, magnetic levitation bearings, 48.5 MWe net generation.',
            specFa: 'توربین انبساط مستقیم sCO2 با یاتاقان‌های مغناطیسی معلق و بازدهی الکتریکی ناخالص ۴۸.۵ مگاوات.',
            temp: '185 °C',
            pressure: '65 Bar',
          });
        } else if (hit === wellTubeMesh || hit === reservoirCore) {
          compKey = 'reservoir';
          setSelectedComponentData({
            titleEn: 'GMEL Subsurface Closed-Loop Heat Exchanger',
            titleFa: 'مبدل حرارتی چاه عمیق مدار بسته GMEL',
            specEn: 'Proprietary closed U-loop deep well at 3,850m with zero fluid extraction and zero induced seismicity.',
            specFa: 'چاه عمیق مدار بسته ۳,۸۵۰ متری با جذب حرارت بدون برداشت آب و صفر درصد فرکینگ زمین‌لرزه‌ای.',
            temp: '224 °C',
            pressure: '420 Bar',
          });
        } else if (hit === tower1) {
          compKey = 'cooling';
          setSelectedComponentData({
            titleEn: 'Hybrid Wet/Dry Geothermal Condenser & Cooling Tower',
            titleFa: 'برج خنک‌کننده هیبریدی خشک و تر زمین‌گرمایی',
            specEn: 'Ultra-low evaporation plume condensing system tailored for arid and semi-arid terrain.',
            specFa: 'سامانه چگالش حرارتی با حداقل تبخیر آب مناسب برای مناطق بیابانی و خشک کشور.',
            temp: '38 °C',
            pressure: '1.2 Bar',
          });
        } else if (hit === waterPipeMesh) {
          compKey = 'desal';
          setSelectedComponentData({
            titleEn: 'MED Industrial Desalination & District Heating Manifold',
            titleFa: 'رابط بخار کم‌فشار آب‌شیرین‌کن MED و گرمایش منطقه‌ای',
            specEn: 'Cascaded thermal discharge powering 18,000 m³/day multi-effect thermal seawater desalination.',
            specFa: 'بازیافت حرارت اتلافی جهت تولید روزانه ۱۸,۰۰۰ مترمکعب آب شیرین بدون مصرف برق اضافی.',
            temp: '82 °C',
            pressure: '4.5 Bar',
          });
        }

        onComponentSelect?.(compKey);
      }
    };

    renderer.domElement.addEventListener('pointerdown', handlePointerDown);

    // =========================================================================
    // 10. ANIMATION & RENDER LOOP (Exponential Damping & Particle Kinematics)
    // =========================================================================
    let frameId = 0;
    let lastTime = performance.now();

    const tick = () => {
      const now = performance.now();
      const dt = Math.min((now - lastTime) / 1000, 0.1);
      lastTime = now;

      const currentControls = controlsStateRef.current;

      // 1. Camera target interpolation (Exponential Damping)
      if (cameraTargetRef.current.active) {
        const ct = cameraTargetRef.current;
        camera.position.x = THREE.MathUtils.damp(camera.position.x, ct.camX, 4, dt);
        camera.position.y = THREE.MathUtils.damp(camera.position.y, ct.camY, 4, dt);
        camera.position.z = THREE.MathUtils.damp(camera.position.z, ct.camZ, 4, dt);

        controls.target.x = THREE.MathUtils.damp(controls.target.x, ct.x, 5, dt);
        controls.target.y = THREE.MathUtils.damp(controls.target.y, ct.y, 5, dt);
        controls.target.z = THREE.MathUtils.damp(controls.target.z, ct.z, 5, dt);

        if (camera.position.distanceTo(_vec3A.set(ct.camX, ct.camY, ct.camZ)) < 0.1) {
          cameraTargetRef.current.active = false;
        }
      }

      // 2. Exploded View Layer Separation (Exponential Damping)
      const targetSubsurfaceY = -currentControls.explodedOffset * 8;
      const targetSurfaceY = currentControls.explodedOffset * 4;
      subsurfaceGroup.position.y = THREE.MathUtils.damp(subsurfaceGroup.position.y, targetSubsurfaceY, 5, dt);
      surfaceGroup.position.y = THREE.MathUtils.damp(surfaceGroup.position.y, targetSurfaceY, 5, dt);

      // 3. Layer Visibility
      subsurfaceGroup.visible = currentControls.showSubsurface;
      surfaceGroup.visible = currentControls.showSurfaceIsland;

      // 4. Wireframe Toggle
      stratumMat.wireframe = currentControls.showWireframe;
      slabMat.wireframe = currentControls.showWireframe;

      // 5. Kinetic Particle Circulation along Well Curve
      if (currentControls.showFluidParticles && particlesMeshRef.current && loopCurveRef.current) {
        particlesMeshRef.current.visible = true;
        const curve = loopCurveRef.current;
        const speedMult = currentControls.flowSpeedMultiplier;

        particleStates.forEach((p, idx) => {
          p.curvePos = (p.curvePos + p.speed * speedMult) % 1.0;
          curve.getPointAt(p.curvePos, _vec3A);

          _mat4.makeTranslation(_vec3A.x, _vec3A.y, _vec3A.z);
          particlesMeshRef.current!.setMatrixAt(idx, _mat4);

          // Color gradient: Hot yellow/red when deep, cyan/blue when returning to surface
          if (p.curvePos > 0.35 && p.curvePos < 0.65) {
            _color.setHex(0xffaa00); // Supercritical heated
          } else {
            _color.setHex(0x00f0ff); // Cooled supercritical cycle
          }
          particlesMeshRef.current!.setColorAt(idx, _color);
        });
        particlesMeshRef.current.instanceMatrix.needsUpdate = true;
        if (particlesMeshRef.current.instanceColor) {
          particlesMeshRef.current.instanceColor.needsUpdate = true;
        }
      } else if (particlesMeshRef.current) {
        particlesMeshRef.current.visible = false;
      }

      // 6. Subtle auto-rotation if enabled and user not interacting
      if (autoRotate && !userIsInteracting) {
        controls.autoRotate = true;
        controls.autoRotateSpeed = 0.5 * currentControls.flowSpeedMultiplier;
      } else {
        controls.autoRotate = false;
      }

      controls.update();
      renderer.render(scene, camera);

      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);

    // Handle Window Resize
    const handleResize = () => {
      if (!container || !rendererRef.current || !cameraRef.current) return;
      const w = container.clientWidth;
      const h = container.clientHeight;
      cameraRef.current.aspect = w / h;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(w, h);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(frameId);
      window.removeEventListener('resize', handleResize);
      renderer.domElement.removeEventListener('pointerdown', handlePointerDown);

      controls.dispose();
      renderer.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, [autoRotate, onComponentSelect]);

  return (
    <div className={`relative overflow-hidden rounded-3xl border border-cyan-500/30 bg-slate-950 ${className}`}>
      
      {/* Three.js Isolated Canvas Ref Container */}
      <div 
        ref={mountRef} 
        className="w-full h-full cursor-grab active:cursor-grabbing select-none"
        aria-label={isFa ? 'مدل سه‌بعدی تعاملی نیروگاه و چاه زمین‌گرمایی مدار بسته GMEL' : 'Interactive 3D GMEL Geothermal Power Island Model'}
      />

      {/* Fallback Error Overlay if WebGL Fails */}
      {webGlError && (
        <div className="absolute inset-0 z-30 flex items-center justify-center p-6 bg-slate-950/90 text-center">
          <div className="max-w-md p-6 bg-slate-900 border border-red-500/40 rounded-2xl">
            <AlertCircle className="w-10 h-10 text-red-400 mx-auto mb-3" />
            <h4 className="text-base font-bold text-white mb-2">{isFa ? 'خطای بارگذاری رندرینگ سه‌بعدی' : 'WebGL Initialization Error'}</h4>
            <p className="text-xs text-slate-300 leading-relaxed">{webGlError}</p>
          </div>
        </div>
      )}

      {/* Top Floating Semantic Status Badge (Clean Unboxed Metadata, Zero Pulsing Dots) */}
      <div className="absolute top-4 start-4 z-20 pointer-events-none flex flex-col gap-1.5">
        <div className="flex items-center gap-2 text-xs font-mono font-bold text-cyan-300 bg-slate-950/85 border border-cyan-500/40 px-3 py-1.5 rounded-xl shadow-lg backdrop-blur-md">
          <span className="w-2 h-2 rounded-full bg-cyan-400" />
          <span>GMEL-3D // DIGITAL TWIN CORE</span>
          <span className="text-slate-500">·</span>
          <span className="text-slate-300">TRL-7 OPERATIONAL</span>
        </div>
        <p className="text-[11px] text-slate-400 font-sans max-w-xs drop-shadow-md">
          {isFa 
            ? 'کلیک روی اجزای نیروگاه و چاه برای مشاهده مشخصات دقیق فنی.' 
            : 'Click components to inspect real-time technical telemetry.'}
        </p>
      </div>

      {/* Selected Component Inspection Flyout (Semantic DOM overlay) */}
      {selectedComponentData && (
        <div className="absolute top-4 end-4 z-20 max-w-xs bg-slate-950/95 border border-cyan-500/50 rounded-2xl p-4 shadow-2xl text-start pointer-events-auto">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold tracking-wider">
              {isFa ? 'مولفه انتخاب‌شده' : 'Inspected Subsystem'}
            </span>
            <button
              type="button"
              onClick={() => setSelectedComponentData(null)}
              className="text-slate-400 hover:text-white text-xs p-1"
            >
              ✕
            </button>
          </div>
          <h5 className="text-sm font-bold text-white mb-1.5">
            {isFa ? selectedComponentData.titleFa : selectedComponentData.titleEn}
          </h5>
          <p className="text-xs text-slate-300 leading-relaxed mb-3">
            {isFa ? selectedComponentData.specFa : selectedComponentData.specEn}
          </p>
          <div className="grid grid-cols-2 gap-2 pt-2 border-t border-slate-800 text-[11px] font-mono">
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <span className="text-slate-400 block text-[9px]">{isFa ? 'دمای کاری' : 'Temperature'}</span>
              <span className="font-bold text-amber-400">{selectedComponentData.temp}</span>
            </div>
            <div className="bg-slate-900 p-1.5 rounded-lg">
              <span className="text-slate-400 block text-[9px]">{isFa ? 'فشار داخلی' : 'Pressure'}</span>
              <span className="font-bold text-cyan-400">{selectedComponentData.pressure}</span>
            </div>
          </div>
        </div>
      )}

      {/* Ergonomic Collapsible Bottom Control Dock */}
      <ThreeControlDock
        controls={controlsState}
        onChangeControls={setControlsState}
        onResetCamera={resetCamera}
        onSelectPreset={applyCameraPreset}
      />
    </div>
  );
};
