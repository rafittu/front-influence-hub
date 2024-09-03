import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';

import '../styles/InfluencersTable.css';

function InfluencersTable({ influencers }) {
  return (
    <table className="influencers-table">
      <thead>
        <tr>
          <th>#</th>
          <th>Nome</th>
          <th>Username</th>
          <th>Email</th>
        </tr>
      </thead>

      <tbody>
        {influencers.map((influencer) => (
          <tr key={influencer.id}>
            <td>{influencer.id}</td>
            <td>
              <Link to={`/influencer/${influencer.id}`}>{influencer.name}</Link>
            </td>
            <td>
              <Link to={`/influencer/${influencer.id}`}>{influencer.username}</Link>
            </td>
            <td>
              <Link to={`/influencer/${influencer.id}`}>{influencer.email}</Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

InfluencersTable.propTypes = {
  influencers: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      name: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
      email: PropTypes.string.isRequired,
    }),
  ).isRequired,
};

export default InfluencersTable;
