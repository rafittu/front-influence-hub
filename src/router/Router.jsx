import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import CreateInfluencer from '../pages/CreateInfluencer';

function Router() {
  return (
    <Routes>
      <Route exact path="/influencer/new" element={<CreateInfluencer />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default Router;
