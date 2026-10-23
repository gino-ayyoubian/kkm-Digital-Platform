import * as React from 'react';
import * as d3 from 'd3';
import { useLanguage } from '../../LanguageContext';
import { OrgMemberProfile } from '../../types';
import { INITIAL_ORG_MEMBERS } from '../../data/orgMembers';
import { 
  ZoomIn, ZoomOut, RotateCcw, Maximize2, Minimize2, 
  Users, ChevronDown, ChevronRight, ShieldCheck, Sparkles, Phone, ExternalLink 
} from 'lucide-react';

interface D3OrgNodeData {
  id: string;
  name: string;
  nameFa: string;
  title: string;
  titleFa: string;
  department: string;
  departmentFa: string;
  extension?: string;
  role: 'board' | 'c_level' | 'director' | 'specialist' | 'root';
  memberUid?: string;
  children?: D3OrgNodeData[];
  _children?: D3OrgNodeData[];
}

interface D3OrganizationalTreeProps {
  onSelectMember?: (member: OrgMemberProfile) => void;
}

export const D3OrganizationalTree: React.FC<D3OrganizationalTreeProps> = ({ onSelectMember }) => {
  const { isFa } = useLanguage();
  const svgRef = React.useRef<SVGSVGElement | null>(null);
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  const [selectedNode, setSelectedNode] = React.useState<D3OrgNodeData | null>(null);
  const [zoomLevel, setZoomLevel] = React.useState<number>(1);
  const [isFullscreen, setIsFullscreen] = React.useState<boolean>(false);

  // Helper to find real member from INITIAL_ORG_MEMBERS
  const getMemberByUid = (uid?: string): OrgMemberProfile | undefined => {
    if (!uid) return undefined;
    return INITIAL_ORG_MEMBERS.find(m => m.uid === uid);
  };

  // Build Hierarchical Tree Data
  const rawTreeData: D3OrgNodeData = React.useMemo(() => {
    return {
      id: 'root-kkm',
      name: 'General Assembly & Sovereign Governance',
      nameFa: 'مجمع عمومی و هیئت مدیره گروه کیمیا کاران ماد',
      title: 'Corporate Sovereign Governance',
      titleFa: 'رکن عالی حاکمیت سازمانی و مجمع KKM',
      department: 'KKM International Group',
      departmentFa: 'گروه بین‌المللی کیمیا کاران ماد',
      role: 'root',
      children: [
        // Governance Direct Committee: HSE & Environment
        {
          id: 'gov-hse',
          name: 'Seyed Jassem Hosseini',
          nameFa: 'سید جاسم حسینی',
          title: 'Head of HSE & Environmental Management',
          titleFa: 'مدیر بهداشت، ایمنی و محیط زیست (HSE)',
          department: 'Audit, Risk & Compliance Committee',
          departmentFa: 'کمیته حسابرسی، ریسک و انطباق (گزارش مستقیم)',
          extension: '109',
          role: 'director',
          memberUid: 'kkm-user-020'
        },
        // Executive Layer Root: CEO
        {
          id: 'ceo-gino',
          name: 'Gino Ayyoubian',
          nameFa: 'سید ژینو ایوبیان مرکزی',
          title: 'Chief Executive Officer (CEO) & Chairman',
          titleFa: 'مدیر ارشد اجرایی و رئیس هیئت مدیره',
          department: 'Executive Leadership',
          departmentFa: 'دفتر مدیر ارشد اجرایی و هیئت مدیره',
          extension: '101',
          role: 'board',
          memberUid: 'kkm-user-001',
          children: [
            // Direct Offices under CEO
            {
              id: 'corp-legal',
              name: 'Hamed Zatajam',
              nameFa: 'حامد ذات‌عجم',
              title: 'Director of IP HoldCo & Legal Affairs',
              titleFa: 'مدیر دفتر IP و امور حقوقی',
              department: 'Legal Directorate',
              departmentFa: 'دفتر IP و امور حقوقی (گزارش مستقیم به CEO)',
              extension: '205',
              role: 'director',
              memberUid: 'kkm-user-016'
            },
            {
              id: 'corp-pmo',
              name: 'Project Management Office (PMO)',
              nameFa: 'دفتر مدیریت پروژه و راهبرد (PMO)',
              title: 'PMO & Strategy Directorate (Open)',
              titleFa: 'هماهنگی دروازه‌های ۱۰ گانه چرخه حیات',
              department: 'Executive Directorate',
              departmentFa: 'دفتر مدیریت پروژه (گزارش به CEO)',
              role: 'director'
            },
            // CTO Directorate
            {
              id: 'csuite-cto',
              name: 'Khosro Jarrahian',
              nameFa: 'خسرو جراحیان',
              title: 'Chief Technology Officer (CTO)',
              titleFa: 'معاونت فناوری (CTO)',
              department: 'Technology Directorate',
              departmentFa: 'معاونت فناوری و توسعه سیستم‌ها',
              extension: '102',
              role: 'c_level',
              memberUid: 'kkm-user-003',
              children: [
                {
                  id: 'dir-nano',
                  name: 'Salar Hasheminasab',
                  nameFa: 'سید سالار هاشمی‌نسب',
                  title: 'Head of Nanomaterials & Sensors',
                  titleFa: 'مدیر واحد نانومواد و سنسورها',
                  department: 'Nanomaterials & Sensors',
                  departmentFa: 'نانومواد و سنسورها (معاونت فناوری)',
                  extension: '201',
                  role: 'director',
                  memberUid: 'kkm-user-010'
                },
                {
                  id: 'dir-ai',
                  name: 'Reza Asakereh',
                  nameFa: 'رضا عساکره',
                  title: 'Head of AI & Cognitive Telemetry',
                  titleFa: 'مدیر هوش مصنوعی و داده',
                  department: 'AI & Data Directorate',
                  departmentFa: 'واحد هوش مصنوعی و داده (معاونت فناوری)',
                  extension: '106',
                  role: 'director',
                  memberUid: 'kkm-user-002'
                },
                {
                  id: 'dir-innovation',
                  name: 'Ashkan Tofangchiha',
                  nameFa: 'اشکان تفنگچی‌ها',
                  title: 'Head of Open Innovation & Design Thinking',
                  titleFa: 'مدیر واحد نوآوری باز و تفکر طراحی',
                  department: 'Open Innovation Directorate',
                  departmentFa: 'واحد نوآوری باز و تفکر طراحی (معاونت فناوری)',
                  extension: '107',
                  role: 'director',
                  memberUid: 'kkm-user-008'
                }
              ]
            },
            // COO Directorate
            {
              id: 'csuite-coo',
              name: 'Heydar Yarveisi',
              nameFa: 'حیدر یارویسی',
              title: 'Chief Operating Officer (COO)',
              titleFa: 'معاونت اجرایی و EPC (COO)',
              department: 'Operations & EPC',
              departmentFa: 'معاونت اجرایی و مگاپروژه‌های EPC',
              extension: '103',
              role: 'c_level',
              memberUid: 'kkm-user-006',
              children: [
                {
                  id: 'dir-bim',
                  name: 'Mahdi Ghiasy',
                  nameFa: 'مهدی غیاثی',
                  title: 'Director of Automation & BIM Simulation',
                  titleFa: 'مدیر اتوماسیون، شبکه و شبیه‌سازی BIM',
                  department: 'Automation Systems',
                  departmentFa: 'اتوماسیون، شبکه و شبیه‌سازی BIM',
                  extension: '202',
                  role: 'director',
                  memberUid: 'kkm-user-011'
                },
                {
                  id: 'spec-sina',
                  name: 'Sina Ayyoubian',
                  nameFa: 'سینا ایوبیان',
                  title: 'Robotics, Automation & R&D Specialist',
                  titleFa: 'متخصص اتوماسیون، شبکه و رباتیک',
                  department: 'Emerging Technologies',
                  departmentFa: 'تحقیق و توسعه، فناوری‌های نوظهور و رباتیک',
                  extension: '208',
                  role: 'specialist',
                  memberUid: 'kkm-user-018'
                }
              ]
            },
            // CFO Directorate
            {
              id: 'csuite-cfo',
              name: 'Farid Imani',
              nameFa: 'فرید ایمانی',
              title: 'Chief Financial Officer (CFO)',
              titleFa: 'معاونت مالی و دارایی (CFO)',
              department: 'Finance & Capital Directorate',
              departmentFa: 'معاونت مالی، دارایی و سرمایه‌گذاری',
              extension: '104',
              role: 'c_level',
              memberUid: 'kkm-user-004',
              children: [
                {
                  id: 'dir-gov-risk',
                  name: 'Pedram Abdarzadeh',
                  nameFa: 'پدرام آبدارزاده',
                  title: 'Head of Corporate Governance, Risk & Insurance',
                  titleFa: 'مدیر حاکمیت شرکتی، ریسک و بیمه',
                  department: 'Governance & Risk',
                  departmentFa: 'حاکمیت شرکتی، ریسک و بیمه (معاونت مالی)',
                  extension: '108',
                  role: 'director',
                  memberUid: 'kkm-user-005'
                }
              ]
            },
            // Human Capital Directorate
            {
              id: 'corp-hr',
              name: 'Reza Baghdadchi',
              nameFa: 'رضا بغدادچی',
              title: 'Director of Human Capital & Contracts',
              titleFa: 'مدیر دفتر سرمایه انسانی و اختیار قراردادها',
              department: 'Human Capital & Governance',
              departmentFa: 'دفتر سرمایه انسانی و اختیار قراردادها',
              extension: '105',
              role: 'board',
              memberUid: 'kkm-user-007'
            },
            // Communications Directorate
            {
              id: 'corp-pr',
              name: 'Masoumeh Moshar',
              nameFa: 'معصومه مشار',
              title: 'Director of Communications & Stakeholders',
              titleFa: 'معاونت ارتباطات و ذینفعان',
              department: 'Communications Directorate',
              departmentFa: 'معاونت ارتباطات و ذینفعان',
              extension: '204',
              role: 'director',
              memberUid: 'kkm-user-015'
            },
            // Independent QA/QC Line
            {
              id: 'corp-qaqc',
              name: 'Mostafa Sharifi',
              nameFa: 'مصطفی شریفی',
              title: 'Director of QA/QC & Inspection',
              titleFa: 'مدیر بازرسی فنی و کنترل کیفیت (QA/QC)',
              department: 'Independent Quality Directorate',
              departmentFa: 'بازرسی فنی و کنترل کیفیت (مستقل از COO)',
              extension: '209',
              role: 'specialist',
              memberUid: 'kkm-user-019'
            }
          ]
        }
      ]
    };
  }, []);

  // Zoom behaviour ref
  const zoomBehaviorRef = React.useRef<d3.ZoomBehavior<SVGSVGElement, unknown> | null>(null);
  const gRef = React.useRef<d3.Selection<SVGGElement, unknown, null, undefined> | null>(null);

  // Render D3 Collapsible Tree
  React.useEffect(() => {
    if (!svgRef.current || !containerRef.current) return;

    const width = containerRef.current.clientWidth || 1100;
    const height = 650;
    const cardWidth = 240;
    const cardHeight = 110;

    const svg = d3.select(svgRef.current);
    svg.selectAll('*').remove();

    const g = svg.append('g').attr('class', 'tree-viewport');
    gRef.current = g;

    // Define Zoom behavior
    const zoom = d3.zoom<SVGSVGElement, unknown>()
      .scaleExtent([0.4, 2.5])
      .on('zoom', (event) => {
        g.attr('transform', event.transform);
        setZoomLevel(event.transform.k);
      });

    zoomBehaviorRef.current = zoom;
    svg.call(zoom);

    // Initial root setup
    const root = d3.hierarchy<D3OrgNodeData>(rawTreeData);
    // Position root initially centered
    (root as any).x0 = width / 2;
    (root as any).y0 = 40;

    const treeLayout = d3.tree<D3OrgNodeData>()
      .nodeSize([cardWidth + 40, cardHeight + 60]);

    let i = 0;

    function update(source: any) {
      const treeData = treeLayout(root);
      const nodes = treeData.descendants();
      const links = treeData.links();

      // Normalize for fixed-depth
      nodes.forEach((d: any) => {
        d.y = d.depth * 170 + 60;
      });

      // ****************** Nodes section ***************************
      const node = g.selectAll<SVGGElement, d3.HierarchyPointNode<D3OrgNodeData>>('g.node')
        .data(nodes, (d: any) => d.id || (d.id = ++i));

      // Enter any new modes at the parent's previous position.
      const nodeEnter = node.enter().append('g')
        .attr('class', 'node')
        .attr('transform', () => `translate(${source.x0},${source.y0})`)
        .attr('cursor', 'pointer');

      // Card Background Outer Border
      nodeEnter.append('rect')
        .attr('class', 'card-rect')
        .attr('width', cardWidth)
        .attr('height', cardHeight)
        .attr('x', -cardWidth / 2)
        .attr('y', 0)
        .attr('rx', 16)
        .attr('ry', 16)
        .attr('fill', (d: any) => {
          if (d.data.role === 'root') return '#0f172a';
          if (d.data.role === 'board') return '#1e293b';
          if (d.data.role === 'c_level') return '#0f172a';
          if (d.data.role === 'director') return '#1e293b';
          return '#0f172a';
        })
        .attr('stroke', (d: any) => {
          if (d.data.role === 'root') return '#f59e0b';
          if (d.data.role === 'board') return '#38bdf8';
          if (d.data.role === 'c_level') return '#10b981';
          if (d.data.role === 'director') return '#818cf8';
          return '#64748b';
        })
        .attr('stroke-width', (d: any) => (d.data.role === 'root' || d.data.role === 'board' ? 2.5 : 1.8))
        .attr('filter', 'drop-shadow(0 4px 12px rgba(0, 0, 0, 0.25))')
        .on('click', (_event, d: any) => {
          setSelectedNode(d.data);
          const member = getMemberByUid(d.data.memberUid);
          if (member && onSelectMember) {
            onSelectMember(member);
          }
        });

      // Role Badge pill inside card
      nodeEnter.append('rect')
        .attr('x', -cardWidth / 2 + 14)
        .attr('y', 12)
        .attr('width', 90)
        .attr('height', 18)
        .attr('rx', 6)
        .attr('fill', (d: any) => {
          if (d.data.role === 'root') return '#f59e0b20';
          if (d.data.role === 'board') return '#38bdf820';
          if (d.data.role === 'c_level') return '#10b98120';
          if (d.data.role === 'director') return '#818cf820';
          return '#64748b20';
        });

      nodeEnter.append('text')
        .attr('x', -cardWidth / 2 + 59)
        .attr('y', 24)
        .attr('text-anchor', 'middle')
        .attr('fill', (d: any) => {
          if (d.data.role === 'root') return '#f59e0b';
          if (d.data.role === 'board') return '#38bdf8';
          if (d.data.role === 'c_level') return '#34d399';
          if (d.data.role === 'director') return '#a5b4fc';
          return '#94a3b8';
        })
        .attr('font-size', '9px')
        .attr('font-family', 'ui-monospace, monospace')
        .attr('font-weight', 'bold')
        .text((d: any) => {
          if (d.data.role === 'root') return 'GOVERNANCE';
          if (d.data.role === 'board') return 'DIRECTORATE';
          if (d.data.role === 'c_level') return 'C-SUITE';
          if (d.data.role === 'director') return 'DIRECTOR';
          return 'SPECIALIST';
        });

      // Extension Badge in card header
      nodeEnter.filter((d: any) => Boolean(d.data.extension))
        .append('text')
        .attr('x', cardWidth / 2 - 14)
        .attr('y', 24)
        .attr('text-anchor', 'end')
        .attr('fill', '#34d399')
        .attr('font-size', '10px')
        .attr('font-family', 'ui-monospace, monospace')
        .attr('font-weight', 'bold')
        .text((d: any) => `Ext: ${d.data.extension}`);

      // Member Name (Dual Language or Main)
      nodeEnter.append('text')
        .attr('x', -cardWidth / 2 + 14)
        .attr('y', 48)
        .attr('fill', '#ffffff')
        .attr('font-size', '13px')
        .attr('font-weight', 'bold')
        .attr('font-family', 'system-ui, sans-serif')
        .text((d: any) => (isFa ? d.data.nameFa : d.data.name));

      // Title line
      nodeEnter.append('text')
        .attr('x', -cardWidth / 2 + 14)
        .attr('y', 66)
        .attr('fill', '#94a3b8')
        .attr('font-size', '10px')
        .attr('font-family', 'system-ui, sans-serif')
        .text((d: any) => {
          const raw = isFa ? d.data.titleFa : d.data.title;
          return raw.length > 34 ? `${raw.slice(0, 32)}...` : raw;
        });

      // Department line
      nodeEnter.append('text')
        .attr('x', -cardWidth / 2 + 14)
        .attr('y', 84)
        .attr('fill', '#64748b')
        .attr('font-size', '9px')
        .attr('font-family', 'system-ui, sans-serif')
        .text((d: any) => {
          const raw = isFa ? d.data.departmentFa : d.data.department;
          return raw.length > 36 ? `${raw.slice(0, 34)}...` : raw;
        });

      // Collapse / Expand toggle button (if has children)
      const toggleBtn = nodeEnter.filter((d: any) => Boolean(d.data.children || d.data._children))
        .append('g')
        .attr('class', 'toggle-btn')
        .attr('transform', `translate(0, ${cardHeight})`)
        .on('click', (event, d: any) => {
          event.stopPropagation();
          if (d.children) {
            d._children = d.children;
            d.children = null;
          } else {
            d.children = d._children;
            d._children = null;
          }
          update(d);
        });

      toggleBtn.append('circle')
        .attr('r', 11)
        .attr('fill', '#0284c7')
        .attr('stroke', '#ffffff')
        .attr('stroke-width', 2);

      toggleBtn.append('text')
        .attr('text-anchor', 'middle')
        .attr('dy', '3.5px')
        .attr('fill', '#ffffff')
        .attr('font-size', '12px')
        .attr('font-weight', 'bold')
        .text((d: any) => (d.children ? '−' : '+'));

      // UPDATE
      const nodeUpdate = nodeEnter.merge(node as any);

      // Transition to the proper position for the node
      nodeUpdate.transition()
        .duration(400)
        .attr('transform', (d: any) => `translate(${d.x},${d.y})`);

      // Update toggle icon
      nodeUpdate.select('.toggle-btn text')
        .text((d: any) => (d.children ? '−' : '+'));

      // Transition exiting nodes to the parent's new position.
      node.exit().transition()
        .duration(400)
        .attr('transform', () => `translate(${source.x},${source.y})`)
        .remove();

      // ****************** Links section ***************************
      const link = g.selectAll<SVGPathElement, d3.HierarchyPointLink<D3OrgNodeData>>('path.link')
        .data(links, (d: any) => d.target.id);

      // Enter any new links at the parent's previous position.
      const linkEnter = link.enter().insert('path', 'g')
        .attr('class', 'link')
        .attr('fill', 'none')
        .attr('stroke', '#334155')
        .attr('stroke-width', 1.6)
        .attr('stroke-dasharray', (d: any) => (d.target.data.role === 'specialist' ? '4,4' : 'none'))
        .attr('d', () => {
          const o = { x: source.x0, y: source.y0 + cardHeight };
          return diagonal(o, o);
        });

      // UPDATE
      const linkUpdate = linkEnter.merge(link as any);

      // Transition back to the parent element position
      linkUpdate.transition()
        .duration(400)
        .attr('d', (d: any) => {
          const s = { x: d.source.x, y: d.source.y + cardHeight };
          const t = { x: d.target.x, y: d.target.y };
          return diagonal(s, t);
        });

      // Remove any exiting links
      link.exit().transition()
        .duration(400)
        .attr('d', () => {
          const o = { x: source.x, y: source.y };
          return diagonal(o, o);
        })
        .remove();

      // Store the old positions for transition.
      nodes.forEach((d: any) => {
        d.x0 = d.x;
        d.y0 = d.y;
      });
    }

    // Creates a curved (diagonal) path from parent to the child nodes
    function diagonal(s: { x: number; y: number }, d: { x: number; y: number }) {
      return `M ${s.x} ${s.y}
              C ${s.x} ${(s.y + d.y) / 2},
                ${d.x} ${(s.y + d.y) / 2},
                ${d.x} ${d.y}`;
    }

    // Initial update
    update(root);

    // Initial Center transform
    const initialTransform = d3.zoomIdentity
      .translate(width / 2, 40)
      .scale(0.82);

    svg.call(zoom.transform, initialTransform);

  }, [rawTreeData, isFa, onSelectMember]);

  // Zoom controls
  const handleZoomIn = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 1.25);
    }
  };

  const handleZoomOut = () => {
    if (svgRef.current && zoomBehaviorRef.current) {
      d3.select(svgRef.current).transition().duration(300).call(zoomBehaviorRef.current.scaleBy, 0.8);
    }
  };

  const handleResetZoom = () => {
    if (svgRef.current && zoomBehaviorRef.current && containerRef.current) {
      const width = containerRef.current.clientWidth || 1100;
      const initialTransform = d3.zoomIdentity
        .translate(width / 2, 40)
        .scale(0.82);
      d3.select(svgRef.current).transition().duration(400).call(zoomBehaviorRef.current.transform, initialTransform);
    }
  };

  return (
    <div 
      ref={containerRef}
      className={`relative bg-slate-950 rounded-3xl border border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ${
        isFullscreen ? 'fixed inset-4 z-50 rounded-2xl' : 'w-full'
      }`}
    >
      {/* Top Header & Interactive Legend */}
      <div className="p-5 bg-slate-900/90 backdrop-blur-md border-b border-slate-800 flex flex-wrap items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full bg-amber-500/20 text-amber-300 text-[10px] font-mono font-bold border border-amber-500/40">
              D3.js Interactive Hierarchy
            </span>
            <span className="text-xs text-slate-400 font-mono">
              KKM Organizational Architecture v2026
            </span>
          </div>

          <h3 className="text-base sm:text-lg font-display font-black text-white flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-400" />
            <span>{isFa ? 'چارت درختی تعاملی و دینامیک ارکان سازمان (D3.js)' : 'Interactive Organizational Tree Chart'}</span>
          </h3>

          <p className="text-xs text-slate-400 mt-0.5">
            {isFa 
              ? 'روی هر جعبه برای مشاهده پروفایل و پرونده ثبتی عضو کلیک نمایید. با کلیدهای (+) و (−) می‌توانید شاخه‌ها را باز و بسته کنید.' 
              : 'Click on any member node to open their verified dossier modal. Click (+) or (−) to expand or collapse branches.'}
          </p>
        </div>

        {/* Action Buttons: Zoom & Fullscreen */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleZoomIn}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFa ? 'بزرگنمایی' : 'Zoom In'}
          >
            <ZoomIn className="w-4 h-4" />
          </button>

          <button
            onClick={handleZoomOut}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFa ? 'کوچک‌نمایی' : 'Zoom Out'}
          >
            <ZoomOut className="w-4 h-4" />
          </button>

          <button
            onClick={handleResetZoom}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFa ? 'مرکزنمایی تصویر' : 'Reset View'}
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          <button
            onClick={() => setIsFullscreen(!isFullscreen)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
            title={isFullscreen ? (isFa ? 'خروج از تمام‌صفحه' : 'Exit Fullscreen') : (isFa ? 'تمام‌صفحه' : 'Fullscreen')}
          >
            {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* SVG Canvas Area */}
      <div className="relative w-full h-[620px] bg-gradient-to-b from-slate-950 via-slate-900/60 to-slate-950 cursor-grab active:cursor-grabbing overflow-hidden">
        <svg 
          ref={svgRef}
          className="w-full h-full select-none"
        />

        {/* Legend Overlay at Bottom Right */}
        <div className="absolute bottom-4 right-4 p-3 rounded-2xl bg-slate-900/90 backdrop-blur-md border border-slate-800 text-[11px] text-slate-300 space-y-1.5 shadow-lg hidden sm:block">
          <div className="font-bold text-white mb-1">{isFa ? 'راهنمای لایه‌های سازمانی' : 'Hierarchy Legend'}</div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span>{isFa ? 'مجمع عمومی و ریاست هیئت مدیره' : 'Governance & CEO'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-sky-400" />
            <span>{isFa ? 'اعضای هیئت مدیره' : 'Board Directorate'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span>{isFa ? 'مدیران ارشد اجرایی (C-Suite)' : 'Executive C-Suite'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-indigo-400" />
            <span>{isFa ? 'مدیران دپارتمان‌ها و دفاتر' : 'Directors & Heads'}</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-slate-400" />
            <span>{isFa ? 'کارشناسان ارشد مهندسی' : 'Specialists'}</span>
          </div>
        </div>

        {/* Zoom percentage tag */}
        <div className="absolute bottom-4 left-4 px-2.5 py-1 rounded-xl bg-slate-900/80 backdrop-blur-sm border border-slate-800 text-[10px] font-mono text-slate-400">
          Scale: {Math.round(zoomLevel * 100)}%
        </div>
      </div>
    </div>
  );
};
