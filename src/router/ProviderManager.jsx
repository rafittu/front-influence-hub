import React from 'react';
import Router from './Router';
import { AdminProvider } from '../contexts/AdminContext';

function ProviderManager() {
  return (
    <AdminProvider>
      <Router />
    </AdminProvider>
  );
}

export default ProviderManager;
