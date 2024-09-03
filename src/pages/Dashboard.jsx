import React, { useEffect, useState } from 'react';
import { useAdmin } from '../contexts/AdminContext';
import { getAllInfluencersApi } from '../api/InfluencerAPI';
import InfluencersTable from '../components/InfluencersTable';

function Dashboard() {
  const { adminData } = useAdmin();
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(adminData);
  console.log(error);

  useEffect(() => {
    const fetchInfluencers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const accessToken = localStorage.getItem('metropole4');
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
      <header>
        <h1>Influence Hub Dash</h1>
      </header>

      <section>
        {!isLoading && (
          influencers.length > 0 ? (
            <InfluencersTable influencers={influencers} />
          ) : (
            <p>Nenhum influenciador encontrado.</p>
          )
        )}
      </section>
    </main>
  );
}

export default Dashboard;
