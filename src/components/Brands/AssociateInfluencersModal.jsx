import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getInfluencersByFilterApi } from '../../api/InfluencerAPI';
import { associateInfluencerBrandApi } from '../../api/BrandsAPI';

import '../../styles/Brands/AssociateInfluencersModal.css';

function AssociateInfluencersModal({
  setIsModalOpen, onInfluencerAdded, brandNiches, brandId,
}) {
  const [influencers, setInfluencers] = useState([]);
  const [selectedInfluencers, setSelectedInfluencers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const accessToken = localStorage.getItem('metropole4');

  const fetchInfluencers = async () => {
    setIsLoading(true);
    const filters = { niche: brandNiches.join(',') };
    const data = await getInfluencersByFilterApi(accessToken, filters);
    setInfluencers(data);
    setIsLoading(false);
  };

  useEffect(() => {
    fetchInfluencers();
  }, [brandNiches]);

  const handleToggleSelect = (influencerId) => {
    setSelectedInfluencers((prevState) => (prevState.includes(influencerId)
      ? prevState.filter((id) => id !== influencerId)
      : [...prevState, influencerId]));
  };

  const handleConfirm = async () => {
    setIsLoading(true);
    await Promise.all(
      selectedInfluencers.map(
        (influencerId) => associateInfluencerBrandApi(accessToken, influencerId, brandId),
      ),
    );
    setIsLoading(false);

    onInfluencerAdded();
    setIsModalOpen(false);
  };

  const handleOutsideClick = (e) => {
    if (e.target.className === 'modal show') {
      setIsModalOpen(false);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  };

  return (
    <div
      className="influencer-modal influencer-show"
      onClick={handleOutsideClick}
      role="button"
      tabIndex={0}
      onKeyDown={handleKeyDown}
    >
      <div className="influencer-modal-content">
        <h3>Associar Influenciadores</h3>
        {isLoading ? (
          <p>Carregando...</p>
        ) : (
          <ul>
            {influencers.map((influencer) => (
              <li key={influencer.id}>
                <span>{influencer.name}</span>
                <span>{influencer.reach}</span>
                <button
                  type="button"
                  onClick={() => handleToggleSelect(influencer.id)}
                >
                  {selectedInfluencers.includes(influencer.id) ? 'Remover' : 'Adicionar'}
                </button>
              </li>
            ))}
          </ul>
        )}
        <div className="modal-actions">
          <button type="button" onClick={handleConfirm}>Confirmar</button>
          <button type="button" onClick={() => setIsModalOpen(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

AssociateInfluencersModal.propTypes = {
  setIsModalOpen: PropTypes.func.isRequired,
  onInfluencerAdded: PropTypes.func.isRequired,
  brandNiches: PropTypes.arrayOf(PropTypes.string).isRequired,
  brandId: PropTypes.string.isRequired,
};

export default AssociateInfluencersModal;
