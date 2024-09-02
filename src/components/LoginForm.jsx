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
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') { setEmail(value); } else { setPassword(value); }
  };

  const validateForm = () => emailRegex.test(email) && passwordRegex.test(password);

  const validateLogin = async () => {
    const { accessToken } = await adminLoginApi(email, password);
    if (accessToken) {
      localStorage.setItem('metropole4', accessToken);

      const adminData = await userByJwtApi(accessToken);
      setAdminData(adminData);
      return true;
    }

    return false;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (!validateForm()) {
      setError(true);
      setIsLoading(false);
      return;
    }

    const isValid = await validateLogin();
    if (isValid) { navigate('/dashboard'); } else { setError(true); }

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
          <p>e-mail ou senha inválido</p>
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
