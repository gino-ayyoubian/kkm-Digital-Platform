import * as React from 'react';
import { 
  LayoutDashboard, Inbox, FileText, Clock, PhoneCall, 
  GitBranch, Network, Sliders, Users, UserCheck, FolderGit2 
} from 'lucide-react';
import type { NavModuleItem } from '../components/portal/PortalHeader';

export const getPortalModules = (
  pendingCount: number = 0,
  canManageUsers: boolean = false,
  isAdmin: boolean = false
): NavModuleItem[] => [
  // 1. OPERATIONS & WORKSTATION
  {
    id: 'dashboard',
    labelEn: 'Dashboard & Desk',
    labelFa: 'میز کار و داشبورد',
    shortLabelFa: 'میز کار',
    shortLabelEn: 'Dashboard',
    descFa: 'خلاصه وظایف، ابزارهای اداری و فرآیندهای روزانه',
    descEn: 'Workstation overview, quick desk tools & operational directives',
    category: 'operations',
    icon: LayoutDashboard,
  },
  {
    id: 'cartable',
    labelEn: 'Automation Cartable',
    labelFa: 'کارتابل اتوماسیون',
    shortLabelFa: 'کارتابل',
    shortLabelEn: 'Cartable',
    descFa: 'گردش کار اداری، تایید اسناد و درخواست‌های سازمانی',
    descEn: 'Administrative workflow, formal approvals & request cartable',
    category: 'operations',
    icon: Inbox,
    badge: pendingCount,
  },
  {
    id: 'attendance',
    labelEn: 'Attendance & Telemetry',
    labelFa: 'ثبت تردد و دورکاری',
    shortLabelFa: 'ثبت تردد',
    shortLabelEn: 'Attendance',
    descFa: 'حضور و غیاب الکترونیک، شیفت کاری و تله‌متری دورکاری',
    descEn: 'Electronic clock-in, remote work telemetry & attendance registry',
    category: 'operations',
    icon: Clock,
  },
  {
    id: 'dms',
    labelEn: 'DMS & Policies',
    labelFa: 'مرکز اسناد و بخشنامه‌ها',
    shortLabelFa: 'اسناد و بخشنامه‌ها',
    shortLabelEn: 'DMS Repository',
    descFa: 'مستندات استاندارد، ایزو، قراردادها و آیین‌نامه‌ها',
    descEn: 'ISO standards, official circulars, contracts & policies',
    category: 'operations',
    icon: FileText,
  },
  {
    id: 'teamOps',
    labelEn: 'Cohort Operations & GitHub Oversight',
    labelFa: 'میز کار عملیات اجرایی و گیت‌هاب',
    shortLabelFa: 'عملیات و گیت‌هاب',
    shortLabelEn: 'Cohort & GitHub',
    descFa: 'پیگیری چابک پروژه‌ها، نظارت بر مخازن گیت‌هاب و پایپ‌لاین پتنت‌ها (ویژه تیم ۱۵-۲۰ نفره)',
    descEn: 'Rapid project tracking, GitHub repository health & patent pipeline (15-20 core cohort)',
    category: 'operations',
    icon: FolderGit2,
  },

  // 2. TELEPHONY & COMMUNICATIONS (Daftare Shoma Cloud PBX & IVR)
  {
    id: 'ivr',
    labelEn: 'Daftare Shoma Cloud PBX & IVR',
    labelFa: 'تلفن ابری دفتر شما و سامانه IVR',
    shortLabelFa: 'تلفن ابری دفتر شما',
    shortLabelEn: 'Daftare Shoma PBX',
    descFa: 'کنسول خط ۰۲۱۹۱۰۳۰۸۳۰، سافت‌فون تحت وب WebRTC و لاگ تماس‌ها',
    descEn: 'Cloud PBX for line +982191030830, WebRTC softphone & call logs',
    category: 'communications',
    icon: PhoneCall,
  },
  {
    id: 'internalCommunication',
    labelEn: 'Internal Communication & IVR Architecture',
    labelFa: 'ارتباطات سازمانی و معماری تلفن گویا',
    shortLabelFa: 'معماری و جریان IVR',
    shortLabelEn: 'IVR Architecture',
    descFa: 'درخت هدایت هوشمند تماس، صفوف پاسخگویی و دیاگرام ترانک',
    descEn: 'Call routing tree, trunk integration logic & queue architecture',
    category: 'communications',
    icon: GitBranch,
  },
  {
    id: 'internalDirectory',
    labelEn: 'Internal Directory & Staff Extensions',
    labelFa: 'دفترچه تلفن و داخلی‌های پرسنل',
    shortLabelFa: 'دفترچه داخلی‌ها',
    shortLabelEn: 'Staff Directory',
    descFa: 'شماره‌های مستقیم، داخلی‌های ۳ رقمی و دایورت موبایل همکاران',
    descEn: 'Direct staff phone numbers, 3-digit extensions & call forwarding',
    category: 'communications',
    icon: Users,
  },

  // 3. GOVERNANCE & ORGANIZATION
  {
    id: 'orgchart',
    labelEn: 'Org Directory & Structure',
    labelFa: 'ارکان و چارت سازمانی',
    shortLabelFa: 'چارت سازمانی',
    shortLabelEn: 'Org Chart',
    descFa: 'سلسله‌مراتب، هیئت مدیره، مدیران ارشد و تفکیک وظایف سازمانی',
    descEn: 'Corporate hierarchy, board members, directors & org chart',
    category: 'governance',
    icon: Network,
  },
  ...(canManageUsers || isAdmin ? [
    {
      id: 'users',
      labelEn: 'Users & RBAC Access',
      labelFa: 'مدیریت کاربران و دسترسی‌ها',
      shortLabelFa: 'کاربران و دسترسی‌ها',
      shortLabelEn: 'Users & RBAC',
      descFa: 'کنترل نقش‌ها (RBAC)، ایجاد کاربر جدید و سطوح محرمانگی',
      descEn: 'Role-Based Access Control, clearance levels & user accounts',
      category: 'governance' as const,
      icon: UserCheck,
      adminOnly: true,
    },
    {
      id: 'adminControl',
      labelEn: 'GMEL Telemetry & CMS',
      labelFa: 'کنترل پنل تله‌متری GMEL و CMS',
      shortLabelFa: 'تله‌متری و CMS',
      shortLabelEn: 'Telemetry & CMS',
      descFa: 'نظارت بلادرنگ بر لاگ‌های سیستم، تله‌متری و ویرایش محتوای پرتال',
      descEn: 'Real-time telemetry monitoring, system logs & CMS control',
      category: 'governance' as const,
      icon: Sliders,
      adminOnly: true,
    }
  ] : []),
];
