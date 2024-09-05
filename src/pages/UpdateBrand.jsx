import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import NavigationBar from '../components/NavigationBar';
import BrandForm from '../components/BrandForm';
import Categories from '../utils/CategoryOptions';
import { getBrandByIdApi, updateBrandApi } from '../api/BrandsAPI';

import '../styles/UpdateBrand/UpdateBrand.css';

function UpdateBrand() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: '',
    description: '',
    niches: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const accessToken = localStorage.getItem('metropole4');

  useEffect(() => {
    const fetchBrand = async () => {
      setIsLoading(true);

      const response = await getBrandByIdApi(accessToken, id);

      if (response instanceof AxiosError) {
        setError('Erro ao buscar dados da marca.');
      } else {
        setFormData({
          name: response.name,
          description: response.description,
          niches: response.niches,
        });
      }

      setIsLoading(false);
    };

    fetchBrand();
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
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const updateBrand = async () => {
    const response = await updateBrandApi(accessToken, id, formData);

    if (response.status === 409) {
      setError('Nome da marca já cadastrado.');
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

    const brandId = await updateBrand();
    if (brandId) { navigate(`/brand/${brandId.id}`); }

    setIsLoading(false);
  };

  return (
    <main id="upt-brand-main">
      <header>
        <NavigationBar />
      </header>

      <section id="update-brand-section">
        <h1>Editar Marca</h1>

        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <BrandForm
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

export default UpdateBrand;
