import React from 'react';
import PropTypes from 'prop-types';

function SignupForm({ toggleForm }) {
  const handleSubmit = async (event) => event;

  return (
    <form onSubmit={handleSubmit} className="credentials-form">
      <div className="inputs-buttons">
        <button type="button">
          Cadastrar
        </button>

        <button type="button" onClick={toggleForm}>Voltar</button>
      </div>
    </form>
  );
}

SignupForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default SignupForm;
