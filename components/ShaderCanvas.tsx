import React, { useEffect, useRef, useState, useCallback } from 'react';

export type ShaderMode = 'subsurface' | 'planetary' | 'molecular';
export type ColormapMode = 'thermal' | 'velocity' | 'stress' | 'flux';
export type FluidType = 'sco2' | 'nanofluid' | 'water' | 'oil';

interface ShaderCanvasProps {
  mode: ShaderMode;
  depth: number; // 1000 to 5500 meters
  massFlowRate: number; // 5 to 60 kg/s
  thermalGradient: number; // 25 to 70 °C/km
  fluidType: FluidType;
  colormap: ColormapMode;
  isPaused: boolean;
  onFpsUpdate?: (fps: number) => void;
  onCanvasReady?: (canvas: HTMLCanvasElement | null) => void;
}

const VERTEX_SHADER = `#version 300 es
in vec2 position;
out vec2 vUv;
void main() {
  vUv = (position + 1.0) * 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

// Fragment Shader for Subsurface Geothermal (GMEL-CLG)
const FRAGMENT_SHADER_SUBSURFACE = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_depth;           // normalized 0.0 - 1.0 (1000m - 5500m)
uniform float u_flowRate;        // normalized 0.0 - 1.0 (5 - 60 kg/s)
uniform float u_thermalGradient; // normalized 0.0 - 1.0 (25 - 70 C/km)
uniform int u_colormap;          // 0: thermal, 1: velocity, 2: stress, 3: flux
uniform vec2 u_mouse;

// Simplex/Perlin noise approximation
float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
  for (int i = 0; i < 5; ++i) {
    v += a * noise(p);
    p = rot * p * 2.0 + vec2(100.0);
    a *= 0.5;
  }
  return v;
}

vec3 getThermalColormap(float t) {
  // Planck thermal curve: Blue -> Cyan -> Yellow -> Orange -> Red -> White
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.05, 0.10, 0.25); // cold crust
  vec3 c1 = vec3(0.10, 0.40, 0.70); // upper reservoir
  vec3 c2 = vec3(0.15, 0.75, 0.60); // thermal transition
  vec3 c3 = vec3(0.95, 0.75, 0.15); // convective zone
  vec3 c4 = vec3(0.95, 0.35, 0.05); // supercritical core
  vec3 c5 = vec3(1.00, 0.95, 0.85); // maximum enthalpy hotspot

  if (t < 0.2) return mix(c0, c1, t / 0.2);
  if (t < 0.4) return mix(c1, c2, (t - 0.2) / 0.2);
  if (t < 0.6) return mix(c2, c3, (t - 0.4) / 0.2);
  if (t < 0.8) return mix(c3, c4, (t - 0.6) / 0.2);
  return mix(c4, c5, (t - 0.8) / 0.2);
}

vec3 getVelocityColormap(float t) {
  // High energy velocity field: dark slate -> emerald -> cyan -> white
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.03, 0.07, 0.12);
  vec3 c1 = vec3(0.05, 0.45, 0.35);
  vec3 c2 = vec3(0.10, 0.80, 0.70);
  vec3 c3 = vec3(0.70, 1.00, 0.90);
  if (t < 0.33) return mix(c0, c1, t / 0.33);
  if (t < 0.66) return mix(c1, c2, (t - 0.33) / 0.33);
  return mix(c2, c3, (t - 0.66) / 0.34);
}

vec3 getStressColormap(float t) {
  // Tectonic shear stress: violet -> magenta -> gold
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.10, 0.05, 0.20);
  vec3 c1 = vec3(0.45, 0.10, 0.60);
  vec3 c2 = vec3(0.85, 0.20, 0.45);
  vec3 c3 = vec3(1.00, 0.85, 0.30);
  if (t < 0.33) return mix(c0, c1, t / 0.33);
  if (t < 0.66) return mix(c1, c2, (t - 0.33) / 0.33);
  return mix(c2, c3, (t - 0.66) / 0.34);
}

vec3 getFluxColormap(float t) {
  // Energy flux: deep amber -> solar gold -> pure electric white
  t = clamp(t, 0.0, 1.0);
  vec3 c0 = vec3(0.12, 0.04, 0.02);
  vec3 c1 = vec3(0.60, 0.25, 0.05);
  vec3 c2 = vec3(0.95, 0.65, 0.10);
  vec3 c3 = vec3(1.00, 0.98, 0.90);
  if (t < 0.33) return mix(c0, c1, t / 0.33);
  if (t < 0.66) return mix(c1, c2, (t - 0.33) / 0.33);
  return mix(c2, c3, (t - 0.66) / 0.34);
}

void main() {
  vec2 uv = vUv;
  float depthRatio = 1.0 - uv.y; // 0 at surface, 1 at bottom

  // Subsurface Geological strata layering
  float rockNoise = fbm(vec2(uv.x * 6.0, uv.y * 14.0 + fbm(uv * 4.0)));
  float fractureNoise = smoothstep(0.48, 0.52, fbm(vec2(uv.x * 12.0 + u_time * 0.02, uv.y * 8.0)));

  // Temperature gradient: T(z) = T_surface + depth * gradient
  float baseTemp = depthRatio * (0.5 + u_thermalGradient * 0.5);
  float localThermalActivity = baseTemp + rockNoise * 0.15 + fractureNoise * 0.18;

  // Borehole U-Tube Coordinates
  float wellCenter = 0.5 + (u_mouse.x - 0.5) * 0.1;
  float wellWidth = 0.035;
  float wellDepthMax = 0.15 + u_depth * 0.75; // normalized reach

  float distToWell = abs(uv.x - wellCenter);
  bool inWell = distToWell < wellWidth && depthRatio < wellDepthMax;
  bool inWellBottom = distToWell < wellWidth && abs(depthRatio - wellDepthMax) < 0.03;

  vec3 color = vec3(0.0);

  if (u_colormap == 0) {
    color = getThermalColormap(localThermalActivity);
  } else if (u_colormap == 1) {
    color = getVelocityColormap(localThermalActivity);
  } else if (u_colormap == 2) {
    color = getStressColormap(localThermalActivity);
  } else {
    color = getFluxColormap(localThermalActivity);
  }

  // Darken geological boundaries
  float layerBoundary = sin(depthRatio * 30.0 + rockNoise * 3.0);
  color *= 0.85 + 0.15 * layerBoundary;

  // Render GMEL Closed-Loop Well & Convective Loop
  if (inWell) {
    float wellX = (uv.x - (wellCenter - wellWidth)) / (wellWidth * 2.0); // 0.0 to 1.0
    float fluidSpeed = 1.5 + u_flowRate * 4.0;
    
    // Left channel: Descending cool/temperate fluid
    // Right channel: Ascending supercritical hot fluid
    if (wellX < 0.45) {
      // Descending annular flow
      float flowCycle = fract(depthRatio * 8.0 - u_time * fluidSpeed * 0.5);
      vec3 fluidCool = vec3(0.2, 0.6, 0.95);
      vec3 pulse = vec3(0.6, 0.85, 1.0) * smoothstep(0.8, 1.0, flowCycle);
      color = mix(color, fluidCool + pulse, 0.85);
    } else if (wellX > 0.55) {
      // Ascending vacuum insulated tubing (supercritical high enthalpy)
      float flowCycle = fract(depthRatio * 8.0 + u_time * fluidSpeed * 0.7);
      vec3 fluidHot = vec3(1.0, 0.4, 0.1) * (0.8 + 0.4 * depthRatio);
      vec3 pulse = vec3(1.0, 0.9, 0.4) * smoothstep(0.8, 1.0, flowCycle);
      color = mix(color, fluidHot + pulse, 0.90);
    } else {
      // Central Vacuum-Insulated Tubing (VIT) wall
      color = vec3(0.1, 0.15, 0.2);
    }
  }

  // Bottom Reservoir Heat Exchanger Zone (Radiative Plume)
  if (inWellBottom) {
    float plume = (1.0 - (distToWell / wellWidth)) * (1.0 - abs(depthRatio - wellDepthMax) / 0.03);
    vec3 glowColor = vec3(1.0, 0.7, 0.2) * (1.0 + sin(u_time * 6.0) * 0.2);
    color += glowColor * plume * 1.5;
  }

  // Add subtle HUD scanline effect
  float scanline = sin(uv.y * u_resolution.y * 0.8) * 0.03;
  color += scanline;

  // Vignette
  float vignette = uv.x * uv.y * (1.0 - uv.x) * (1.0 - uv.y);
  color *= clamp(16.0 * vignette, 0.0, 1.0) * 0.3 + 0.7;

  fragColor = vec4(color, 1.0);
}
`;

