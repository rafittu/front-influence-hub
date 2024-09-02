import React from 'react';
import { useAdmin } from '../contexts/AdminContext';

function Dashboard() {
  const { adminData } = useAdmin();

  console.log(adminData);

  return (
    <main>
      <h1>Influence Hub Dash</h1>
    </main>
  );
}

export default Dashboard;
