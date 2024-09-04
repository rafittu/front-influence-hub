import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { getBrandByIdApi } from '../api/BrandsAPI';

function BrandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [brand, setBrand] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchBrand = async () => {
      const accessToken = localStorage.getItem('metropole4');
      const response = await getBrandByIdApi(accessToken, id);

      setBrand(response);
      setIsLoading(false);
    };

    fetchBrand();
  }, [id]);

  const renderBrandDetails = (label, value) => (
    <div className="detail-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );

  const handleEditClick = () => {
    navigate(`/brand/${id}/edit`);
  };

  return (
    <main id="brand-main">
      <header>
        <NavigationBar />
      </header>

      {!isLoading && brand && (
        <section id="brand-section">
          <h2 id="brand-h2">{brand.name}</h2>

          <div id="brand-container">
            <div id="details-container">
              {renderBrandDetails('Descrição:', brand.description)}
              {renderBrandDetails('Categorias:', brand.niches.join(', '))}

              {renderBrandDetails('Criado em:', new Date(brand.createdAt).toLocaleDateString())}
              {renderBrandDetails('Atualizado em:', new Date(brand.updatedAt).toLocaleDateString())}
            </div>
          </div>

          <div id="buttons-container">
            <button type="button" className="action-button" onClick={handleEditClick}>Editar</button>
            <button type="button" className="action-button" disabled>Deletar</button>
          </div>
        </section>
      )}
    </main>
  );
}

export default BrandDetails;
