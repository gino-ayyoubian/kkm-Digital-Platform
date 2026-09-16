const fs = require('fs');
let content = fs.readFileSync('translations.ts', 'utf8');

content = content.replace(/'Innovation_1_Impact': 'Extends infrastructure lifespan by 40%\\.',/g, "'Innovation_1_Impact': '[Target] Extends infrastructure lifespan by 40%.',");
content = content.replace(/'Innovation_2_Desc': 'Our proprietary AI model predicts subsurface thermal shifts with 95% accuracy, optimizing drilling locations\\.',/g, "'Innovation_2_Desc': 'Our proprietary AI model aims to predict subsurface thermal shifts, optimizing drilling locations.',");
content = content.replace(/'Innovation_2_Impact': 'Reduces exploration costs by 30%\\.',/g, "'Innovation_2_Impact': '[Estimated] Reduces exploration costs by 30%.',");
content = content.replace(/'Innovation_3_Impact': 'Sequesters 50kg of CO2 per ton\\.',/g, "'Innovation_3_Impact': '[Research-stage] Sequesters 50kg of CO2 per ton.',");

content = content.replace(/'Innovation_1_Impact': 'عمر زیرساخت‌ها را تا ۴۰٪ افزایش می‌دهد\\.',/g, "'Innovation_1_Impact': '[هدف‌گذاری] عمر زیرساخت‌ها را تا ۴۰٪ افزایش می‌دهد.',");
content = content.replace(/'Innovation_2_Desc': 'مدل هوش مصنوعی اختصاصی ما تغییرات حرارتی زیرسطحی را با دقت ۹۵٪ پیش‌بینی می‌کند و مکان‌های حفاری را بهینه‌سازی می‌کند\\.',/g, "'Innovation_2_Desc': 'مدل هوش مصنوعی اختصاصی ما برای پیش‌بینی تغییرات حرارتی زیرسطحی و بهینه‌سازی مکان‌های حفاری طراحی شده است.',");
content = content.replace(/'Innovation_2_Impact': 'هزینه‌های اکتشاف را ۳۰٪ کاهش می‌دهد\\.',/g, "'Innovation_2_Impact': '[تخمینی] هزینه‌های اکتشاف را تا ۳۰٪ کاهش می‌دهد.',");
content = content.replace(/'Innovation_3_Impact': '۵۰ کیلوگرم CO2 در هر تن جذب می‌کند\\.',/g, "'Innovation_3_Impact': '[مرحله-تحقیق] ۵۰ کیلوگرم CO2 در هر تن جذب می‌کند.',");

fs.writeFileSync('translations.ts', content);
