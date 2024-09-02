import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';

function SignupForm({ toggleForm }) {
  const navigate = useNavigate();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'fullName') { setFullName(value); }
    if (name === 'email') { setEmail(value); }
    if (name === 'password') { setPassword(value); }
    if (name === 'passwordConfirmation') { setPasswordConfirmation(value); }
  };

  const validateSignup = async () => 'loading';

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const isValid = await validateSignup();
    if (isValid) { navigate('/dashboard'); } else { setError(true); }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="credentials-form">
      <div className="inputs-container">
        <label htmlFor="fullName">
          <input
            name="fullName"
            id="fullName"
            value={fullName}
            onChange={handleChange}
            type="text"
            required
            placeholder="nome completo"
            aria-label="fullName"
          />
        </label>

        <label htmlFor="email">
          <input
            name="email"
            id="email"
            value={email}
            onChange={handleChange}
            type="email"
            required
            placeholder="e-mail"
            aria-label="email"
          />
        </label>

        <label htmlFor="password">
          <input
            name="password"
            id="password"
            value={password}
            onChange={handleChange}
            type="password"
            required
            placeholder="senha"
            aria-label="password"
          />
        </label>

        <label htmlFor="passwordConfirmation">
          <input
            name="passwordConfirmation"
            id="passwordConfirmation"
            value={passwordConfirmation}
            onChange={handleChange}
            type="password"
            required
            placeholder="confirmação de senha"
            aria-label="passwordConfirmation"
          />
        </label>
      </div>

      {error && (
        <div className="error-msg">
          <p>error message returned from api</p>
        </div>
      )}

      <div className="inputs-buttons">
        <button type="button">
          {isLoading ? 'Cadastrando...' : 'Cadastrar'}
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
