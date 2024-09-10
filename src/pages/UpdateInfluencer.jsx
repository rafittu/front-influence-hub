import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import NavigationBar from '../components/NavigationBar';
import { getInfluencerByIdApi, updateInfluencerApi } from '../api/InfluencerAPI';
import InfluencerForm from '../components/Influencer/InfluencerForm';
import Categories from '../utils/CategoryOptions';
import getAddress from '../api/Others';
import { validateCreateInfluencerForm } from '../utils/validationUtils';

import '../styles/Influencers/UpdateInfluencer.css';

function UpdateInfluencer() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    reach: 0,
    oldPhoto: '',
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

  const accessToken = localStorage.getItem('metropole4');

  useEffect(() => {
    const fetchInfluencer = async () => {
      setIsLoading(true);
      const response = await getInfluencerByIdApi(accessToken, id);

      if (response instanceof AxiosError) {
        setError('Erro ao buscar dados do influenciador.');
      } else {
        setFormData({
          name: response.name,
          email: response.email,
          username: response.username,
          reach: response.reach,
          oldPhoto: response.photo || '',
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

  const fetchAddressByZipCode = async (zipCode) => {
    const response = await getAddress(zipCode);
    if (response.erro) {
      setError('Erro ao buscar endereço.');
      return;
    }

    const { logradouro, localidade, uf } = response;
    setFormData((prev) => ({
      ...prev,
      street: logradouro,
      city: localidade,
      state: uf,
    }));
  };

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
      fetchAddressByZipCode(value);
    }
  };

  const updateInfluencer = async () => {
    const formDataToSend = new FormData();

    Object.keys(formData).forEach((key) => {
      if (key === 'niches') {
        formData[key].forEach((niche) => {
          formDataToSend.append('niches[]', niche);
        });
      } else if (key !== 'city' && key !== 'state') {
        formDataToSend.append(key, formData[key]);
      }
    });

    const response = await updateInfluencerApi(accessToken, id, formDataToSend);

    if (response.status === 409) {
      setError('E-mail ou usuário já cadastrado.');
      return null;
    }

    if (response instanceof AxiosError) {
      setError('Falha ao cadastrar usuário');
      return null;
    }

    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateCreateInfluencerForm(formData, setError)) {
      setIsLoading(false);
      return;
    }

    const influencerId = await updateInfluencer();
    if (influencerId) { navigate(`/influencer/${influencerId.id}`); }

    setIsLoading(false);
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
            onSubmit={handleSubmit}
            niches={Categories}
          />
        )}

        {error && <p>{error}</p>}
      </section>
    </main>
  );
}

export default UpdateInfluencer;
