import React from 'react';
import PropTypes from 'prop-types';

function PasswordInfo({ passwordValidation }) {
  return (
    <div className="password-info">
      <ul>
        <li className={passwordValidation.minLength ? 'valid' : 'invalid'}>
          Pelo menos 7 caracteres
        </li>
        <li className={passwordValidation.hasUppercase ? 'valid' : 'invalid'}>
          Pelo menos uma letra maiúscula
        </li>
        <li className={passwordValidation.hasLowercase ? 'valid' : 'invalid'}>
          Pelo menos uma letra minúscula
        </li>
        <li className={passwordValidation.hasNumberOrSymbol ? 'valid' : 'invalid'}>
          Pelo menos um número ou símbolo
        </li>
      </ul>
    </div>
  );
}

PasswordInfo.propTypes = {
  passwordValidation: PropTypes.shape({
    minLength: PropTypes.bool.isRequired,
    hasUppercase: PropTypes.bool.isRequired,
    hasLowercase: PropTypes.bool.isRequired,
    hasNumberOrSymbol: PropTypes.bool.isRequired,
  }).isRequired,
};

export default PasswordInfo;
