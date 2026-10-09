import * as React from 'react';
import { Page } from '../types';
import { useLanguage } from '../LanguageContext';
import { motion } from 'motion/react';
import { Building2, FileCheck, MapPin, Phone, Globe, Briefcase, Mail, ShieldAlert, ArrowRight, Download } from 'lucide-react';
import { getMemberPhotoObjectPosition } from '../components/common/ExecutiveMemberIdentity';

interface CorporateInfoPageProps {
  setPage: (page: Page) => void;
}

const CorporateInfoPage: React.FC<CorporateInfoPageProps> = ({ setPage }) => {
  const { direction, isFa } = useLanguage();

  const InfoRow = ({ label, value }: { label: string, value: string }) => (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between py-4 border-b border-gray-100 dark:border-slate-800">
      <span className="font-bold text-slate-500 w-1/3">{label}</span>
      <span className="font-semibold text-slate-900 dark:text-white w-2/3">{value}</span>
    </div>
  );

  return (
    <div className="w-full bg-slate-50 dark:bg-slate-950 min-h-screen pt-24 pb-16" dir={direction}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
        <div className="mb-12">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary-dark dark:text-secondary text-xs font-bold uppercase tracking-wider mb-4">
            <FileCheck className="w-4 h-4" />
            {isFa ? 'اطلاعات رسمی شرکتی و ارزیابی موشکافانه' : 'Official Corporate & Due Diligence Profile'}
          </div>
          <h1 className="text-4xl md:text-5xl font-display font-black text-slate-900 dark:text-white mb-4">
            {isFa ? 'شناسنامه و مشخصات ثبتی شرکت' : 'Corporate Information'}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400">
            {isFa 
              ? 'اطلاعات حقوقی، مشخصات ثبتی، ساختار حاکمیتی و کانال‌های رسمی گروه بین‌المللی کیمیا کاران ماد.' 
              : 'Official registration, structure, governance, and due diligence records of KKM International Group.'}
          </p>
        </div>

        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white dark:bg-slate-900 rounded-3xl shadow-sm border border-slate-200 dark:border-slate-800 p-8 md:p-12">
          
          <div className="flex items-center gap-4 mb-8 pb-8 border-b border-slate-100 dark:border-slate-800">
            <div className="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center text-primary-dark">
              <Building2 className="w-8 h-8" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
                {isFa ? 'شرکت کیمیا کاران ماد (سهامی خاص)' : 'Kimia Karan Mâd (P.J.S.C.)'}
              </h2>
              <p className="text-slate-500">
                {isFa ? 'گروه بین‌المللی کیمیا کاران ماد | ثبت شده تحت قوانین جمهوری اسلامی ایران' : 'KKM International Group | Registered Consortium'}
              </p>
            </div>
          </div>

          <div className="space-y-2 mb-12">
             <InfoRow label={isFa ? 'نام رسمی حقوقی' : 'Official Legal Name'} value={isFa ? 'شرکت کیمیا کاران ماد (سهامی خاص)' : 'Kimia Karan Mâd Private Joint Stock Company'} />
             <InfoRow label={isFa ? 'نام تجاری بین‌المللی' : 'Trading Name'} value="KKM International Group" />
             <InfoRow label={isFa ? 'شماره ثبت' : 'Registration Number'} value="384054" />
             <InfoRow label={isFa ? 'شناسه ملی' : 'National ID'} value="10320351200" />
             <InfoRow label={isFa ? 'تاریخ ثبت رسمی' : 'Registration Date'} value={isFa ? '۳۰ شهریور ۱۳۸۹ (2010-09-21)' : 'September 21, 2010'} />
             <InfoRow label={isFa ? 'ساختار حقوقی' : 'Legal Structure'} value={isFa ? 'سهامی خاص (کنسرسیوم مهندسی، فناوری و سرمایه‌گذاری)' : 'Private Joint Stock (Consortium)'} />
             <InfoRow label={isFa ? 'سرمایه ثبتی اولیه' : 'Registered Capital'} value={isFa ? '۱,۰۰۰,۰۰۰,۰۰۰ ریال (منقسم به ۱۰۰ سهم ۱۰,۰۰۰,۰۰۰ ریالی با نام)' : 'IRR 1,000,000,000 (100 Registered Shares)'} />
             <InfoRow label={isFa ? 'صاحبان امضای مجاز' : 'Authorized Signatories'} value={isFa ? 'رئیس هیئت مدیره همراه با مهر رسمی شرکت' : 'Chairman of the Board with Official Company Seal'} />
             <InfoRow label={isFa ? 'حوزه اصلی فعالیت' : 'Primary Sector'} value={isFa ? 'مهندسی، انرژی، ژئوترمال، آب، زیرساخت و فناوری‌های نوین' : 'Engineering, Geothermal, Energy, Water & Infrastructure'} />
             <InfoRow label={isFa ? 'حاکمیت شرکتی' : 'Governance'} value={isFa ? 'هیئت مدیره و مجمع عمومی صاحبان سهام' : 'Board of Directors & General Assembly'} />
          </div>

          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="text-primary w-5 h-5" /> 
                {isFa ? 'اعضای اصلی هیئت مدیره و کادر اجرایی' : 'Executive Board & Leadership'}
              </h3>
              <button
                onClick={() => setPage(Page.Team)}
                className="text-xs font-bold text-primary hover:text-primary-dark transition-colors inline-flex items-center gap-1"
              >
                {isFa ? 'مشاهده کادر کامل رهبری' : 'View Full Leadership'}
                <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
              </button>
            </div>

            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                {
                  name: 'Gino Ayyoubian',
                  nameFa: 'سید ژینو ایوبیان',
                  role: 'CEO & Chairman',
                  roleFa: 'مدیرعامل و رئیس هیئت مدیره',
                  image: '/images/gino-ayyoubian.jpg',
                  dept: 'Executive Board',
                  deptFa: 'هیئت مدیره',
                },
                {
                  name: 'Reza Baghdadchi',
                  nameFa: 'رضا بغدادچی',
                  role: 'Vice Chairman',
                  roleFa: 'نایب رئیس هیئت مدیره',
                  image: '/images/reza-baghdadchi.jpg',
                  dept: 'Executive Board',
                  deptFa: 'هیئت مدیره',
                },
                {
                  name: 'Ashkan Tofangchiha',
                  nameFa: 'اشکان تفنگچی‌ها',
                  role: 'Board Member & CCIO',
                  roleFa: 'عضو هیئت مدیره و مدیر بازرگانی',
                  image: '/images/ashkan-tofangchiha.jpg',
                  dept: 'Commercial Directorate',
                  deptFa: 'هیئت مدیره و بازرگانی',
                },
                {
                  name: 'Dr. Khosro Jarrahian',
                  nameFa: 'دکتر خسرو جراحیان',
                  role: 'Director of Sustainability',
                  roleFa: 'مدیر دپارتمان پایداری و آب',
                  image: '/images/khosro-jarrahian.jpg',
                  dept: 'Sustainability & Water',
                  deptFa: 'پایداری و محیط زیست',
                },
              ].map((leader) => (
                <div
                  key={leader.name}
                  onClick={() => setPage(Page.Team)}
                  className="bg-slate-50 dark:bg-slate-950 p-4 rounded-2xl border border-slate-100 dark:border-slate-800 hover:border-primary/40 transition-all cursor-pointer group flex flex-col items-center text-center"
                >
                  <img
                    src={leader.image}
                    alt={isFa ? leader.nameFa : leader.name}
                    width={64}
                    height={64}
                    loading="lazy"
                    referrerPolicy="no-referrer"
                    className="w-16 h-16 rounded-xl object-cover shadow-sm mb-3 border border-slate-200 dark:border-slate-700 group-hover:scale-105 transition-transform"
                    style={{ objectPosition: getMemberPhotoObjectPosition(leader.image || leader.name) }}
                  />
                  <h4 className="font-bold text-sm text-slate-900 dark:text-white group-hover:text-primary transition-colors">
                    {isFa ? leader.nameFa : leader.name}
                  </h4>
                  <p className="text-[11px] font-semibold text-primary dark:text-secondary mt-0.5">
                    {isFa ? leader.roleFa : leader.role}
                  </p>
                  <p className="text-[10px] text-slate-400 mt-0.5">
                    {isFa ? leader.deptFa : leader.dept}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <MapPin className="text-primary w-5 h-5" /> {isFa ? 'نشانی‌های رسمی' : 'Official Locations'}
          </h3>
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{isFa ? 'دفتر مرکزی (تهران)' : 'Headquarters (Tehran)'}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isFa 
                  ? 'تهران، بلوار نلسون ماندلا، خیابان سرو، پلاک ۱۰۱' 
                  : 'Building No. 101, Sarv Avenue, Nelson Mandela Boulevard, Tehran, Iran.'}
              </p>
              <p className="text-sm text-slate-500 mt-2">{isFa ? 'کد پستی:' : 'Postal Code:'} 1968945741</p>
            </div>
            <div className="p-6 bg-slate-50 dark:bg-slate-950 rounded-2xl border border-slate-100 dark:border-slate-800">
              <h4 className="font-bold text-slate-900 dark:text-white mb-2">{isFa ? 'دفتر منطقه آزاد (قشم)' : 'Branch Office (Qeshm)'}</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {isFa ? 'منطقه آزاد قشم، برج نوآوری، واحد ۲' : 'Unit 2, Innovation Tower, Qeshm Free Zone, Iran'}
              </p>
              <p className="text-sm text-slate-500 mt-2">{isFa ? 'پایگاه پروژه‌های انرژی و دریایی' : 'Offshore & Marine Operations Hub'}</p>
            </div>
          </div>

          <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-6 flex items-center gap-2">
            <Phone className="text-primary w-5 h-5" /> {isFa ? 'ارتباطات و دامنه‌های رسمی تایید شده' : 'Verified Contact & Corporate Domains'}
          </h3>
          <div className="space-y-4 mb-10">
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
               <Phone className="w-5 h-5 text-slate-400" />
               <a href="tel:+982191030830" className="hover:text-primary transition-colors font-mono" dir="ltr">+98 21 9103 0830</a>
               <span className="text-xs text-slate-400">({isFa ? 'مرکز تلفن و سانترال هوشمند' : 'Central Switchboard & IVR Gateway'})</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
               <Mail className="w-5 h-5 text-slate-400" />
               <a href="mailto:info@kkm-intl.org" className="hover:text-primary transition-colors font-mono">info@kkm-intl.org</a>
               <span className="text-xs text-slate-400">({isFa ? 'رایانامه رسمی شرکتی' : 'Primary Official Email'})</span>
            </div>
            <div className="flex items-center gap-4 text-slate-700 dark:text-slate-300">
               <Globe className="w-5 h-5 text-slate-400" />
               <a href="https://kkm-intl.org" target="_blank" rel="noopener noreferrer" className="hover:text-primary transition-colors font-mono">kkm-intl.org</a>
               <span className="text-xs text-slate-400">({isFa ? 'دامنه رسمی گروه' : 'Official Corporate Domain'})</span>
            </div>
          </div>

          {/* Due Diligence Dossier Request Block */}
          <div className="p-6 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-2xl flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h4 className="font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Briefcase className="w-5 h-5 text-primary" />
                {isFa ? 'درخواست پرونده ارزیابی موشکافانه (Due Diligence Dossier)' : 'Corporate Due Diligence Dossier'}
              </h4>
              <p className="text-sm text-slate-600 dark:text-slate-400 mt-1">
                {isFa 
                  ? 'دسترسی به اساسنامه، روزنامه رسمی، گواهی‌های استاندارد و اسناد ممیزی تحت توافق‌نامه محرمانگی (NDA).' 
                  : 'Access official articles of association, official gazette records, ISO certifications, and financial audit dossiers under mutual NDA.'}
              </p>
            </div>
            <button 
              onClick={() => setPage(Page.Contact)}
              className="px-6 py-3 bg-primary text-white font-bold rounded-xl hover:bg-primary-dark transition-colors flex items-center gap-2 whitespace-nowrap text-sm"
            >
              {isFa ? 'درخواست مدارک رسمی' : 'Request Dossier'}
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

        </motion.div>
      </div>
    </div>
  );
};

export default CorporateInfoPage;
