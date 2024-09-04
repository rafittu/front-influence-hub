import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import '../styles/BrandForm.css';

function InfluencerForm({
  formData, onChange, onSubmit, niches,
}) {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    onSubmit(e);
  };

  const handleCancel = () => {
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} className="brand-form">
      <label htmlFor="name" className="form-group">
        Nome:
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Digite o nome da marca"
          required
        />
      </label>

      <label htmlFor="description" className="form-group">
        Descrição:
        <input
          type="text"
          id="description"
          name="description"
          value={formData.description}
          onChange={onChange}
          placeholder="Digite a descrição da marca"
          required
        />
      </label>

      <label htmlFor="niches" className="form-group">
        Categorias:
        <div className="categories">
          {niches.map((niche) => (
            <div key={niche}>
              <input
                type="checkbox"
                name="niches"
                id={niche}
                value={niche}
                checked={formData.niches.includes(niche)}
                onChange={onChange}
              />
              <span>{niche}</span>
            </div>
          ))}
        </div>
      </label>

      <div className="button-group">
        <button type="submit" className="form-button">Salvar</button>
        <button type="button" onClick={handleCancel} className="form-button">Cancelar</button>
      </div>
    </form>
  );
}

InfluencerForm.propTypes = {
  formData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    niches: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  niches: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InfluencerForm;
