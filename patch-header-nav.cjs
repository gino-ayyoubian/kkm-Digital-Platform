const fs = require('fs');
let content = fs.readFileSync('components/Header.tsx', 'utf8');

const navLinks = `
                            <button onClick={() => setPage(Page.Home)} className={getLinkClass(Page.Home)}>{t('Home')}</button>
                            <button onClick={() => setPage(Page.AboutUs)} className={getLinkClass(Page.AboutUs)}>{t('AboutUs')}</button>
                            <button onClick={() => setPage(Page.Technology)} className={getLinkClass(Page.Technology)}>{t('Technology')}</button>
                            <button onClick={() => setPage(Page.Projects)} className={getLinkClass(Page.Projects)}>{t('Projects')}</button>
                            <button onClick={() => setPage(Page.Exhibition)} className={getLinkClass(Page.Exhibition)}>Exhibition</button>
                            <button onClick={() => setPage(Page.Downloads)} className={getLinkClass(Page.Downloads)}>Downloads</button>
                            <button onClick={() => setPage(Page.Contact)} className={getLinkClass(Page.Contact)}>{t('Contact')}</button>
`;

content = content.replace(/<button onClick=\{\(\) => setPage\(Page\.Home\)\} className=\{getLinkClass\(Page\.Home\)\}>\{t\('Home'\)\}<\/button>[\s\S]*?<button onClick=\{\(\) => setPage\(Page\.Contact\)\} className=\{getLinkClass\(Page\.Contact\)\}>\{t\('Contact'\)\}<\/button>/, navLinks);

fs.writeFileSync('components/Header.tsx', content);
