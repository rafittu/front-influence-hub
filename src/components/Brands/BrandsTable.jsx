import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../../styles/Brands/BrandsTable.css';

function BrandsTable({ brands }) {
  return (
    <table className="brands-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Descrição</th>
        </tr>
      </thead>

      <tbody>
        {brands.map((brand) => (
          <tr key={brand.id}>
            <td>{brand.id}</td>
            <td>
              <Link to={`/brand/${brand.id}`}>{brand.name}</Link>
            </td>
            <td>
              <Link to={`/brand/${brand.id}`}>{brand.description}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

BrandsTable.propTypes = {
  brands: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default BrandsTable;
