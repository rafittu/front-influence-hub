import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { AxiosError } from 'axios';
import NavigationBar from '../components/NavigationBar';
import BrandForm from '../components/BrandForm';
import Categories from '../utils/CategoryOptions';
import { getBrandByIdApi } from '../api/BrandAPI';

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

  useEffect(() => {
    const fetchBrand = async () => {
      setIsLoading(true);

      const accessToken = localStorage.getItem('metropole4');
      const response = await getBrandByIdApi(accessToken, id);

      if (response instanceof AxiosError) {
        setError('Erro ao buscar dados da marca.');
      } else {
        setFormData(response);
      }

      setIsLoading(false);
    };

    fetchBrand();
  }, [id]);

  return (
    <main>
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
