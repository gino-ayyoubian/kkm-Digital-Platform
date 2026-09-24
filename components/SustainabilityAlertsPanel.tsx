import React, { useEffect, useState } from 'react';
import { collection, query, orderBy, limit, onSnapshot, addDoc, serverTimestamp } from 'firebase/firestore';
import { db } from '../firebase';
import { useAuth } from '../AuthContext';
import { motion, AnimatePresence } from 'motion/react';

export interface SustainabilityAlert {
  id: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  source: string;
  createdAt: any;
}

// Helper per guidelines
enum OperationType {
  GET = 'get',
  CREATE = 'create',
}

interface FirestoreErrorInfo {
  error: string;
  operationType: OperationType;
  path: string | null;
}

function handleFirestoreError(error: unknown, operationType: OperationType, path: string | null, currentUser: any) {
  const errInfo = {
    error: error instanceof Error ? error.message : String(error),
    authInfo: {
      userId: currentUser?.uid,
      email: currentUser?.email,
    },
    operationType,
    path
  };
  console.error('Firestore Error: ', JSON.stringify(errInfo));
}

const SustainabilityAlertsPanel: React.FC = () => {
  const [alerts, setAlerts] = useState<SustainabilityAlert[]>([]);
  const { currentUser, userProfile, isAdmin } = useAuth();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!currentUser) return;

    const pathForOnSnapshot = 'sustainabilityAlerts';
    const q = query(
      collection(db, pathForOnSnapshot),
      orderBy('createdAt', 'desc'),
      limit(5)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const newAlerts = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      })) as SustainabilityAlert[];
      setAlerts(newAlerts);
      setLoading(false);
    }, (error) => {
      handleFirestoreError(error, OperationType.GET, pathForOnSnapshot, currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [currentUser]);

  const generateMockAlert = async () => {
    if (!currentUser || !isAdmin) return;
    try {
      const severities: ('info' | 'warning' | 'critical')[] = ['info', 'warning', 'critical'];
      const sev = severities[Math.floor(Math.random() * severities.length)];
      await addDoc(collection(db, 'sustainabilityAlerts'), {
        message: sev === 'critical' ? 'Turbine RPM exceeding optimal threshold.' : sev === 'warning' ? 'Minor thermal fluctuation detected.' : 'System nominal, offset stable.',
        severity: sev,
        source: sev === 'critical' ? 'REE Sensor Node A' : 'GMEL Sensor Array',
        createdAt: serverTimestamp()
      });
    } catch (error) {
      handleFirestoreError(error, OperationType.CREATE, 'sustainabilityAlerts', currentUser);
    }
  };

  if (!currentUser) {
    return null; // Don't show if not signed in
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-2xl p-6 border border-gray-200 dark:border-slate-700 shadow-sm mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-xl font-display font-bold text-primary-dark dark:text-white flex items-center gap-2">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-accent-yellow" viewBox="0 0 20 20" fill="currentColor">
            <path d="M10 2a6 6 0 00-6 6v3.586l-.707.707A1 1 0 004 14h12a1 1 0 00.707-1.707L16 11.586V8a6 6 0 00-6-6zM10 18a3 3 0 01-3-3h6a3 3 0 01-3 3z" />
          </svg>
          Live Sustainability Alerts
        </h3>
        {isAdmin && (
           <button onClick={generateMockAlert} className="text-xs bg-gray-100 hover:bg-gray-200 dark:bg-slate-700 dark:hover:bg-slate-600 px-3 py-1 rounded-full text-slate-700 dark:text-slate-300 transition-colors">
              Simulate Event
           </button>
        )}
      </div>

      <div className="space-y-3">
        {loading ? (
          <div className="animate-pulse space-y-3">
            {[1, 2, 3].map(i => (
              <div key={i} className="h-16 bg-gray-100 dark:bg-slate-700 rounded-lg w-full"></div>
            ))}
          </div>
        ) : alerts.length === 0 ? (
          <div className="text-center py-6 text-slate-500 dark:text-slate-400">
            No recent alerts detected. Systems optimal.
          </div>
        ) : (
          <AnimatePresence>
            {alerts.map((alert) => (
              <motion.div
                key={alert.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className={`p-3 rounded-lg border-l-4 ${
                  alert.severity === 'critical' ? 'border-red-500 bg-red-50 dark:bg-red-900/20 text-red-800 dark:text-red-200' :
                  alert.severity === 'warning' ? 'border-yellow-500 bg-yellow-50 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-200' :
                  'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-800 dark:text-blue-200'
                }`}
              >
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-semibold text-sm">{alert.message}</p>
                    <p className="text-xs opacity-80 mt-1">Source: {alert.source}</p>
                  </div>
                  <span className="text-[10px] uppercase font-bold opacity-70">
                    {alert.severity}
                  </span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        )}
      </div>
    </div>
  );
};

export default SustainabilityAlertsPanel;
