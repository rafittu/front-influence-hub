import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import NavigationBar from '../components/NavigationBar';
import BrandForm from '../components/Brands/BrandForm';
import Categories from '../utils/CategoryOptions';
import { createBrandApi } from '../api/BrandsAPI';

import '../styles/Brands/CreateBrand.css';

function CreateBrand() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    niches: [],
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const createBrand = async () => {
    const accessToken = localStorage.getItem('metropole4');
    const response = await createBrandApi(accessToken, formData);

    if (response.status === 409) {
      setError('Nome da marca já em uso.');
      return null;
    }

    if (response instanceof AxiosError) {
      setError('Falha ao cadastrar marca');
      return null;
    }

    return response;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    const brandId = await createBrand();
    if (brandId) { navigate(`/brand/${brandId.id}`); }

    setIsLoading(false);
  };

  return (
    <main id="add-brand-main">
      <header>
        <NavigationBar />
      </header>

      <section id="new-brand-section">
        <h1>Cadastrar Marca</h1>

        <BrandForm
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

export default CreateBrand;
