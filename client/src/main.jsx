import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

// Strictly enforce Light Mode and clear legacy dark-mode class/storage
document.documentElement.classList.remove('dark');
document.documentElement.setAttribute('data-theme', 'light');
try {
  localStorage.removeItem('codeone_theme');
} catch (e) {}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
