import React from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

import '../../styles/Influencers/InfluencerForm.css';

function InfluencerForm({
  formData, onChange, onSubmit, niches,
}) {
  const navigate = useNavigate();

  const defaultPhoto = 'https://via.placeholder.com/150x150.png?text=Foto';

  const photoPreview = formData.photo instanceof File
    ? URL.createObjectURL(formData.photo)
    : formData.photo || defaultPhoto;

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      onChange({ target: { name: 'photo', value: file } });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    onSubmit(e);
  };

  const handleCancel = () => {
    onChange({ target: { name: 'photo', value: null } });
    navigate(-1);
  };

  return (
    <form onSubmit={handleSubmit} encType="multipart/form-data" className="influencer-form">
      <label htmlFor="name" className="form-group">
        Nome:
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={onChange}
          placeholder="Digite o nome"
          required
        />
      </label>

      <label htmlFor="email" className="form-group">
        Email:
        <input
          type="email"
          name="email"
          id="email"
          value={formData.email}
          onChange={onChange}
          placeholder="Digite o email"
          required
        />
      </label>

      <label htmlFor="username" className="form-group">
        Username Instagram:
        <input
          type="text"
          name="username"
          id="username"
          value={formData.username}
          onChange={onChange}
          placeholder="Digite o nome de usuário"
          required
        />
      </label>

      <label htmlFor="reach" className="form-group">
        Alcance:
        <input
          type="number"
          name="reach"
          id="reach"
          value={formData.reach}
          onChange={onChange}
          placeholder="Digite o alcance"
          required
        />
      </label>

      <label htmlFor="photo" className="photo-upload form-group">
        <div className="photo-container">
          <img
            src={photoPreview}
            alt="Foto do Influenciador"
            className="photo-preview"
          />
        </div>
        <div className="input-container">
          <input
            type="file"
            name="photo"
            onChange={handlePhotoChange}
            accept="image/*"
            className="photo-input"
          />
        </div>
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

      <label htmlFor="zipcode" className="form-group">
        CEP:
        <input
          type="text"
          name="zipCode"
          id="zipcode"
          value={formData.zipCode}
          onChange={onChange}
          placeholder="Digite o CEP"
          maxLength={8}
          required
        />
      </label>

      <label htmlFor="street" className="form-group">
        Rua:
        <input
          type="text"
          name="street"
          id="street"
          value={formData.street}
          onChange={onChange}
          placeholder="Digite a rua"
          disabled
        />
      </label>

      <label htmlFor="number" className="form-group">
        Número:
        <input
          type="text"
          name="number"
          id="number"
          value={formData.number}
          onChange={onChange}
          placeholder="Digite o número"
          required
        />
      </label>

      <label htmlFor="city" className="form-group">
        Cidade:
        <input
          type="text"
          name="city"
          id="city"
          value={formData.city}
          onChange={onChange}
          placeholder="Digite a cidade"
          disabled
        />
      </label>

      <label htmlFor="state" className="form-group">
        Estado:
        <input
          type="text"
          name="state"
          id="state"
          value={formData.state}
          onChange={onChange}
          placeholder="Digite o estado"
          disabled
        />
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
    email: PropTypes.string,
    username: PropTypes.string,
    reach: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    photo: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    zipCode: PropTypes.string,
    street: PropTypes.string,
    number: PropTypes.string,
    city: PropTypes.string,
    state: PropTypes.string,
    niches: PropTypes.arrayOf(PropTypes.string),
  }).isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  niches: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default InfluencerForm;
