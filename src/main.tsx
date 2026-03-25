import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(<App />);

if ('serviceWorker' in navigator && !location.pathname.includes('/pr-preview/')) {
  navigator.serviceWorker.register('/valgit/sw.js');
}
