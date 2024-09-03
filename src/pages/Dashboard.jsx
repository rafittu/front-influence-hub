import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllInfluencersApi } from '../api/InfluencerAPI';
import InfluencersTable from '../components/InfluencersTable';
import NavigationBar from '../components/NavigationBar';

import '../styles/Dashboard.css';

function Dashboard() {
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

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
    <main id="dashboard-main">
      <header>
        <NavigationBar />
      </header>

      <section id="dash-section">
        {!isLoading && (
          influencers.length > 0 ? (
            <>
              <div id="table-header">
                <h2 id="dash-h2">
                  Listagem de
                  <span id="influenciador-h2"> Influenciadores</span>
                </h2>

                <Link to="/influencer/new">
                  <button type="button">Novo</button>
                </Link>
              </div>

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