// Fragment Shader for Planetary GeoMeta Energy Layer (Global GIS Twin)
const FRAGMENT_SHADER_PLANETARY = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform vec2 u_mouse;
uniform float u_flowRate;

#define PI 3.14159265359

// Sphere intersection
vec2 sphereIntersect(vec3 ro, vec3 rd, float r) {
  float b = dot(ro, rd);
  float c = dot(ro, ro) - r * r;
  float d = b * b - c;
  if (d < 0.0) return vec2(-1.0);
  return vec2(-b - sqrt(d), -b + sqrt(d));
}

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(mix(hash(i + vec2(0.0, 0.0)), hash(i + vec2(1.0, 0.0)), u.x),
             mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x), u.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 4; ++i) {
    v += a * noise(p);
    p = p * 2.0 + vec2(50.0);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);

  // Camera setup
  vec3 ro = vec3(0.0, 0.0, 2.5);
  vec3 rd = normalize(vec3(uv, -1.5));

  // Orbital rotation from time & mouse
  float rotY = u_time * 0.15 + (u_mouse.x - 0.5) * 3.0;
  float rotX = (u_mouse.y - 0.5) * 1.5;

  mat3 rot = mat3(
    cos(rotY), 0.0, sin(rotY),
    sin(rotX)*sin(rotY), cos(rotX), -sin(rotX)*cos(rotY),
    -cos(rotX)*sin(rotY), sin(rotX), cos(rotX)*cos(rotY)
  );

  float sphereRadius = 0.85;
  vec2 hit = sphereIntersect(ro, rd, sphereRadius);

  vec3 color = vec3(0.015, 0.025, 0.05); // Deep space background

  // Atmospheric glow rim
  float distToCenter = length(uv);
  if (distToCenter > sphereRadius && distToCenter < sphereRadius + 0.35) {
    float glow = exp(-(distToCenter - sphereRadius) * 12.0);
    color += vec3(0.15, 0.45, 0.95) * glow * 1.2;
  }

  if (hit.x > 0.0) {
    vec3 p = ro + hit.x * rd;
    vec3 n = normalize(p);
    vec3 rotatedP = rot * p;

    // Spherical coordinates
    float phi = atan(rotatedP.z, rotatedP.x);
    float theta = asin(clamp(rotatedP.y / sphereRadius, -1.0, 1.0));
    vec2 sphereUv = vec2(phi / (2.0 * PI) + 0.5, theta / PI + 0.5);

    // Procedural Earth surface
    float continentNoise = fbm(sphereUv * 6.0);
    bool isLand = continentNoise > 0.46;

    vec3 baseSurface;
    if (isLand) {
      baseSurface = mix(vec3(0.08, 0.18, 0.14), vec3(0.22, 0.18, 0.12), continentNoise);
    } else {
      baseSurface = vec3(0.03, 0.08, 0.22); // Ocean
    }

    // Tectonic heat flow lines (GMEL GeoMeta network)
    float faultLine = smoothstep(0.48, 0.50, abs(sin(sphereUv.x * 20.0 + continentNoise * 4.0)));
    vec3 geoHeatGlow = vec3(1.0, 0.45, 0.1) * (1.0 - faultLine) * 1.8;

    // Highlighted KKM Strategic Energy Hubs (Qeshm, Sarakhs, Assaluyeh)
    vec2 qeshmCoord = vec2(0.58, 0.55);
    float distQeshm = length(fract(sphereUv - qeshmCoord + 0.5) - 0.5);
    float pulseQeshm = exp(-distQeshm * 40.0) * (0.8 + 0.4 * sin(u_time * 5.0));

    // Lighting (Diffuse + Fresnel Rim)
    vec3 lightDir = normalize(vec3(1.0, 0.8, 1.2));
    float diff = max(dot(n, lightDir), 0.05);
    float fresnel = pow(1.0 - max(dot(n, -rd), 0.0), 3.0);

    color = baseSurface * diff + geoHeatGlow * 0.7;
    color += vec3(0.2, 0.6, 1.0) * fresnel * 0.8; // Atmospheric scattering
    color += vec3(0.0, 1.0, 0.8) * pulseQeshm * 2.5; // KKM Hub beacon
  }

  fragColor = vec4(color, 1.0);
}
`;

// Fragment Shader for Molecular Desalination & Plasma Electrolysis
const FRAGMENT_SHADER_MOLECULAR = `#version 300 es
precision highp float;

