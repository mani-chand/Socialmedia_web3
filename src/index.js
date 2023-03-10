import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { ThirdwebProvider } from "@thirdweb-dev/react";
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
      <ThirdwebProvider activeChain="Goerli">
      <App />
    </ThirdwebProvider>
  </React.StrictMode>
);