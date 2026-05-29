import { StrictMode } from 'react'
import './index.css'
import App from './App.jsx'

import { createRoot } from 'react-dom/client';
import { UnleashToolbarProvider } from '@unleash/toolbar/react';

import unleashConfig from './configs/unleash'
import '@unleash/toolbar/toolbar.css';


const root = createRoot(document.getElementById('root'));

root.render(
  <StrictMode>
    <UnleashToolbarProvider config={unleashConfig}>
      <App />
    </UnleashToolbarProvider>
  </StrictMode>
);
