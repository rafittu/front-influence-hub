import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import NavigationBar from '../components/NavigationBar';
import InfluencerForm from '../components/InfluencerForm';
import { createInfluencerApi } from '../api/InfluencerAPI';
import Categories from '../utils/CategoryOptions';
import getAddress from '../api/Others';

import '../styles/CreateInfluencer/CreateInfluencer.css';

function CreateInfluencer() {
  const navigate = useNavigate();

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
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

  const createInfluencer = async () => {
    delete formData.city;
    delete formData.state;

    const accessToken = localStorage.getItem('metropole4');
    const response = await createInfluencerApi(accessToken, formData);

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

    // incluir chamada que valida os campos aqui, antes de chamar a api

    const influencerId = await createInfluencer();
    if (influencerId) { navigate(`/influencer/${influencerId.id}`); }

    setIsLoading(false);
  };

  return (
    <main id="create-influencer-main">
      <header>
        <NavigationBar />
      </header>

      <section id="new-influence-section">
        <h1>Cadastrar Influencer</h1>

        <InfluencerForm
          formData={formData}
          onChange={handleChange}
          onSubmit={handleSubmit}
          niches={Categories}
        />

        {error && <p>{error}</p>}
        {isLoading && <p>Carregando...</p>}
      </section>
    </main>
  );
}

export default CreateInfluencer;
