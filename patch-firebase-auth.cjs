const fs = require('fs');
let content = fs.readFileSync('firebase.ts', 'utf8');

content = content.replace(/export const auth = getAuth\(app\);/, "export let auth: any = null;\ntry {\n  auth = getAuth(app);\n} catch (e) {\n  console.warn('Firebase Auth initialization failed:', e);\n}");

content = content.replace(/export const db = getFirestore\(app, firebaseConfig\.firestoreDatabaseId\);/, "export let db: any = null;\ntry {\n  db = getFirestore(app, firebaseConfig.firestoreDatabaseId);\n} catch (e) {\n  console.warn('Firestore initialization failed:', e);\n}");

fs.writeFileSync('firebase.ts', content);
