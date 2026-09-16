const fs = require('fs');
let content = fs.readFileSync('index.html', 'utf8');

// Remove Dartamas Chat Widget
content = content.replace(/<!-- Dartamas Chat Widget -->[\s\S]*?<\/script>/, "");

fs.writeFileSync('index.html', content);
