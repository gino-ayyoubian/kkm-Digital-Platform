import * as React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Phone, PhoneCall, PhoneForwarded, PhoneOff, Mic, MicOff, Volume2, 
  VolumeX, Hash, Radio, ShieldCheck, Download, Copy, Check, ExternalLink, 
  User, Search, Activity, Sparkles, Server, Globe, Key, FileCode, QrCode, 
  ArrowLeft, ArrowRight, CornerDownLeft, Info, HelpCircle, X
} from 'lucide-react';
import { useLanguage } from '../../LanguageContext';
import { OrgMemberProfile } from '../../types';
import { INITIAL_ORG_MEMBERS } from '../../data/orgMembers';
import { ExecutiveMemberIdentity } from '../common/ExecutiveMemberIdentity';

interface IvrCommunicationsConsoleProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialExtension?: string;
  initialMember?: OrgMemberProfile | null;
}

// DaftareShoma SIP Trunk Server Specs
export const DAFTARE_SHOMA_CONFIG = {
  defaultUsername: '206962',
  domainUdp: 'ext.daftareshoma.com:7104',
  domainTcp: 'ext.daftareshoma.com:7103',
  domainWebRtc: 'ext.daftareshoma.com:4443',
  webRtcWssUrl: 'wss://ext.daftareshoma.com:4443',
  gitHubRepo: 'https://github.com/gino-ayyoubian/kkm-ivr-system',
  mainOfficeNumber: '+98 21 9103 0830',
  codecs: ['PCMA (G.711a)', 'PCMU (G.711u)', 'Opus (HD Voice)', 'GSM'],
  stunServer: 'stun:ext.daftareshoma.com:3478'
};

// Official IVR Tree Navigation
export interface IvrNode {
  key: string;
  titleEn: string;
  titleFa: string;
  targetExtension: string;
  targetDepartmentEn: string;
  targetDepartmentFa: string;
  targetLeaderEn: string;
  targetLeaderFa: string;
  announcementEn: string;
  announcementFa: string;
}

