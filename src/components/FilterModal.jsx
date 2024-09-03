import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import Categories from '../utils/CategoryOptions';

import '../styles/FilterModal.css';

function FilterModal({ setIsFilterModalOpen, setFilters, filters }) {
  const [city, setCity] = useState('');
  const [niche, setNiche] = useState('');
  const [reachMin, setReachMin] = useState('');
  const [reachMax, setReachMax] = useState('');

  useEffect(() => {
    setCity(filters.city || '');
    setNiche(filters.niche || '');
    setReachMin(filters.reachMin || '');
    setReachMax(filters.reachMax || '');
  }, [filters]);

  const handleFilter = () => {
    setFilters({
      city: city || undefined,
      niche: niche || undefined,
      reachMin: reachMin || undefined,
      reachMax: reachMax || undefined,
    });
    setIsFilterModalOpen(false);
  };

  const handleClearFilters = () => {
    setCity('');
    setNiche('');
    setReachMin('');
    setReachMax('');
    setFilters({});
    setIsFilterModalOpen(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <label htmlFor="city">
          Cidade:
          <input type="text" value={city} onChange={(e) => setCity(e.target.value)} />
        </label>

        <label htmlFor="niche">
          Categoria:
          <select value={niche} onChange={(e) => setNiche(e.target.value)}>
            <option value="">Todas</option>
            {Categories.map((category) => (
              <option key={category} value={category}>{category}</option>
            ))}
          </select>
        </label>

        <label htmlFor="reachMin">
          Alcance Mínimo:
          <input type="number" value={reachMin} onChange={(e) => setReachMin(e.target.value)} />
        </label>

        <label htmlFor="reachMax">
          Alcance Máximo:
          <input type="number" value={reachMax} onChange={(e) => setReachMax(e.target.value)} />
        </label>

        <div className="modal-actions">
          <button type="button" onClick={handleFilter}>Aplicar</button>
          <button type="button" onClick={handleClearFilters}>Limpar</button>
          <button type="button" onClick={() => setIsFilterModalOpen(false)}>Cancelar</button>
        </div>
      </div>
    </div>
  );
}

FilterModal.propTypes = {
  setIsFilterModalOpen: PropTypes.func.isRequired,
  setFilters: PropTypes.func.isRequired,
  filters: PropTypes.shape({
    city: PropTypes.string,
    niche: PropTypes.string,
    reachMin: PropTypes.string,
    reachMax: PropTypes.string,
  }).isRequired,
};

export default FilterModal;
