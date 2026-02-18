import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.tsx';

import { Toaster } from 'react-hot-toast';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
    <Toaster
      position="top-right"
      toastOptions={{
        duration: 3000,
        style: {
          fontSize: "16px",
        },
      }}
      containerStyle={{
        top: 20,
        right: 20,
      }}
      // Slow fade animation
      gutter={8}
    />
  </StrictMode>
);
