const fs = require('fs');
let code = fs.readFileSync('pages/DigitalTwinHubPage.tsx', 'utf8');

code = code.replace("import { useAuth } from '../AuthContext';", 
`import { useAuth } from '../AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot, setDoc } from 'firebase/firestore';`);

code = code.replace("const { currentUser, login, loading } = useAuth();",
"const { currentUser, userProfile, login, loading } = useAuth();");

const targetEffect = `  useEffect(() => {
    // Initialize with some historical data
    const initialData = Array.from({ length: 15 }).map((_, i) => ({
      time: new Date(Date.now() - (15 - i) * 3000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
      gmelCO2: +(120 + Math.random() * 10).toFixed(1),
      reeCO2: +(85 + Math.random() * 8).toFixed(1),
    }));
    setMetricsData(initialData);

    const interval = setInterval(() => {
      setMetricsData(prev => {
        const newData = [...prev, {
          time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
          gmelCO2: +(120 + Math.random() * 10).toFixed(1),
          reeCO2: +(85 + Math.random() * 8).toFixed(1),
        }];
        if (newData.length > 15) newData.shift();
        return newData;
      });
    }, 3000);

    return () => clearInterval(interval);
  }, []);`;

const newEffect = `  useEffect(() => {
    if (!currentUser) return;

    // Listen to Firebase for cross-session global state sync
    const unsubscribe = onSnapshot(doc(db, 'systemMetrics', 'latest'), (snapshot) => {
      if (snapshot.exists() && snapshot.data().history) {
        setMetricsData(snapshot.data().history);
      }
    });

    let interval: ReturnType<typeof setInterval> | null = null;
    if (userProfile?.role === 'admin') {
      interval = setInterval(() => {
        setMetricsData(prev => {
          const newData = [...prev];
          if (newData.length === 0) {
            for(let i=0; i<15; i++) {
               newData.push({
                 time: new Date(Date.now() - (15 - i) * 3000).toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
                 gmelCO2: +(120 + Math.random() * 10).toFixed(1),
                 reeCO2: +(85 + Math.random() * 8).toFixed(1),
               });
            }
          } else {
             newData.push({
               time: new Date().toLocaleTimeString([], { hour12: false, hour: '2-digit', minute: '2-digit', second: '2-digit' }),
               gmelCO2: +(120 + Math.random() * 10).toFixed(1),
               reeCO2: +(85 + Math.random() * 8).toFixed(1),
             });
             if (newData.length > 15) newData.shift();
          }

          // Push to firestore
          setDoc(doc(db, 'systemMetrics', 'latest'), { history: newData, updatedAt: new Date().toISOString() }, { merge: true }).catch(e => console.warn(e));

          return newData;
        });
      }, 3000);
    }

    return () => {
      unsubscribe();
      if (interval) clearInterval(interval);
    };
  }, [currentUser, userProfile]);`;

code = code.replace(targetEffect, newEffect);
fs.writeFileSync('pages/DigitalTwinHubPage.tsx', code);
