import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
import { adminLoginApi, userByJwtApi } from '../api/AuthenticationAPI';
import { emailRegex, passwordRegex } from '../utils/validationUtils';
import { useAdmin } from '../contexts/AdminContext';

import '../styles/LoginForm.css';

function LoginForm({ toggleForm }) {
  const navigate = useNavigate();
  const { setAdminData } = useAdmin();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') { setEmail(value); } else { setPassword(value); }
  };

  const validateForm = () => emailRegex.test(email) && passwordRegex.test(password);

  const validateLogin = async () => {
    const response = await adminLoginApi(email, password);
    if (response.status === 401) {
      setError('e-email ou senha inválido');
      return false;
    }

    if (response.accessToken) {
      localStorage.setItem('metropole4', response.accessToken);
      const adminData = await userByJwtApi(response.accessToken);
      setAdminData(adminData);
      return true;
    }

    setError('Algo inesperado aconteceu :( Tente novamente mais tarde.');
    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setError('e-mail ou senha inválido');
      setIsLoading(false);
      return;
    }

    const isValid = await validateLogin();
    if (isValid) { navigate('/dashboard'); }

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit} className="credentials-form">
      <div className="inputs-container">
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
      </div>

      {error && (
        <div className="error-msg">
          <p>{error}</p>
        </div>
      )}

      <div className="inputs-buttons">
        <button type="submit" disabled={isLoading}>
          {isLoading ? 'Entrando...' : 'Entrar'}
        </button>

        <button type="button" onClick={toggleForm} disabled={isLoading}>Cadastrar</button>
      </div>
    </form>
  );
}

LoginForm.propTypes = {
  toggleForm: PropTypes.func.isRequired,
};

export default LoginForm;