export const IVR_DIAL_TREE: IvrNode[] = [
  {
    key: '1',
    titleEn: 'Executive Board & CEO Directorate',
    titleFa: 'دفتر مدیرعامل و هیئت مدیره',
    targetExtension: '101',
    targetDepartmentEn: 'Executive Board',
    targetDepartmentFa: 'دفتر مدیرعامل و هیئت مدیره',
    targetLeaderEn: 'Gino Ayyoubian (CEO & Chairman)',
    targetLeaderFa: 'سید ژینو ایوبیان (مدیرعامل و رئیس هیئت مدیره)',
    announcementEn: 'Connecting to the Office of the Chief Executive Officer and Executive Board...',
    announcementFa: 'در حال انتقال به دفتر مدیرعامل و رئیس هیئت مدیره، لطفاً منتظر بمانید...'
  },
  {
    key: '2',
    titleEn: 'AI Systems, R&D & Cognitive Engineering',
    titleFa: 'فناوری، هوش مصنوعی و تحقیق و توسعه',
    targetExtension: '102',
    targetDepartmentEn: 'R&D & AI Systems',
    targetDepartmentFa: 'تحقیق و توسعه، هوش مصنوعی و سامانه‌های شناختی',
    targetLeaderEn: 'Dr. Reza Asakereh (CTO)',
    targetLeaderFa: 'دکتر رضا عساکره (مدیر ارشد فناوری)',
    announcementEn: 'Connecting to AI Systems, Cognitive Technologies, and R&D Directorate...',
    announcementFa: 'در حال اتصال به معاونت فناوری اطلاعات، هوش مصنوعی و تحقیق و توسعه...'
  },
  {
    key: '3',
    titleEn: 'Earth Science, GMEL Energy & Sustainability',
    titleFa: 'علوم زمین، سامانه‌های انرژی GMEL و پایداری',
    targetExtension: '103',
    targetDepartmentEn: 'Science & Sustainability',
    targetDepartmentFa: 'علوم پایه، پایداری و اکوسیستم‌ها',
    targetLeaderEn: 'Dr. Khosro Jarrahian (CSO)',
    targetLeaderFa: 'دکتر خسرو جراحیان (مدیر ارشد علوم و پایداری)',
    announcementEn: 'Connecting to Earth Sciences and Subsurface Geothermal Engineering...',
    announcementFa: 'در حال اتصال به مدیریت علوم زمین، انرژی‌های پاک و پایایی زیست‌محیطی...'
  },
  {
    key: '4',
    titleEn: 'Investment, Enterprise IT & Infrastructure Security',
    titleFa: 'سرمایه‌گذاری، شبکه و امنیت زیرساخت',
    targetExtension: '104',
    targetDepartmentEn: 'Finance & Investments',
    targetDepartmentFa: 'سرمایه‌گذاری و امنیت شبکه سازمانی',
    targetLeaderEn: 'Farid Imani (CIO)',
    targetLeaderFa: 'مهندس فرید ایمانی (مدیر ارشد سرمایه‌گذاری و زیرساخت)',
    announcementEn: 'Connecting to Enterprise Systems and Investment Management...',
    announcementFa: 'در حال انتقال به مدیریت سرمایه‌گذاری و امنیت زیرساخت شبکه...'
  },
  {
    key: '5',
    titleEn: 'Finance, Treasury & Sovereign Capital',
    titleFa: 'امور مالی، حسابداری و اعتبارات بین‌المللی',
    targetExtension: '105',
    targetDepartmentEn: 'Finance & Accounting',
    targetDepartmentFa: 'امور مالی، حسابداری و بودجه‌ریزی',
    targetLeaderEn: 'Dr. Pedram Abdarzadeh (CFO)',
    targetLeaderFa: 'دکتر پدرام آبدارزاده (مدیر ارشد مالی و بودجه)',
    announcementEn: 'Connecting to Financial Affairs and Corporate Treasury...',
    announcementFa: 'در حال انتقال به مدیریت امور مالی، بودجه و اعتبارات...'
  },
  {
    key: '6',
    titleEn: 'Field Operations, Rigs & Mega-Projects EPC',
    titleFa: 'عملیات اجرایی، حفاری و مگاپروژه‌ها',
    targetExtension: '106',
    targetDepartmentEn: 'Operations & Logistics',
    targetDepartmentFa: 'عملیات اجرایی، لجستیک و پروژه‌ها',
    targetLeaderEn: 'Heidar Yarveicy (COO)',
    targetLeaderFa: 'مهندس حیدر یارویسی (مدیر ارشد عملیات)',
    announcementEn: 'Connecting to Drilling Operations and Turnkey Project Logistics...',
    announcementFa: 'در حال اتصال به مدیریت عملیات اجرایی، حفاری و لجستیک مگاپروژه‌ها...'
  },
  {
    key: '7',
    titleEn: 'Public Relations, Media & International Diplomacy',
    titleFa: 'روابط عمومی، رسانه و امور بین‌الملل',
    targetExtension: '204',
    targetDepartmentEn: 'Public Relations',
    targetDepartmentFa: 'روابط عمومی و برندینگ سازمانی',
    targetLeaderEn: 'Masoumeh Moshar',
    targetLeaderFa: 'معصومه مشار (مدیر روابط عمومی و بین‌الملل)',
    announcementEn: 'Connecting to International Communications and Media Relations...',
    announcementFa: 'در حال اتصال به مدیریت روابط عمومی و ارتباطات بین‌الملل...'
  },
  {
    key: '8',
    titleEn: 'Legal Directorate, Patents & WIPO Affairs',
    titleFa: 'امور حقوقی، قراردادها و مالکیت فکری IP',
    targetExtension: '205',
    targetDepartmentEn: 'Legal & Intellectual Property',
    targetDepartmentFa: 'امور حقوقی و مالکیت فکری',
    targetLeaderEn: 'Hamed Zatajam',
    targetLeaderFa: 'حامد ذات‌عجم (مدیر حقوقی و پتنت‌ها)',
    announcementEn: 'Connecting to Corporate Legal Directorate and Intellectual Property Office...',
    announcementFa: 'در حال انتقال به مدیریت امور حقوقی، قراردادها و مالکیت فکری...'
  },
  {
    key: '0',
    titleEn: 'Central Operator & 24/7 Corporate Reception',
    titleFa: 'اپراتور مرکزی و پذیرش شبانه‌روزی سازمان',
    targetExtension: '200',
    targetDepartmentEn: 'Central Dispatch',
    targetDepartmentFa: 'مرکز پذیرش و هدایت تماس‌های سازمانی',
    targetLeaderEn: 'Corporate Receptionist',
    targetLeaderFa: 'میز خدمت و اپراتور پذیرش',
    announcementEn: 'Connecting to the central operator, please hold...',
    announcementFa: 'در حال انتقال به اپراتور مرکزی گروه بین‌المللی کیمیا کاران ماد...'
  }
];

