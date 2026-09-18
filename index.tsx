import * as React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { LanguageProvider } from './LanguageContext';
import { ThemeProvider } from './ThemeContext';
import { AuthProvider } from './AuthContext';
import { HelmetProvider } from 'react-helmet-async';




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

