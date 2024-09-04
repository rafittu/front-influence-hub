import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { getInfluencersByIdApi } from '../api/InfluencerAPI';

function InfluencerDetails() {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const defaultPhoto = 'https://via.placeholder.com/150x150.png?text=Foto';

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

  return (
    <main>
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
              <p>
                Username:
                {influencer.username}
              </p>
              <p>
                Email:
                {influencer.email}
              </p>
              <p>
                Alcance:
                {influencer.reach}
              </p>
              <p>
                Nichos:
                {influencer.niches.join(', ')}
              </p>
              <p>
                Endereço:
                {`${influencer.address.street}, ${influencer.address.number}, ${influencer.address.city} - ${influencer.address.state}, ${influencer.address.zipCode}`}
              </p>
              <p>
                Criado em:
                {new Date(influencer.createdAt).toLocaleDateString()}
              </p>
              <p>
                Atualizado em:
                {new Date(influencer.updatedAt).toLocaleDateString()}
              </p>
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

export default InfluencerDetails;
