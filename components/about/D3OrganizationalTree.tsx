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
      name: 'General Assembly & Board Directorate',
      nameFa: 'مجمع عمومی و هیئت مدیره گروه کیمیا کاران ماد',
      title: 'Corporate Sovereign Governance',
      titleFa: 'رکن عالی حاکمیت سازمانی KKM',
      department: 'KKM International Group',
      departmentFa: 'گروه بین‌المللی کیمیا کاران ماد',
      role: 'root',
      children: [
        {
          id: 'ceo-gino',
          name: 'Gino Ayyoubian',
          nameFa: 'سید ژینو ایوبیان',
          title: 'Chief Executive Officer & Chairman of the Board',
          titleFa: 'مدیرعامل و رئیس هیئت مدیره',
          department: 'Executive Board',
          departmentFa: 'دفتر مدیرعامل و هیئت مدیره',
          extension: '101',
          role: 'board',
          memberUid: 'kkm-user-001',
          children: [
            // 1. Board Members & Strategic Directorate
            {
              id: 'board-baghdadchi',
              name: 'Reza Baghdadchi',
              nameFa: 'رضا بغدادچی',
              title: 'Member of the Board & Strategic Development',
              titleFa: 'عضو هیئت مدیره و راهبرد توسعه کلان',
              department: 'Board Directorate',
              departmentFa: 'هیئت مدیره و راهبرد کلان',
              extension: '107',
              role: 'board',
              memberUid: 'kkm-user-002-board'
            },
            {
              id: 'board-tofangchiha',
              name: 'Ashkan Tofangchiha',
              nameFa: 'اشکان تفنگچی‌ها',
              title: 'Member of the Board & Chief Commercial Officer (CCO)',
              titleFa: 'عضو هیئت مدیره، توسعه تجاری و بازرگانی بین‌الملل',
              department: 'Commercial Directorate',
              departmentFa: 'هیئت مدیره و توسعه تجاری',
              extension: '108',
              role: 'board',
              memberUid: 'kkm-user-003-board'
            },
            // 2. Executive Directorate (C-Suite)
            {
              id: 'csuite-cto',
              name: 'Dr. Reza Asakereh',
              nameFa: 'دکتر رضا عساکره',
              title: 'Chief Technology Officer (CTO)',
              titleFa: 'مدیر ارشد فناوری، هوش مصنوعی و R&D',
              department: 'R&D & AI Systems',
              departmentFa: 'معاونت فناوری، هوش مصنوعی و تحقیق و توسعه',
              extension: '102',
              role: 'c_level',
              memberUid: 'kkm-user-002',
              children: [
                {
                  id: 'spec-sina',
                  name: 'Sina Ayyoubian',
                  nameFa: 'سینا ایوبیان',
                  title: 'R&D Engineering Specialist',
                  titleFa: 'کارشناس ارشد تحقیق، توسعه و نوآوری',
                  department: 'Emerging Technologies',
                  departmentFa: 'تحقیق و توسعه، فناوری‌های نوظهور و نوآوری',
                  extension: '208',
                  role: 'specialist',
                  memberUid: 'kkm-user-018'
                },
                {
                  id: 'dir-bim',
                  name: 'Mahdi Ghiasy',
                  nameFa: 'مهدی غیاثی',
                  title: 'Director of BIM & Virtual Simulation',
                  titleFa: 'مدیر مدل‌سازی BIM و شبیه‌سازی واقعیت مجازی',
                  department: 'BIM & Simulation',
                  departmentFa: 'مدل‌سازی BIM، شبیه‌سازی و واقعیت مجازی',
                  extension: '202',
                  role: 'director',
                  memberUid: 'kkm-user-008'
                }
              ]
            },
            {
              id: 'csuite-cso',
              name: 'Dr. Khosro Jarrahian',
              nameFa: 'دکتر خسرو جراحیان',
              title: 'Chief Scientific Officer (CSO)',
              titleFa: 'مدیر ارشد علوم پایه، سامانه‌های انرژی GMEL و پایداری',
              department: 'Earth Sciences & Energy',
              departmentFa: 'علوم پایه، پایداری و اکوسیستم‌ها',
              extension: '103',
              role: 'c_level',
              memberUid: 'kkm-user-003',
              children: [
                {
                  id: 'dir-geothermal',
                  name: 'Dr. Salar Hashemi',
                  nameFa: 'دکتر سالار هاشمی',
                  title: 'Director of Geothermal Energy Systems',
                  titleFa: 'مدیر مهندسی انرژی و نیروگاه‌های زمین‌گرمایی',
                  department: 'Energy Systems',
                  departmentFa: 'مهندسی انرژی و نیروگاه‌های زمین‌گرمایی',
                  extension: '201',
                  role: 'director',
                  memberUid: 'kkm-user-007'
                }
              ]
            },
            {
              id: 'csuite-cio',
              name: 'Farid Imani',
              nameFa: 'فرید ایمانی',
              title: 'Chief Investment Officer (CIO)',
              titleFa: 'مدیر ارشد سرمایه‌گذاری، تامین مالی و شبکه سازمانی',
              department: 'Finance & Investments',
              departmentFa: 'سرمایه‌گذاری، تامین مالی و دارایی‌های سرمایه‌ای',
              extension: '104',
              role: 'c_level',
              memberUid: 'kkm-user-004'
            },
            {
              id: 'csuite-cfo',
              name: 'Dr. Pedram Abdarzadeh',
              nameFa: 'دکتر پدرام آبدارزاده',
              title: 'Chief Financial Officer (CFO)',
              titleFa: 'مدیر ارشد امور مالی، حسابداری و بودجه‌ریزی',
              department: 'Finance & Accounting',
              departmentFa: 'امور مالی، حسابداری و بودجه‌ریزی',
              extension: '105',
              role: 'c_level',
              memberUid: 'kkm-user-005',
              children: [
                {
                  id: 'spec-finance',
                  name: 'Maryam Bahrami',
                  nameFa: 'مریم بهرامی',
                  title: 'Financial Automation & Accounting Specialist',
                  titleFa: 'کارشناس اتوماسیون مالی و حسابداری',
                  department: 'Finance & Treasury',
                  departmentFa: 'امور مالی و حسابداری',
                  extension: '211',
                  role: 'specialist',
                  memberUid: 'kkm-user-043'
                }
              ]
            },
            {
              id: 'csuite-coo',
              name: 'Heidar Yarveicy',
              nameFa: 'حیدر یارویسی',
              title: 'Chief Operating Officer (COO)',
              titleFa: 'مدیر ارشد عملیات اجرایی، لجستیک و مگاپروژه‌های EPC',
              department: 'Operations & Field Mega-Projects',
              departmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها',
              extension: '106',
              role: 'c_level',
              memberUid: 'kkm-user-006',
              children: [
                {
                  id: 'spec-technical-office',
                  name: 'Mostafa Sharifi',
                  nameFa: 'مصطفی شریفی',
                  title: 'Senior Project Engineering Specialist & Technical Office Coordinator',
                  titleFa: 'کارشناس ارشد مهندسی پروژه و هماهنگ‌کننده دفتر فنی',
                  department: 'Technical Office',
                  departmentFa: 'دفتر فنی و مهندسی پروژه',
                  extension: '209',
                  role: 'specialist',
                  memberUid: 'kkm-user-019'
                },
                {
                  id: 'spec-field',
                  name: 'Eng. Ali Rezaei',
                  nameFa: 'مهندس علی رضایی',
                  title: 'Field Engineering Specialist',
                  titleFa: 'کارشناس مهندسی عملیات اجرایی و کارگاهی',
                  department: 'Field Operations',
                  departmentFa: 'عملیات اجرایی و کارگاه‌ها',
                  extension: '210',
                  role: 'specialist',
                  memberUid: 'kkm-user-042'
                }
              ]
            },
            // 3. Corporate Functions & Legal
            {
              id: 'corp-pr',
              name: 'Masoumeh Moshar',
              nameFa: 'معصومه مشار',
              title: 'Director of Public Relations & International Media',
              titleFa: 'مدیر روابط عمومی، رسانه و برندینگ سازمانی',
              department: 'Public Relations',
              departmentFa: 'روابط عمومی، رسانه و برندینگ سازمانی',
              extension: '204',
              role: 'director',
              memberUid: 'kkm-user-010'
            },
            {
              id: 'corp-legal',
              name: 'Hamed Zatajam',
              nameFa: 'حامد ذات‌عجم',
              title: 'Director of Legal Affairs & Patents',
              titleFa: 'مدیر امور حقوقی، قراردادها، مالکیت فکری و پتنت‌ها',
              department: 'Legal Directorate',
              departmentFa: 'امور حقوقی، مالکیت فکری و پتنت‌ها',
              extension: '205',
              role: 'director',
              memberUid: 'kkm-user-016'
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