in vec2 vUv;
out vec4 fragColor;

uniform vec2 u_resolution;
uniform float u_time;
uniform float u_flowRate;
uniform float u_thermalGradient;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution) / min(u_resolution.x, u_resolution.y);
  float t = u_time * (1.0 + u_flowRate * 2.0);

  vec3 col = vec3(0.02, 0.04, 0.09);

  // Central Nanofiltration / Reverse Osmosis Membrane
  float membraneDist = abs(uv.x);
  float membraneGlow = exp(-membraneDist * 20.0);
  col += vec3(0.1, 0.7, 0.9) * membraneGlow * 0.8;

  // Molecular particle field
  for (int i = 0; i < 28; i++) {
    float fi = float(i);
    float angle = fi * 0.224 + t * 0.3;
    float rad = 0.15 + 0.45 * hash(vec2(fi, 1.0));
    vec2 pos = vec2(sin(angle + fi), cos(angle * 1.3)) * rad;

    // Fluid flow across membrane: Left (mineral brine) -> Right (pure water + H2 plasma)
    pos.x += sin(pos.y * 8.0 + t * 2.0) * 0.08;

    float d = length(uv - pos);
    float particle = 0.008 / (d * d + 0.0004);

    if (pos.x < 0.0) {
      // Mineral Brine / Saline Ion (Amber / Crimson)
      col += vec3(1.0, 0.4, 0.1) * particle * 0.04;
    } else {
      // Pure Hydrated Permeate & Ionized Hydrogen H+ (Cyan / Neon Blue)
      col += vec3(0.1, 0.9, 1.0) * particle * 0.05;
    }
  }

  // High-temperature supercritical plasma arcs
  float arc = sin(uv.y * 30.0 + uv.x * 20.0 + t * 6.0) * 
              sin(uv.x * 40.0 - t * 4.0);
  if (abs(arc) > 0.92) {
    col += vec3(0.9, 0.6, 1.0) * 0.3 * (0.5 + u_thermalGradient * 0.5);
  }

  fragColor = vec4(col, 1.0);
}
`;

export const ShaderCanvas: React.FC<ShaderCanvasProps> = ({
  mode,
  depth,
  massFlowRate,
  thermalGradient,
  colormap,
  isPaused,
  onFpsUpdate,
  onCanvasReady
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const glRef = useRef<WebGL2RenderingContext | null>(null);
  const programRef = useRef<WebGLProgram | null>(null);
  const animFrameId = useRef<number | null>(null);
  const startTimeRef = useRef<number>(performance.now());
  const mouseRef = useRef<{ x: number; y: number }>({ x: 0.5, y: 0.5 });
  const isDraggingRef = useRef<boolean>(false);
  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const lastFpsTime = useRef<number>(performance.now());
  const frameCount = useRef<number>(0);

  // Helper to compile shader
  const createShader = (gl: WebGL2RenderingContext, type: number, source: string): WebGLShader | null => {
    const shader = gl.createShader(type);
    if (!shader) return null;
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
      console.warn('GLSL compilation warning:', gl.getShaderInfoLog(shader));
      gl.deleteShader(shader);
      return null;
    }
    return shader;
  };

  // Build program for current mode
  const initWebGL = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl2', {
      alpha: false,
      antialias: true,
      powerPreference: 'high-performance',
      preserveDrawingBuffer: true
    });

    if (!gl) {
      console.warn('WebGL2 not supported, falling back to 2D mode.');
      setWebglSupported(false);
      return;
    }

    glRef.current = gl;

    let fragSource = FRAGMENT_SHADER_SUBSURFACE;
    if (mode === 'planetary') {
      fragSource = FRAGMENT_SHADER_PLANETARY;
    } else if (mode === 'molecular') {
      fragSource = FRAGMENT_SHADER_MOLECULAR;
    }

    const vs = createShader(gl, gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = createShader(gl, gl.FRAGMENT_SHADER, fragSource);

    if (!vs || !fs) {
      setWebglSupported(false);
      return;
    }

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Program link error:', gl.getProgramInfoLog(program));
      gl.deleteProgram(program);
      setWebglSupported(false);
      return;
    }

    programRef.current = program;

    // Full-screen quad
    const positions = new Float32Array([
      -1.0, -1.0,
       1.0, -1.0,
      -1.0,  1.0,
      -1.0,  1.0,
       1.0, -1.0,
       1.0,  1.0
    ]);

    const vao = gl.createVertexArray();
    gl.bindVertexArray(vao);

    const vbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, vbo);
    gl.bufferData(gl.ARRAY_BUFFER, positions, gl.STATIC_DRAW);

    const posAttr = gl.getAttribLocation(program, 'position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    if (onCanvasReady) {
      onCanvasReady(canvas);
    }
  }, [mode, onCanvasReady]);

  // Handle Resize
  useEffect(() => {
    const handleResize = () => {
      const canvas = canvasRef.current;
      const container = containerRef.current;
      if (!canvas || !container) return;

      const rect = container.getBoundingClientRect();
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const width = Math.floor(rect.width * dpr);
      const height = Math.floor(rect.height * dpr);

      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        if (glRef.current) {
          glRef.current.viewport(0, 0, width, height);
        }
      }
    };

    handleResize();
    const ro = new ResizeObserver(handleResize);
    if (containerRef.current) {
      ro.observe(containerRef.current);
    }

    return () => ro.disconnect();
  }, []);

  // Re-init WebGL on mode change
  useEffect(() => {
    initWebGL();
    return () => {
      if (glRef.current && programRef.current) {
        glRef.current.deleteProgram(programRef.current);
        programRef.current = null;
      }
    };
  }, [mode, initWebGL]);

  // Render Loop
  useEffect(() => {
    const gl = glRef.current;
    const canvas = canvasRef.current;
    if (!gl || !programRef.current || !canvas) return;

    let running = true;

    const render = (now: number) => {
      if (!running) return;

      if (!isPaused) {
        const elapsedTime = (now - startTimeRef.current) * 0.001;
        const program = programRef.current;

        if (program) {
          gl.useProgram(program);

          // Resolution uniform
          const uRes = gl.getUniformLocation(program, 'u_resolution');
          if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);

          // Time uniform
          const uTime = gl.getUniformLocation(program, 'u_time');
          if (uTime) gl.uniform1f(uTime, elapsedTime);

          // Depth uniform (normalized: 1000m -> 0.0, 5500m -> 1.0)
          const normDepth = (depth - 1000) / 4500;
          const uDepth = gl.getUniformLocation(program, 'u_depth');
          if (uDepth) gl.uniform1f(uDepth, normDepth);

          // Flow rate uniform (normalized: 5 -> 0.0, 60 -> 1.0)
          const normFlow = (massFlowRate - 5) / 55;
          const uFlow = gl.getUniformLocation(program, 'u_flowRate');
          if (uFlow) gl.uniform1f(uFlow, normFlow);

          // Thermal gradient uniform (normalized: 25 -> 0.0, 70 -> 1.0)
          const normGrad = (thermalGradient - 25) / 45;
          const uGrad = gl.getUniformLocation(program, 'u_thermalGradient');
          if (uGrad) gl.uniform1f(uGrad, normGrad);

          // Colormap mode (0: thermal, 1: velocity, 2: stress, 3: flux)
          const mapInt = colormap === 'thermal' ? 0 : colormap === 'velocity' ? 1 : colormap === 'stress' ? 2 : 3;
          const uMap = gl.getUniformLocation(program, 'u_colormap');
          if (uMap) gl.uniform1i(uMap, mapInt);

          // Mouse uniform
          const uMouse = gl.getUniformLocation(program, 'u_mouse');
          if (uMouse) gl.uniform2f(uMouse, mouseRef.current.x, mouseRef.current.y);

          gl.drawArrays(gl.TRIANGLES, 0, 6);
        }

        // FPS calculation
        frameCount.current++;
        if (now - lastFpsTime.current >= 1000) {
          const fps = Math.round((frameCount.current * 1000) / (now - lastFpsTime.current));
          if (onFpsUpdate) onFpsUpdate(fps);
          frameCount.current = 0;
          lastFpsTime.current = now;
        }
      }

      animFrameId.current = requestAnimationFrame(render);
    };

    animFrameId.current = requestAnimationFrame(render);

    return () => {
      running = false;
      if (animFrameId.current) {
        cancelAnimationFrame(animFrameId.current);
      }
    };
  }, [depth, massFlowRate, thermalGradient, colormap, isPaused, onFpsUpdate]);

  // Touch and Mouse Interaction
  const handlePointerDown = (e: React.PointerEvent) => {
    isDraggingRef.current = true;
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const handlePointerMove = (e: React.PointerEvent) => {
    if (!isDraggingRef.current || !containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = Math.max(0, Math.min(1, (e.clientX - rect.left) / rect.width));
    const y = Math.max(0, Math.min(1, 1 - (e.clientY - rect.top) / rect.height));
    mouseRef.current = { x, y };
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    isDraggingRef.current = false;
    try {
      (e.target as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {}
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full min-h-[480px] bg-slate-950 rounded-xl overflow-hidden shadow-2xl border border-slate-800 touch-none select-none cursor-grab active:cursor-grabbing"
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
      id="kkm-shader-canvas-container"
    >
      {webglSupported ? (
        <canvas
          ref={canvasRef}
          className="w-full h-full block"
          id="kkm-webgl-shader-element"
        />
      ) : (
        <div className="flex flex-col items-center justify-center h-full p-8 text-center text-slate-300">
          <div className="w-16 h-16 mb-4 rounded-full bg-primary/20 flex items-center justify-center text-accent-yellow">
            <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h3 className="text-xl font-bold font-display text-white mb-2">WebGL Hardware Acceleration Inactive</h3>
          <p className="text-sm max-w-md text-slate-400">
            Your browser environment does not expose WebGL 2.0. Telemetry data, calculations, and AI Digital Twin assessments continue running with high mathematical precision.
          </p>
        </div>
      )}
    </div>
  );
};

export default ShaderCanvas;
