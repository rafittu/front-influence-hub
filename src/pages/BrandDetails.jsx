import React, { useEffect, useRef, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { getBrandByIdApi, getInfluencersBrandApi } from '../api/BrandsAPI';

import '../styles/BrandDetails/BrandDetails.css';

function BrandDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const carouselRef = useRef(null);
  const [brand, setBrand] = useState(null);
  const [influencers, setInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    const accessToken = localStorage.getItem('metropole4');

    const fetchData = async () => {
      const brandData = await getBrandByIdApi(accessToken, id);
      setBrand(brandData);

      const influencersData = await getInfluencersBrandApi(accessToken, brandData.name);
      setInfluencers(influencersData);

      setIsLoading(false);
    };

    fetchData();
  }, [id]);

  // effect para rodar o carrousel automaticamente
  useEffect(() => {
    const interval = setInterval(() => {
      if (carouselRef.current) {
        const { scrollWidth } = carouselRef.current;
        const { clientWidth } = carouselRef.current;
        const { scrollLeft } = carouselRef.current;
        const maxScrollLeft = scrollWidth - clientWidth;

        const newScrollLeft = scrollLeft + clientWidth * 0.1; // ajustar velocidade do carrousel
        carouselRef.current.scrollTo({
          left: newScrollLeft > maxScrollLeft ? 0 : newScrollLeft,
          behavior: 'smooth',
        });
      }
    }, 2000); // ajustar intervalo de rolagem do carrousel

    return () => clearInterval(interval);
  }, [influencers]);

  const renderBrandDetails = (label, value) => (
    <div className="detail-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );

  const handleEditClick = () => {
    navigate(`/brand/${id}/edit`);
  };

  const handleAddInfluence = () => {
    navigate(`/brand/associate-influencer/${id}`);
  };

  const handleInfluencerClick = (influencerId) => {
    navigate(`/influencer/${influencerId}`);
  };

  const filterInfluencersWithPhoto = (allInfluencers) => allInfluencers.filter((influencer) => influencer.influencer.photo && influencer.influencer.photo.trim() !== '');

  const renderCarouselItem = (influencer) => (
    <div
      key={influencer.influencer.id}
      className="carousel-item"
      onClick={() => handleInfluencerClick(influencer.influencerId)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleInfluencerClick(influencer.influencerId);
        }
      }}
    >
      <img src={influencer.influencer.photo} alt={influencer.influencer.name} className="carousel-image" />
      <p>{influencer.influencer.username}</p>
    </div>
  );

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
            <button type="button" className="action-button" onClick={handleAddInfluence}>Associar Influencer</button>
            <button type="button" className="action-button" disabled>Deletar</button>
          </div>

          {influencers.length > 0 && (
            <div id="carousel-container" ref={carouselRef}>
              {influencers.length > 0 && (
              <>
                {filterInfluencersWithPhoto(influencers).map(renderCarouselItem)}
              </>
              )}
            </div>
          )}
        </section>
      )}
    </main>
  );
}

export default BrandDetails;
