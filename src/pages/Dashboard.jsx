import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getAllInfluencersApi, getInfluencersByFilterApi } from '../api/InfluencerAPI';
import InfluencersTable from '../components/Dashboard/InfluencersTable';
import NavigationBar from '../components/NavigationBar';
import FilterModal from '../components/Dashboard/FilterModal';
import Pagination from '../components/Dashboard/Paginations';

import '../styles/Dashboard/Dashboard.css';

function Dashboard() {
  const [influencers, setInfluencers] = useState([]);
  const [filters, setFilters] = useState({});
  const [isFilterModalOpen, setIsFilterModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const influencersPerPage = 10;

  const indexOfLastInfluencer = currentPage * influencersPerPage;
  const indexOfFirstInfluencer = indexOfLastInfluencer - influencersPerPage;
  const currentInfluencers = influencers.slice(indexOfFirstInfluencer, indexOfLastInfluencer);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchInfluencers = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const accessToken = localStorage.getItem('metropole4');
        let data;

        if (Object.keys(filters).length > 0) {
          data = await getInfluencersByFilterApi(accessToken, filters);
        } else {
          data = await getAllInfluencersApi(accessToken);
        }

        setInfluencers(data);
      } catch (err) {
        setError('Erro ao carregar influenciadores');
      } finally {
        setIsLoading(false);
      }
    };

    fetchInfluencers();
  }, [filters]);

  return (
    <main id="dashboard-main">
      <header>
        <NavigationBar />
      </header>

      <section id="dash-section">
        <div id="table-header">
          <h2 id="dash-h2">
            Listagem de
            <span id="influenciador-h2"> Influenciadores</span>
          </h2>

          <span id="table-buttons">
            <button type="button" onClick={() => setIsFilterModalOpen(true)}>
              Filtrar
            </button>

            <Link to="/influencer/new">
              <button type="button">Novo</button>
            </Link>
          </span>
        </div>

        {!isLoading && (
          influencers.length > 0 ? (
            <>
              <InfluencersTable influencers={currentInfluencers} />

              <Pagination
                influencersPerPage={influencersPerPage}
                totalInfluencers={influencers.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <p id="table-error">{ error || 'Nenhum influenciador encontrado.'}</p>
          )
        )}
      </section>

      {isFilterModalOpen && (
      <FilterModal
        setIsFilterModalOpen={setIsFilterModalOpen}
        setFilters={setFilters}
        filters={filters}
      />
      )}
    </main>
  );
}

export default Dashboard;
