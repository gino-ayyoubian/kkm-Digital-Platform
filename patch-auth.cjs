const fs = require('fs');

let content = fs.readFileSync('AuthContext.tsx', 'utf8');

content = content.replace(/const unsubscribe = onAuthStateChanged\(auth, async \(user\) => \{/, `if (!auth) { setLoading(false); return; }\n    const unsubscribe = onAuthStateChanged(auth, async (user) => {`);

fs.writeFileSync('AuthContext.tsx', content);

