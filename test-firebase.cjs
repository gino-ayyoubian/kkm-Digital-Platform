const fs = require('fs');

let content = fs.readFileSync('firebase.ts', 'utf8');

// Replace getAuth
content = content.replace(/import \{ getAuth, GoogleAuthProvider \} from 'firebase\/auth';/, "import { getAuth, initializeAuth, inMemoryPersistence, GoogleAuthProvider } from 'firebase/auth';");
content = content.replace(/auth = getAuth\(app\);/, "auth = initializeAuth(app, { persistence: inMemoryPersistence });");

fs.writeFileSync('firebase.ts', content);

