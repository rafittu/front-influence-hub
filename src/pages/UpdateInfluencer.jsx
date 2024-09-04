import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import NavigationBar from '../components/NavigationBar';
import { getInfluencerByIdApi } from '../api/InfluencerAPI';
import InfluencerForm from '../components/InfluencerForm';
import Categories from '../utils/CategoryOptions';

function UpdateInfluencer() {
  const { id } = useParams();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    reach: 0,
    photo: '',
    zipCode: '',
    street: '',
    number: '',
    city: '',
    state: '',
    niches: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchInfluencer = async () => {
      setIsLoading(true);
      const accessToken = localStorage.getItem('metropole4');
      const response = await getInfluencerByIdApi(accessToken, id);

      if (response instanceof AxiosError) {
        setError('Erro ao buscar dados do influenciador.');
      } else {
        setFormData({
          name: response.name,
          email: response.email,
          username: response.username,
          reach: response.reach,
          photo: response.photo || '',
          zipCode: response.address.zipCode,
          street: response.address.street,
          number: response.address.number,
          city: response.address.city,
          state: response.address.state,
          niches: response.niches,
        });
      }

      setIsLoading(false);
    };

    fetchInfluencer();
  }, [id]);

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const updatedNiches = formData.niches.includes(value)
        ? formData.niches.filter((niche) => niche !== value)
        : [...formData.niches, value];

      setFormData((prev) => ({
        ...prev,
        niches: updatedNiches,
      }));
    } else {
      const parsedValue = type === 'number' ? parseFloat(value) : value;

      setFormData((prev) => ({
        ...prev,
        [name]: parsedValue,
      }));
    }

    if (name === 'zipCode' && value.length === 8) {
      // fetchAddressByZipCode(value);
    }
  };

  return (
    <main id="influencer-main">
      <header>
        <NavigationBar />
      </header>

      <section id="update-influencer-section">
        <h1>Editar Influenciador</h1>

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <InfluencerForm
            formData={formData}
            onChange={handleChange}
            // onSubmit={handleSubmit}
            niches={Categories}
          />
        )}

        {error && <p>{error}</p>}
      </section>
    </main>
  );
}

export default UpdateInfluencer;
