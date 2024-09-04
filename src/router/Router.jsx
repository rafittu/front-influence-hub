import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard';
import CreateInfluencer from '../pages/CreateInfluencer';
import InfluencerDetails from '../pages/InfluencerDeatails';
import UpdateInfluencer from '../pages/UpdateInfluencer';

function Router() {
  return (
    <Routes>
      <Route exact path="/influencer/new" element={<CreateInfluencer />} />
      <Route exact path="/influencer/:id" element={<InfluencerDetails />} />
      <Route exact path="/influencer/:id/edit" element={<UpdateInfluencer />} />
      <Route exact path="/dashboard" element={<Dashboard />} />
      <Route exact path="/" element={<Home />} />
    </Routes>
  );
}

export default Router;
