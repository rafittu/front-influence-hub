import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { getInfluencersByIdApi } from '../api/InfluencerAPI';

import '../styles/InfluencerDetails/InfluencerDetails.css';

function InfluencerDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [influencer, setInfluencer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultPhoto = 'https://pbs.twimg.com/media/EWAJB4WUcAAje8s.png';

  useEffect(() => {
    setIsLoading(true);

    const fetchInfluencer = async () => {
      const accessToken = localStorage.getItem('metropole4');
      const response = await getInfluencersByIdApi(accessToken, id);

      setInfluencer(response);
      setIsLoading(false);
    };

    fetchInfluencer();
  }, [id]);

  const renderInfluencerDetails = (label, value) => (
    <div className="detail-row">
      <span className="label">{label}</span>
      <span className="value">{value}</span>
    </div>
  );

  const handleEditClick = () => {
    navigate(`/influencer/${id}/edit`);
  };

  return (
    <main id="influencer-main">
      <header>
        <NavigationBar />
      </header>

      {!isLoading && influencer && (
        <section id="influencer-section">
          <h2 id="influencer-h2">{influencer.name}</h2>

          <div id="influencer-container">
            <div id="photo-container">
              <img
                src={influencer.photo ? influencer.photo : defaultPhoto}
                alt={influencer.name || 'default'}
                id="influencer-photo"
              />
            </div>

            <div id="details-container">
              {renderInfluencerDetails('Username:', influencer.username)}
              {renderInfluencerDetails('Alcance:', influencer.reach)}
              {renderInfluencerDetails('Email:', influencer.email)}
              {renderInfluencerDetails('Categorias:', influencer.niches.join(', '))}

              {renderInfluencerDetails('Endereço:', `${influencer.address.street}, ${influencer.address.number}, ${influencer.address.city} - ${influencer.address.state}, ${influencer.address.zipCode}`)}
              {renderInfluencerDetails('Criado em:', new Date(influencer.createdAt).toLocaleDateString())}
              {renderInfluencerDetails('Atualizado em:', new Date(influencer.updatedAt).toLocaleDateString())}
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

export default InfluencerDetails;
