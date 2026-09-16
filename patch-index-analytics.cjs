const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

const analyticsHeaders = `
    <!-- Google Analytics (GA4) Placeholder -->
    <script async src="https://www.googletagmanager.com/gtag/js?id=G-PLACEHOLDER"></script>
    <script>
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', 'G-PLACEHOLDER', {
          'send_page_view': false // We will handle this via SPA routing
      });
    </script>
    <!-- Google Search Console Verification Placeholder -->
    <meta name="google-site-verification" content="GSC-VERIFICATION-PLACEHOLDER" />
`;

if (!content.includes('gtag(')) {
    content = content.replace(/(<head>)/, "$1\n" + analyticsHeaders);
    fs.writeFileSync('index.html', content);
}
