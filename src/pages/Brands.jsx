import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import BrandsTable from '../components/Brands/BrandsTable';
import { getAllBrandsApi } from '../api/BrandsAPI';
import Pagination from '../components/Dashboard/Paginations';

import '../styles/Brands/Brands.css';

function Brands() {
  const [brands, setBrands] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const brandsPerPage = 10;

  const indexOfLastBrand = currentPage * brandsPerPage;
  const indexOfFirstBrand = indexOfLastBrand - brandsPerPage;
  const currentBrands = brands.slice(indexOfFirstBrand, indexOfLastBrand);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  useEffect(() => {
    const fetchBrands = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const accessToken = localStorage.getItem('metropole4');
        const data = await getAllBrandsApi(accessToken);

        setBrands(data);
      } catch (err) {
        setError('Erro ao carregar marcas');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBrands();
  }, []);

  return (
    <main id="brand-main">
      <header>
        <NavigationBar />
      </header>

      <section id="brands-section">
        <div id="table-header">
          <h2 id="brand-h2">
            Listagem de
            <span id="brand-h2-span"> Marcas</span>
          </h2>

          <span id="table-buttons">
            <Link to="/brand/new">
              <button type="button">Nova</button>
            </Link>
          </span>
        </div>

        {!isLoading && (
          brands.length > 0 ? (
            <>
              <BrandsTable brands={currentBrands} />

              <Pagination
                itensPerPage={brandsPerPage}
                totalItens={brands.length}
                paginate={paginate}
                currentPage={currentPage}
              />
            </>
          ) : (
            <p id="table-error">{ error || 'Nenhuma marca encontrada.'}</p>
          )
        )}
      </section>
    </main>
  );
}

export default Brands;