export const IvrCommunicationsConsole: React.FC<IvrCommunicationsConsoleProps> = ({
  isOpen = true,
  onClose,
  initialExtension,
  initialMember
}) => {
  const { isFa } = useLanguage();
  const [activeTab, setActiveTab] = React.useState<'dialer' | 'ivrTree' | 'directory' | 'softphoneConfig'>('dialer');
  
  // Dialer State
  const [dialedNumber, setDialedNumber] = React.useState<string>(initialExtension || '');
  const [callState, setCallState] = React.useState<'idle' | 'calling' | 'connected' | 'ended'>('idle');
  const [callDuration, setCallDuration] = React.useState<number>(0);
  const [isMuted, setIsMuted] = React.useState<boolean>(false);
  const [isSpeakerOn, setIsSpeakerOn] = React.useState<boolean>(true);
  const [activeCallTarget, setActiveCallTarget] = React.useState<{ name: string; dept: string; ext: string } | null>(null);

  // Directory Search
  const [searchQuery, setSearchQuery] = React.useState<string>('');
  
  // Config Copied states
  const [copiedKey, setCopiedKey] = React.useState<string | null>(null);
  const [downloadSuccess, setDownloadSuccess] = React.useState<string | null>(null);

  // Set initial extension if provided
  React.useEffect(() => {
    if (initialExtension) {
      setDialedNumber(initialExtension);
    }
  }, [initialExtension]);

  // Timer effect for connected call
  React.useEffect(() => {
    let interval: NodeJS.Timeout;
    if (callState === 'connected') {
      interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
      }, 1000);
    } else {
      setCallDuration(0);
    }
    return () => clearInterval(interval);
  }, [callState]);

  // Web Audio DTMF synthesis
  const playDtmfTone = (digit: string) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      
      const dtmfFrequencies: Record<string, [number, number]> = {
        '1': [697, 1209], '2': [697, 1336], '3': [697, 1477],
        '4': [770, 1209], '5': [770, 1336], '6': [770, 1477],
        '7': [852, 1209], '8': [852, 1336], '9': [852, 1477],
        '*': [941, 1209], '0': [941, 1336], '#': [941, 1477],
      };

      const freqs = dtmfFrequencies[digit] || [700, 1200];
      const osc1 = ctx.createOscillator();
      const osc2 = ctx.createOscillator();
      const gain = ctx.createGain();

      osc1.frequency.value = freqs[0];
      osc2.frequency.value = freqs[1];
      gain.gain.value = 0.08;

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(ctx.destination);

      osc1.start();
      osc2.start();

      setTimeout(() => {
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.05);
        setTimeout(() => {
          osc1.stop();
          osc2.stop();
          ctx.close();
        }, 60);
      }, 120);
    } catch {
      // AudioContext not allowed without gesture, safe to ignore
    }
  };

  const handleKeyPress = (char: string) => {
    playDtmfTone(char);
    setDialedNumber(prev => prev + char);

    // If in call, simulate IVR navigation
    if (callState === 'connected') {
      const match = IVR_DIAL_TREE.find(node => node.key === char);
      if (match) {
        setActiveCallTarget({
          name: isFa ? match.targetLeaderFa : match.targetLeaderEn,
          dept: isFa ? match.targetDepartmentFa : match.targetDepartmentEn,
          ext: match.targetExtension
        });
      }
    }
  };

  const handleStartCall = (targetExt?: string) => {
    const ext = targetExt || dialedNumber.trim();
    if (!ext) return;

    setDialedNumber(ext);
    setCallState('calling');

    // Resolve target info
    const memberMatch = INITIAL_ORG_MEMBERS.find(m => m.sipExtension === ext || m.sipUsername === ext);
    const ivrMatch = IVR_DIAL_TREE.find(n => n.targetExtension === ext || n.key === ext);

    if (memberMatch) {
      setActiveCallTarget({
        name: isFa && memberMatch.displayNameFa ? memberMatch.displayNameFa : memberMatch.displayName,
        dept: isFa && memberMatch.departmentFa ? memberMatch.departmentFa : memberMatch.department,
        ext: memberMatch.sipExtension || ext
      });
    } else if (ivrMatch) {
      setActiveCallTarget({
        name: isFa ? ivrMatch.targetLeaderFa : ivrMatch.targetLeaderEn,
        dept: isFa ? ivrMatch.targetDepartmentFa : ivrMatch.targetDepartmentEn,
        ext: ivrMatch.targetExtension
      });
    } else {
      setActiveCallTarget({
        name: isFa ? 'خط داخلی سازمانی KKM' : 'KKM Corporate Line',
        dept: 'DaftareShoma SIP Network',
        ext: ext
      });
    }

    // Simulate SIP handshake over WebRTC WSS
    setTimeout(() => {
      setCallState('connected');
    }, 1800);
  };

  const handleEndCall = () => {
    setCallState('ended');
    setTimeout(() => {
      setCallState('idle');
      setActiveCallTarget(null);
    }, 1200);
  };

  const formatDuration = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const copyToClipboard = (text: string, key: string) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  // Generate Zoiper Profile file
  const handleDownloadZoiper = () => {
    const xmlConfig = `<?xml version="1.0" encoding="utf-8"?>
<ZoiperProfile version="2.0">
  <Account>
    <Name>KKM International Group — DaftareShoma</Name>
    <Domain>${DAFTARE_SHOMA_CONFIG.domainUdp}</Domain>
    <UserName>${DAFTARE_SHOMA_CONFIG.defaultUsername}</UserName>
    <CallerID>KKM Corporate Staff</CallerID>
    <OutboundProxy>${DAFTARE_SHOMA_CONFIG.domainUdp}</OutboundProxy>
    <Transport>UDP</Transport>
    <AlternativeTransport>TCP</AlternativeTransport>
    <TCPDomain>${DAFTARE_SHOMA_CONFIG.domainTcp}</TCPDomain>
    <WebRTCGateway>${DAFTARE_SHOMA_CONFIG.domainWebRtc}</WebRTCGateway>
    <StunServer>${DAFTARE_SHOMA_CONFIG.stunServer}</StunServer>
    <Codecs>
      <Codec priority="1">PCMA</Codec>
      <Codec priority="2">PCMU</Codec>
      <Codec priority="3">Opus</Codec>
      <Codec priority="4">GSM</Codec>
    </Codecs>
    <KeepAlive>30</KeepAlive>
    <UseRPort>true</UseRPort>
    <RegisterTimeout>600</RegisterTimeout>
  </Account>
</ZoiperProfile>`;

    const blob = new Blob([xmlConfig], { type: 'application/xml;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkm-daftareshoma-zoiper-${DAFTARE_SHOMA_CONFIG.defaultUsername}.xml`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('zoiper');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  // Generate Linphone configuration file
  const handleDownloadLinphone = () => {
    const linphoneRc = `# Linphone Configuration File — KKM International Group
# DaftareShoma SIP Trunk Integration
[sip]
contact=sip:${DAFTARE_SHOMA_CONFIG.defaultUsername}@${DAFTARE_SHOMA_CONFIG.domainUdp}
media_encryption=none
use_info=0
guess_hostname=1
inc_timeout=30
in_call_timeout=0
delayed_timeout=4
register_only_when_network_is_up=1
register_timeout=600

[proxy_default_values]
reg_proxy=<sip:${DAFTARE_SHOMA_CONFIG.domainUdp};transport=udp>
reg_route=<sip:${DAFTARE_SHOMA_CONFIG.domainUdp};transport=udp>
reg_identity=sip:${DAFTARE_SHOMA_CONFIG.defaultUsername}@${DAFTARE_SHOMA_CONFIG.domainUdp}
reg_expires=600
reg_sendregister=1
publish=0
dial_escape_plus=0

[net]
stun_server=${DAFTARE_SHOMA_CONFIG.stunServer}
nat_policy_ref=default_nat_policy

[audio_codec_0]
mime=PCMA
rate=8000
channels=1
enabled=1

[audio_codec_1]
mime=opus
rate=48000
channels=2
enabled=1
`;

    const blob = new Blob([linphoneRc], { type: 'text/plain;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `kkm-linphone-${DAFTARE_SHOMA_CONFIG.defaultUsername}.linphonerc`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);

    setDownloadSuccess('linphone');
    setTimeout(() => setDownloadSuccess(null), 2500);
  };

  // Filtered members for directory
  const filteredMembers = React.useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    return INITIAL_ORG_MEMBERS.filter(m => {
      if (!q) return true;
      return (
        m.displayName.toLowerCase().includes(q) ||
        (m.displayNameFa && m.displayNameFa.includes(q)) ||
        (m.sipExtension && m.sipExtension.includes(q)) ||
        (m.sipUsername && m.sipUsername.includes(q)) ||
        m.department.toLowerCase().includes(q) ||
        (m.departmentFa && m.departmentFa.includes(q)) ||
        m.title.toLowerCase().includes(q)
      );
    });
  }, [searchQuery]);

  if (!isOpen) return null;

  return (
    <div className="bg-white dark:bg-slate-900 rounded-3xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden" dir={isFa ? 'rtl' : 'ltr'}>
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 text-white border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3.5">
            <div className="p-3 rounded-2xl bg-primary/20 border border-primary/30 text-secondary">
              <PhoneCall className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono font-bold flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                  DaftareShoma SIP Trunk Online
                </span>
                <span className="text-slate-400 text-xs font-mono">
                  ext.daftareshoma.com
                </span>
              </div>
              <h2 className="text-lg font-bold font-display mt-0.5">
                {isFa ? 'سامانه تلفن گویا (IVR)، خطوط داخلی و تلفن اینترنتی سازمانی' : 'KKM IVR System & Corporate VoIP Softphone'}
              </h2>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <a
              href={DAFTARE_SHOMA_CONFIG.gitHubRepo}
              target="_blank"
              rel="noopener noreferrer"
              className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-xs text-slate-300 font-mono transition-colors flex items-center gap-1.5 border border-slate-700"
              title="GitHub Repository: kkm-ivr-system"
            >
              <FileCode className="w-3.5 h-3.5 text-secondary" />
              <span>kkm-ivr-system</span>
              <ExternalLink className="w-3 h-3 text-slate-400" />
            </a>

            {onClose && (
              <button
                onClick={onClose}
                className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
                title={isFa ? 'بستن' : 'Close'}
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Tab switcher */}
        <div className="flex flex-wrap items-center gap-2 mt-5 pt-4 border-t border-slate-800/80">
          <button
            onClick={() => setActiveTab('dialer')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'dialer'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Phone className="w-3.5 h-3.5" />
            <span>{isFa ? 'شماره‌گیر و تلفن نرم‌افزاری (Softphone)' : 'WebRTC Softphone'}</span>
          </button>

          <button
            onClick={() => setActiveTab('ivrTree')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'ivrTree'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Activity className="w-3.5 h-3.5" />
            <span>{isFa ? 'درختواره و منوی صوتی تلفن گویا (IVR Flow)' : 'IVR Menu Tree'}</span>
          </button>

          <button
            onClick={() => setActiveTab('directory')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'directory'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>{isFa ? 'دفترچه تلفن شماره‌های داخلی' : 'Extensions Directory'}</span>
          </button>

          <button
            onClick={() => setActiveTab('softphoneConfig')}
            className={`px-4 py-2 rounded-xl text-xs font-bold transition-all flex items-center gap-2 ${
              activeTab === 'softphoneConfig'
                ? 'bg-primary text-white shadow-md'
                : 'bg-slate-800/60 hover:bg-slate-800 text-slate-300'
            }`}
          >
            <Server className="w-3.5 h-3.5" />
            <span>{isFa ? 'پیکربندی زویپر / لینفون (Zoiper & Linphone)' : 'Zoiper / Linphone Setup'}</span>
          </button>
        </div>
      </div>

      {/* Main Tab Content */}
      <div className="p-6">
        {/* TAB 1: SOFTPHONE DIALER */}
        {activeTab === 'dialer' && (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
            {/* Softphone Unit */}
            <div className="lg:col-span-6 bg-slate-950 rounded-3xl p-6 text-white shadow-xl border border-slate-800 flex flex-col justify-between">
              <div>
                {/* Status Bar */}
                <div className="flex items-center justify-between pb-4 border-b border-slate-800 text-xs">
                  <div className="flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                    <span className="font-mono text-slate-300">
                      SIP: <strong className="text-white">{DAFTARE_SHOMA_CONFIG.defaultUsername}</strong>
                    </span>
                  </div>
                  <div className="font-mono text-[11px] text-slate-400">
                    ext.daftareshoma.com:4443
                  </div>
                </div>

                {/* LCD Display */}
                <div className="my-5 p-4 rounded-2xl bg-slate-900 border border-slate-800 text-center relative overflow-hidden">
                  {callState === 'idle' && (
                    <div className="py-2">
                      <span className="text-[10px] font-mono text-slate-500 uppercase tracking-widest block mb-1">
                        {isFa ? 'آماده شماره‌گیری' : 'Ready to Dial'}
                      </span>
                      <div className="text-2xl font-mono font-bold tracking-widest text-emerald-400 min-h-[36px] flex items-center justify-center">
                        {dialedNumber || (
                          <span className="text-slate-600 text-base font-normal">
                            {isFa ? 'شماره داخلی یا مقصد را وارد کنید...' : 'Enter extension...'}
                          </span>
                        )}
                      </div>
                    </div>
                  )}

                  {callState === 'calling' && (
                    <div className="py-2">
                      <span className="text-xs font-mono text-amber-400 animate-pulse block mb-1">
                        {isFa ? 'در حال برقراری تماس...' : 'Connecting SIP Trunk...'}
                      </span>
                      <div className="text-xl font-bold text-white">
                        {activeCallTarget?.name || dialedNumber}
                      </div>
                      <span className="text-xs font-mono text-slate-400">
                        Ext: {activeCallTarget?.ext || dialedNumber} &bull; WebRTC wss
                      </span>
                    </div>
                  )}

                  {callState === 'connected' && (
                    <div className="py-2">
                      <div className="flex items-center justify-center gap-2 mb-1">
                        <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                        <span className="text-xs font-mono font-bold text-emerald-400">
                          {isFa ? 'مکالمه برقرار است' : 'In Call'} &bull; {formatDuration(callDuration)}
                        </span>
                      </div>
                      <div className="text-lg font-bold text-white">
                        {activeCallTarget?.name}
                      </div>
                      <p className="text-xs text-secondary font-medium">
                        {activeCallTarget?.dept} (داخلی {activeCallTarget?.ext})
                      </p>
                      
                      {/* Audio visualizer waveform animation */}
                      <div className="flex items-center justify-center gap-1 mt-3 h-5">
                        {[40, 75, 100, 50, 85, 30, 95, 60, 45, 90, 65, 35].map((height, i) => (
                          <motion.span
                            key={i}
                            animate={{ scaleY: [0.3, 1, 0.4] }}
                            transition={{ repeat: Infinity, duration: 0.6, delay: i * 0.05 }}
                            style={{ height: `${height}%` }}
                            className="w-1 bg-emerald-400 rounded-full"
                          />
                        ))}
                      </div>
                    </div>
                  )}

                  {callState === 'ended' && (
                    <div className="py-2">
                      <span className="text-xs font-mono text-red-400 block mb-1">
                        {isFa ? 'تماس خاتمه یافت' : 'Call Ended'}
                      </span>
                      <div className="text-base font-bold text-slate-300">
                        {formatDuration(callDuration)}
                      </div>
                    </div>
                  )}
                </div>

                {/* Keypad */}
                <div className="grid grid-cols-3 gap-3 max-w-[280px] mx-auto">
                  {[
                    { key: '1', sub: '.,-' },
                    { key: '2', sub: 'ABC' },
                    { key: '3', sub: 'DEF' },
                    { key: '4', sub: 'GHI' },
                    { key: '5', sub: 'JKL' },
                    { key: '6', sub: 'MNO' },
                    { key: '7', sub: 'PQRS' },
                    { key: '8', sub: 'TUV' },
                    { key: '9', sub: 'WXYZ' },
                    { key: '*', sub: 'TONE' },
                    { key: '0', sub: '+' },
                    { key: '#', sub: 'SEND' },
                  ].map(btn => (
                    <button
                      key={btn.key}
                      onClick={() => handleKeyPress(btn.key)}
                      className="p-3 rounded-2xl bg-slate-800/80 hover:bg-slate-700 active:bg-primary active:text-white transition-all text-center border border-slate-700/60 shadow-xs group"
                    >
                      <span className="block text-lg font-bold font-mono group-hover:scale-110 transition-transform">
                        {btn.key}
                      </span>
                      <span className="block text-[8px] font-mono text-slate-400 uppercase tracking-wider">
                        {btn.sub}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Call Controls Bar */}
              <div className="mt-6 pt-4 border-t border-slate-800">
                <div className="flex items-center justify-center gap-4">
                  {/* Mute */}
                  <button
                    onClick={() => setIsMuted(!isMuted)}
                    className={`p-3 rounded-2xl border transition-all ${
                      isMuted 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                    title={isMuted ? 'Unmute' : 'Mute'}
                  >
                    {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>

                  {/* Call / End Button */}
                  {callState === 'idle' ? (
                    <button
                      onClick={() => handleStartCall()}
                      className="px-8 py-3.5 rounded-2xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-emerald-900/40 hover:scale-105"
                    >
                      <Phone className="w-5 h-5" />
                      <span>{isFa ? 'تماس' : 'Call'}</span>
                    </button>
                  ) : (
                    <button
                      onClick={handleEndCall}
                      className="px-8 py-3.5 rounded-2xl bg-red-600 hover:bg-red-500 text-white font-bold transition-all flex items-center gap-2 shadow-lg shadow-red-900/40 hover:scale-105"
                    >
                      <PhoneOff className="w-5 h-5" />
                      <span>{isFa ? 'قطع تماس' : 'End Call'}</span>
                    </button>
                  )}

                  {/* Speaker */}
                  <button
                    onClick={() => setIsSpeakerOn(!isSpeakerOn)}
                    className={`p-3 rounded-2xl border transition-all ${
                      !isSpeakerOn 
                        ? 'bg-amber-500/20 border-amber-500 text-amber-400' 
                        : 'bg-slate-800 border-slate-700 text-slate-300 hover:bg-slate-700'
                    }`}
                    title={isSpeakerOn ? 'Mute Speaker' : 'Speaker On'}
                  >
                    {isSpeakerOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
                  </button>

                  {/* Clear */}
                  <button
                    onClick={() => setDialedNumber('')}
                    className="p-3 rounded-2xl bg-slate-800 border border-slate-700 text-slate-300 hover:bg-slate-700 transition-all text-xs font-mono"
                    title={isFa ? 'پاک کردن' : 'Clear'}
                  >
                    CLR
                  </button>
                </div>
              </div>
            </div>

            {/* Quick Extension Dial Panel */}
            <div className="lg:col-span-6 space-y-4">
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2 mb-3">
                  <Sparkles className="w-4 h-4 text-amber-500" />
                  {isFa ? 'شماره‌گیری سریع داخلی‌های کلیدی سازمانی' : 'Speed Dial Key Extensions'}
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {[
                    { ext: '101', name: isFa ? 'سید ژینو ایوبیان' : 'Gino Ayyoubian', title: isFa ? 'مدیرعامل و رئیس هیئت مدیره' : 'CEO & Chairman', avatar: '/images/gino-ayyoubian.jpg' },
                    { ext: '102', name: isFa ? 'دکتر رضا عساکره' : 'Dr. Reza Asakereh', title: isFa ? 'مدیر فناوری و هوش مصنوعی' : 'CTO & AI Systems' },
                    { ext: '103', name: isFa ? 'دکتر خسرو جراحیان' : 'Dr. Khosro Jarrahian', title: isFa ? 'مدیر ارشد علوم زمین' : 'CSO & Earth Sciences' },
                    { ext: '104', name: isFa ? 'فرید ایمانی' : 'Farid Imani', title: isFa ? 'مدیر سرمایه‌گذاری و شبکه' : 'CIO & Investments' },
                    { ext: '105', name: isFa ? 'دکتر پدرام آبدارزاده' : 'Dr. Pedram Abdarzadeh', title: isFa ? 'مدیر ارشد مالی' : 'CFO & Treasury' },
                    { ext: '200', name: isFa ? 'اپراتور و پذیرش مرکزی' : 'Central Operator', title: isFa ? 'میز خدمت KKM' : 'Corporate Helpdesk' },
                  ].map(item => (
                    <div
                      key={item.ext}
                      onClick={() => handleStartCall(item.ext)}
                      className="p-3 rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-700 hover:border-primary cursor-pointer transition-all hover:shadow-md flex items-center justify-between group"
                    >
                      <div className="flex items-center gap-2.5 min-w-0">
                        <div className="w-9 h-9 rounded-xl overflow-hidden shrink-0 border border-slate-300 dark:border-slate-700">
                          <ExecutiveMemberIdentity
                            name={item.name}
                            role={item.ext === '101' ? 'executive' : 'director'}
                            photoUrl={item.avatar}
                            size="sm"
                            showBadge={false}
                          />
                        </div>
                        <div className="min-w-0">
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white truncate group-hover:text-primary transition-colors">
                            {item.name}
                          </h4>
                          <p className="text-[10px] text-slate-500 dark:text-slate-400 truncate">
                            {item.title}
                          </p>
                        </div>
                      </div>

                      <span className="px-2 py-1 rounded-lg bg-emerald-50 text-emerald-700 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono text-xs font-bold shrink-0 flex items-center gap-1">
                        <Phone className="w-3 h-3" />
                        {item.ext}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* DaftareShoma Live Trunk Info */}
              <div className="p-4 rounded-2xl bg-slate-900 text-slate-300 border border-slate-800 text-xs space-y-2.5 font-mono">
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Trunk Gateway:</span>
                  <span className="text-emerald-400 font-bold">ext.daftareshoma.com</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">WebRTC Port:</span>
                  <span className="text-slate-200">4443 (WSS / Secure)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">UDP / TCP Ports:</span>
                  <span className="text-slate-200">7104 (UDP) / 7103 (TCP)</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-slate-400">Main Corporate Line:</span>
                  <span className="text-amber-400 font-bold">{DAFTARE_SHOMA_CONFIG.mainOfficeNumber}</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* TAB 2: IVR MENU TREE */}
        {activeTab === 'ivrTree' && (
          <div className="space-y-4">
            <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/60 text-xs text-amber-900 dark:text-amber-200 flex items-start gap-3">
              <Info className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400 mt-0.5" />
              <div>
                <p className="font-bold">
                  {isFa 
                    ? 'ساختار سلسله‌مراتبی تلفن گویای سازمانی (IVR Routing Tree)'
                    : 'Official KKM IVR Routing Architecture'}
                </p>
                <p className="mt-0.5 text-[11px] leading-relaxed opacity-90">
                  {isFa
                    ? 'مخاطبان هنگام تماس با خط اصلی شرکت (+98 21 9103 0830) با کلیدهای زیر به طور خودکار به واحدهای مربوطه و داخلی‌های همکاران هدایت می‌شوند.'
                    : 'Callers to the main office line are greeted and routed according to this dial tree.'}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {IVR_DIAL_TREE.map(node => (
                <div
                  key={node.key}
                  className="p-4 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 shadow-xs hover:shadow-md transition-all flex flex-col justify-between"
                >
                  <div>
                    <div className="flex items-start justify-between gap-2 mb-2">
                      <span className="w-7 h-7 rounded-xl bg-primary text-white font-mono font-bold text-sm flex items-center justify-center shadow-xs">
                        {node.key}
                      </span>
                      <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-700 font-mono text-xs font-bold text-slate-700 dark:text-slate-300">
                        {isFa ? `داخلی ${node.targetExtension}` : `Ext: ${node.targetExtension}`}
                      </span>
                    </div>

                    <h4 className="text-sm font-bold text-slate-900 dark:text-white">
                      {isFa ? node.titleFa : node.titleEn}
                    </h4>

                    <p className="text-xs text-secondary font-semibold mt-1">
                      {isFa ? node.targetLeaderFa : node.targetLeaderEn}
                    </p>

                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-2 italic bg-slate-50 dark:bg-slate-900/60 p-2.5 rounded-xl border border-slate-100 dark:border-slate-800">
                      &ldquo;{isFa ? node.announcementFa : node.announcementEn}&rdquo;
                    </p>
                  </div>

                  <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-700/60 flex items-center justify-between">
                    <span className="text-[10px] font-mono text-slate-400">
                      {isFa ? node.targetDepartmentFa : node.targetDepartmentEn}
                    </span>

                    <button
                      onClick={() => {
                        setActiveTab('dialer');
                        handleStartCall(node.targetExtension);
                      }}
                      className="px-2.5 py-1 rounded-lg bg-emerald-600 hover:bg-emerald-500 text-white text-[11px] font-bold transition-colors flex items-center gap-1"
                    >
                      <Phone className="w-3 h-3" />
                      <span>{isFa ? 'تماس' : 'Dial'}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: EXTENSIONS DIRECTORY */}
        {activeTab === 'directory' && (
          <div className="space-y-4">
            {/* Search Bar */}
            <div className="relative">
              <Search className="w-4 h-4 absolute top-3.5 right-3 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isFa ? 'جستجو بر اساس نام همکار، دپارتمان یا شماره داخلی...' : 'Search by name, department or extension...'}
                className="w-full pr-10 pl-4 py-2.5 rounded-xl bg-slate-50 dark:bg-slate-800/80 border border-slate-200 dark:border-slate-700 text-xs focus:ring-2 focus:ring-primary focus:outline-hidden"
              />
            </div>

            {/* Members Extensions Table */}
            <div className="overflow-x-auto rounded-2xl border border-slate-200 dark:border-slate-700">
              <table className="w-full text-xs text-left">
                <thead className="bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 font-bold uppercase tracking-wider text-[10px]">
                  <tr>
                    <th className="p-3.5">{isFa ? 'همکار و سمت' : 'Team Member & Title'}</th>
                    <th className="p-3.5">{isFa ? 'دپارتمان' : 'Department'}</th>
                    <th className="p-3.5">{isFa ? 'داخلی تلفن' : 'Extension'}</th>
                    <th className="p-3.5">{isFa ? 'شناسه SIP ترانک' : 'SIP Trunk ID'}</th>
                    <th className="p-3.5">{isFa ? 'وضعیت حضور' : 'Presence'}</th>
                    <th className="p-3.5 text-center">{isFa ? 'اقدام' : 'Action'}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 dark:divide-slate-800 bg-white dark:bg-slate-900">
                  {filteredMembers.map((member) => (
                    <tr key={member.uid} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                      <td className="p-3.5">
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full overflow-hidden shrink-0">
                            <ExecutiveMemberIdentity
                              name={member.displayName}
                              nameFa={member.displayNameFa}
                              role={member.role}
                              photoUrl={member.avatarUrl}
                              size="sm"
                              showBadge={false}
                            />
                          </div>
                          <div>
                            <div className="font-bold text-slate-900 dark:text-white">
                              {isFa && member.displayNameFa ? member.displayNameFa : member.displayName}
                            </div>
                            <div className="text-[10px] text-slate-500 dark:text-slate-400">
                              {isFa && member.titleFa ? member.titleFa : member.title}
                            </div>
                          </div>
                        </div>
                      </td>

                      <td className="p-3.5 text-slate-600 dark:text-slate-400">
                        {isFa && member.departmentFa ? member.departmentFa : member.department}
                      </td>

                      <td className="p-3.5">
                        <span className="px-2.5 py-1 rounded-lg bg-emerald-50 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 font-mono font-bold text-xs">
                          {member.sipExtension || 'N/A'}
                        </span>
                      </td>

                      <td className="p-3.5 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {member.sipUsername || DAFTARE_SHOMA_CONFIG.defaultUsername}
                      </td>

                      <td className="p-3.5">
                        <span className="flex items-center gap-1.5 text-[11px] font-medium text-emerald-600 dark:text-emerald-400">
                          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                          {isFa ? 'آماده پاسخگویی' : 'Available'}
                        </span>
                      </td>

                      <td className="p-3.5 text-center">
                        <button
                          onClick={() => {
                            setActiveTab('dialer');
                            handleStartCall(member.sipExtension || member.sipUsername || DAFTARE_SHOMA_CONFIG.defaultUsername);
                          }}
                          className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs transition-colors flex items-center gap-1.5 mx-auto"
                        >
                          <Phone className="w-3.5 h-3.5" />
                          <span>{isFa ? 'تماس' : 'Call'}</span>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 4: ZOIPER & LINPHONE CONFIGURATION HUB */}
        {activeTab === 'softphoneConfig' && (
          <div className="space-y-6">
            <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/30 border border-blue-200 dark:border-blue-800/60 text-xs text-blue-950 dark:text-blue-200">
              <h4 className="font-bold flex items-center gap-2 mb-1">
                <Server className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                {isFa ? 'پیکربندی نرم‌افزارهای تلفن همراه و دسکتاپ (Zoiper & Linphone)' : 'Softphone Provisioning Parameters'}
              </h4>
              <p className="text-[11px] leading-relaxed opacity-90">
                {isFa 
                  ? 'جهت اتصال تلفن‌های همراه همکاران به خطوط تلفن ابری «دفتر شما» و شماره‌گیری مستقیم داخلی‌ها، اطلاعات زیر را در نرم‌افزارهای زویپر یا لینفون وارد فرمایید یا فایل‌های پیکربندی آماده را بارگیری نمایید.'
                  : 'Use the following credentials to register Zoiper or Linphone softphones with the DaftareShoma PBX.'}
              </p>
            </div>

            {/* Parameters Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { label: isFa ? 'شناسه کاربری ترانک (Username)' : 'SIP Username / Extension', value: DAFTARE_SHOMA_CONFIG.defaultUsername, key: 'user' },
                { label: isFa ? 'دامنه و پورت پروتکل UDP' : 'Domain (UDP Transport)', value: DAFTARE_SHOMA_CONFIG.domainUdp, key: 'udp' },
                { label: isFa ? 'دامنه و پورت پروتکل TCP' : 'Domain (TCP Transport)', value: DAFTARE_SHOMA_CONFIG.domainTcp, key: 'tcp' },
                { label: isFa ? 'درگاه تماس تحت وب WebRTC' : 'WebRTC WSS Gateway', value: DAFTARE_SHOMA_CONFIG.domainWebRtc, key: 'webrtc' },
                { label: isFa ? 'آدرس SIP URI مستقیم' : 'Direct SIP URI', value: `sip:${DAFTARE_SHOMA_CONFIG.defaultUsername}@${DAFTARE_SHOMA_CONFIG.domainUdp}`, key: 'uri' },
                { label: isFa ? 'کدک‌های صوتی مجاز' : 'Preferred Audio Codecs', value: DAFTARE_SHOMA_CONFIG.codecs.join(', '), key: 'codecs' },
              ].map(item => (
                <div
                  key={item.key}
                  className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/60 border border-slate-200 dark:border-slate-700/60 flex items-center justify-between"
                >
                  <div className="min-w-0">
                    <span className="text-[10px] font-mono uppercase text-slate-500 dark:text-slate-400 block mb-0.5">
                      {item.label}
                    </span>
                    <span className="font-mono text-xs font-bold text-slate-900 dark:text-white truncate block">
                      {item.value}
                    </span>
                  </div>

                  <button
                    onClick={() => copyToClipboard(item.value, item.key)}
                    className="p-2 rounded-xl bg-white dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 text-slate-600 dark:text-slate-300 transition-colors shrink-0 shadow-2xs"
                    title={isFa ? 'کپی' : 'Copy'}
                  >
                    {copiedKey === item.key ? (
                      <Check className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <Copy className="w-4 h-4" />
                    )}
                  </button>
                </div>
              ))}
            </div>

            {/* Auto-Download Buttons */}
            <div className="p-6 rounded-3xl bg-slate-900 text-white border border-slate-800 flex flex-wrap items-center justify-between gap-4">
              <div>
                <h4 className="font-bold text-sm">
                  {isFa ? 'بارگیری خودکار فایل‌های تنظیمات نرم‌افزارهای تلفن' : 'Auto-Provisioning Profiles'}
                </h4>
                <p className="text-xs text-slate-400 mt-0.5">
                  {isFa 
                    ? 'فایل‌های پیش‌تنظیم شده برای ورود مستقیم به نرم‌افزار بدون نیاز به تایپ دستی پارامترها'
                    : 'Download ready-to-import configuration files for your device.'}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <button
                  onClick={handleDownloadZoiper}
                  className="px-4 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs transition-colors flex items-center gap-2 shadow-sm"
                >
                  {downloadSuccess === 'zoiper' ? (
                    <>
                      <Check className="w-4 h-4" />
                      <span>{isFa ? 'بارگیری شد' : 'Downloaded!'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{isFa ? 'دانلود پروفایل Zoiper (XML)' : 'Download Zoiper Profile'}</span>
                    </>
                  )}
                </button>

                <button
                  onClick={handleDownloadLinphone}
                  className="px-4 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs transition-colors flex items-center gap-2 border border-slate-700"
                >
                  {downloadSuccess === 'linphone' ? (
                    <>
                      <Check className="w-4 h-4 text-emerald-400" />
                      <span className="text-emerald-400">{isFa ? 'بارگیری شد' : 'Downloaded!'}</span>
                    </>
                  ) : (
                    <>
                      <Download className="w-4 h-4" />
                      <span>{isFa ? 'دانلود تنظیمات Linphone (RC)' : 'Download Linphone Config'}</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
