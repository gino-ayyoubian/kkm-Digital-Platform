const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

const enNew = "'WhoWeAreSummary': 'KKM International Group is an engineering and technology group dedicated to the development, integration, and commercialization of solutions spanning energy, infrastructure, water, industrial technology, and digital systems.',";
content = content.replace(/'WhoWeAreSummary': 'KKM International \(Kimia Karan Mad\) is a global powerhouse in engineering and technology, dedicated to creating a self-sustaining future\. We merge advanced infrastructure capabilities with cutting-edge innovation in energy and health\.',/g, enNew);

const faNew = "'WhoWeAreSummary': 'گروه بین‌المللی KKM یک گروه مهندسی و فناوری است که به توسعه، یکپارچه‌سازی و تجاری‌سازی راه‌حل‌هایی در زمینه‌های انرژی، زیرساخت، آب، فناوری صنعتی و سیستم‌های دیجیتال اختصاص یافته است.',";
content = content.replace(/'WhoWeAreSummary': 'گروه بین‌المللی KKM \(کیمیا کاران ماد\) یک قدرت جهانی در مهندسی و فناوری است که به ایجاد آینده‌ای خودکفا اختصاص یافته است\. ما قابلیت‌های پیشرفته زیرساختی را با نوآوری‌های پیشگام در انرژی و سلامت ترکیب می‌کنیم\.',/g, faNew);

// Also let's update News categories. News in translations?
// Where are news items stored? Probably in constants.ts or something.

fs.writeFileSync('translations.ts', content);
