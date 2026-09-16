const fs = require('fs');

function safeReplace(filePath, replacer) {
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        content = replacer(content);
        fs.writeFileSync(filePath, content);
    }
}

// 1. CarbonCreditPage.tsx
safeReplace('pages/CarbonCreditPage.tsx', (content) => {
    return content
        .replace(/const saved = localStorage\.getItem\('kkm-calc-miles'\);/, "let saved = null; try { saved = localStorage.getItem('kkm-calc-miles'); } catch (e) {}")
        .replace(/const saved = localStorage\.getItem\('kkm-calc-energy'\);/, "let saved = null; try { saved = localStorage.getItem('kkm-calc-energy'); } catch (e) {}")
        .replace(/const saved = localStorage\.getItem\('kkm-calc-diet'\);/, "let saved = null; try { saved = localStorage.getItem('kkm-calc-diet'); } catch (e) {}")
        .replace(/localStorage\.setItem\('kkm-calc-miles', milesFlown\.toString\(\)\);/, "try { localStorage.setItem('kkm-calc-miles', milesFlown.toString()); } catch (e) {}")
        .replace(/localStorage\.setItem\('kkm-calc-energy', energyUsage\.toString\(\)\);/, "try { localStorage.setItem('kkm-calc-energy', energyUsage.toString()); } catch (e) {}")
        .replace(/localStorage\.setItem\('kkm-calc-diet', diet\);/, "try { localStorage.setItem('kkm-calc-diet', diet); } catch (e) {}");
});

// 2. A11yDebugOverlay.tsx
safeReplace('components/A11yDebugOverlay.tsx', (content) => {
    return content
        .replace(/\|\| localStorage\.getItem\('kkm_a11y_overlay'\) === 'true'/g, "|| (() => { try { return localStorage.getItem('kkm_a11y_overlay') === 'true'; } catch(e) { return false; } })()")
        .replace(/localStorage\.setItem\('kkm_a11y_overlay'/g, "try { localStorage.setItem('kkm_a11y_overlay'")
        .replace(/localStorage\.setItem\('kkm_a11y_overlay', next \? 'true' : 'false'\);/g, "try { localStorage.setItem('kkm_a11y_overlay', next ? 'true' : 'false'); } catch (e) {}")
        .replace(/localStorage\.setItem\('kkm_a11y_overlay', 'false'\);/g, "try { localStorage.setItem('kkm_a11y_overlay', 'false'); } catch (e) {}");
});

// 3. App.tsx
safeReplace('App.tsx', (content) => {
    return content
        .replace(/const hasConsented = localStorage\.getItem\('kkm-cookie-consent'\);/, "let hasConsented = null; try { hasConsented = localStorage.getItem('kkm-cookie-consent'); } catch (e) {}")
        .replace(/localStorage\.setItem\('kkm-cookie-consent', 'accepted'\);/, "try { localStorage.setItem('kkm-cookie-consent', 'accepted'); } catch (e) {}");
});

