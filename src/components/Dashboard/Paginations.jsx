import React from 'react';
import PropTypes from 'prop-types';

import '../../styles/Dashboard/Paginations.css';

function Pagination({
  itensPerPage, totalItens, paginate, currentPage,
}) {
  const calculatePageNumbers = () => {
    const pageNumbers = [];
    const totalPages = Math.ceil(totalItens / itensPerPage);
    for (let i = 1; i <= totalPages; i += 1) {
      pageNumbers.push(i);
    }
    return pageNumbers;
  };

  const pageNumbers = calculatePageNumbers();

  return (
    <nav id="pagination-nav">
      <ul id="pagination">
        <li>
          <button
            type="button"
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Anterior
          </button>
        </li>

        {pageNumbers.map((number) => (
          <li key={number} className={number === currentPage ? 'active' : ''}>
            <button type="button" onClick={() => paginate(number)}>
              {number}
            </button>
          </li>
        ))}

        <li>
          <button
            type="button"
            onClick={() => paginate(currentPage + 1)}
            disabled={currentPage === pageNumbers.length}
          >
            Próximo
          </button>
        </li>
      </ul>
    </nav>
  );
}

Pagination.propTypes = {
  itensPerPage: PropTypes.number.isRequired,
  totalItens: PropTypes.number.isRequired,
  paginate: PropTypes.func.isRequired,
  currentPage: PropTypes.number.isRequired,
};

export default Pagination;
