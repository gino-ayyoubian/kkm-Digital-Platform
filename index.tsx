import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { HelmetProvider } from 'react-helmet-async';
import * as Sentry from '@sentry/react';

if (import.meta.env.VITE_SENTRY_DSN && import.meta.env.VITE_SENTRY_DSN.startsWith('http')) {
  try {
    /* Sentry Init Disabled to prevent iframe security errors */
  } catch (e) {
    console.warn("Failed to initialize Sentry:", e);
  }
}

const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error("Could not find root element to mount to");
}

const root = ReactDOM.createRoot(rootElement);
root.render(
  <React.StrictMode>
    <HelmetProvider>
    <ThemeProvider>
      <LanguageProvider>
        <AuthProvider>
          <App />
        </AuthProvider>
      </LanguageProvider>
    </ThemeProvider>
      </HelmetProvider>
</React.StrictMode>
);

try {
  if (typeof navigator !== 'undefined' && 'serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      try {
        navigator.serviceWorker.register('/sw.js', { scope: '/' }).catch(e => console.warn('SW register failed', e));
      } catch (err) {
        console.warn('SW register sync fail', err);
      }
    });
  }
} catch (e) {
  console.warn('Service Worker access restricted', e);
}
