import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { getAllInfluencersApi } from '../api/InfluencerAPI';
import InfluencersTable from '../components/InfluencersTable';
import NavigationBar from '../components/NavigationBar';

function Dashboard() {
  const { adminData } = useAdmin();
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  console.log(adminData);

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
        <NavigationBar />
      </header>

      <section>
        {!isLoading && (
          influencers.length > 0 ? (
            <>
              <h2>Listagem de influenciadores</h2>

              <Link to="/influencer/new">
                <button type="button">Novo</button>
              </Link>

              <InfluencersTable influencers={influencers} />
            </>
          ) : (
            <p>{ error || 'Nenhum influenciador encontrado.'}</p>
          )
        )}
      </section>
    </main>
  );
}

export default Dashboard;
