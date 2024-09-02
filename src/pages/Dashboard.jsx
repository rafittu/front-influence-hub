import React, { useEffect, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { getAllInfluencersApi } from '../api/InfluencerAPI';

function Dashboard() {
  const { adminData } = useAdmin();
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(adminData);
  console.log(isLoading);
  console.log(influencers);
  console.log(error);

  useEffect(() => {
    const fetchInfluencers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const
          accessToken = localStorage.getItem('metropole4');

        const data = await getAllInfluencersApi(accessToken);
        setInfluencers(data);
      } catch (err) {
        setError('Erro ao carregar influenciadores');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, []);

  return (
    <main>
      <h1>Influence Hub Dash</h1>
    </main>
  );
}

export default Dashboard;
