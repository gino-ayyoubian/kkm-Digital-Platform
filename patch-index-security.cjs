const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const securityHeaders = `
    <!-- Security Headers / CSP -->
    <meta http-equiv="Content-Security-Policy" content="default-src 'self' https://*.firebaseapp.com https://*.googleapis.com https://*.gstatic.com https://*.youtube.com; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://*.googleapis.com https://*.gstatic.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; font-src 'self' https://fonts.gstatic.com; img-src 'self' data: https://*.youtube.com https://i.ytimg.com https://*.googleusercontent.com https://images.unsplash.com https://plus.unsplash.com; connect-src 'self' https://*.googleapis.com https://*.firebaseio.com wss://*.firebaseio.com; frame-src 'self' https://*.youtube.com https://*.firebaseapp.com;">
    <meta http-equiv="X-Content-Type-Options" content="nosniff">
    <meta name="referrer" content="strict-origin-when-cross-origin">
`;

if (!content.includes('Content-Security-Policy')) {
    content = content.replace(/(<head>)/, "$1\n" + securityHeaders);
    fs.writeFileSync('index.html', content);
}
