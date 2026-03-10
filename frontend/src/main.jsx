import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import { AuthProvider } from './state/AuthContext';
import { DesignProvider } from './state/DesignContext';
import './styles.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <DesignProvider>
          <App />
        </DesignProvider>
      </AuthProvider>
    </BrowserRouter>
  </React.StrictMode>
);

