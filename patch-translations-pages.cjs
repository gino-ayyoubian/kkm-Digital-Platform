const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const enKeys = `    [Page.Home]: 'Home',
    [Page.AboutUs]: 'About Us',
    [Page.Technology]: 'Technology',
    [Page.Ecosystems]: 'KKM Ecosystems',
    [Page.RuralStudies]: 'Rural & Nomadic Development',
    [Page.Invest]: 'Invest & Partner',
    [Page.Insights]: 'Insights',`;

const faKeys = `    [Page.Home]: 'خانه',
    [Page.AboutUs]: 'درباره ما',
    [Page.Technology]: 'فناوری',
    [Page.Ecosystems]: 'اکوسیستم‌های KKM',
    [Page.RuralStudies]: 'توسعه روستایی و عشایری',
    [Page.Invest]: 'سرمایه‌گذاری و مشارکت',
    [Page.Insights]: 'دیدگاه‌ها',`;

const arKeys = `    [Page.Home]: 'الصفحة الرئيسية',
    [Page.AboutUs]: 'معلومات عنا',
    [Page.Technology]: 'تكنولوجيا',
    [Page.Ecosystems]: 'نظم KKM البيئية',
    [Page.RuralStudies]: 'التنمية الريفية والبدوية',
    [Page.Invest]: 'الاستثمار والشراكة',
    [Page.Insights]: 'رؤى',`;

const kuKeys = `    [Page.Home]: 'ماڵەوە',
    [Page.AboutUs]: 'دەربارەی ئێمە',
    [Page.Technology]: 'تەکنەلۆژیا',
    [Page.Ecosystems]: 'سیستەمەکانی ژینگەیی KKM',
    [Page.RuralStudies]: 'گەشەپێدانی لادێیی و کۆچەری',
    [Page.Invest]: 'وەبەرهێنان و هاوبەشی',
    [Page.Insights]: 'بۆچوونەکان',`;

content = content.replace(/\[Page\.Home\]: 'Home',\s*\[Page\.AboutUs\]: 'About Us',/, enKeys);
content = content.replace(/\[Page\.Home\]: 'خانه',\s*\[Page\.AboutUs\]: 'درباره ما',/, faKeys);
content = content.replace(/\[Page\.Home\]: 'الصفحة الرئيسية',\s*\[Page\.AboutUs\]: 'معلومات عنا',/, arKeys);
content = content.replace(/\[Page\.Home\]: 'ماڵەوە',\s*\[Page\.AboutUs\]: 'دەربارەی ئێمە',/, kuKeys);

fs.writeFileSync('translations.ts', content);
