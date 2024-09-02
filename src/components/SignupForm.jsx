import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { useAdmin } from '../contexts/AdminContext';
import { adminLoginApi, adminSignupApi } from '../api/AuthenticationAPI';
import { isPasswordValid, validateForm } from '../utils/validationUtils';

import '../styles/SignupForm.css';

function SignupForm({ toggleForm }) {
  const navigate = useNavigate();
  const { setAdminData } = useAdmin();

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [passwordConfirmation, setPasswordConfirmation] = useState('');
  const [showPasswordInfo, setShowPasswordInfo] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const passwordValidation = isPasswordValid(password);

  const validateSignup = async () => {
    const response = await adminSignupApi(fullName, email, password, passwordConfirmation);
    if (response.status === 409) {
      setError('E-mail já cadastrado na plataforma.');
      return false;
    }

    setAdminData(response);

    const { accessToken } = await adminLoginApi(email, password);
    if (accessToken) {
      localStorage.setItem('metropole4', accessToken);
      return true;
    }

    return false;
  };

  const handleChange = (event) => {
    const { name, value } = event.target;

    switch (name) {
      case 'fullName':
        setFullName(value);
        break;
      case 'email':
        setEmail(value);
        break;
      case 'password':
        setPassword(value);
        break;
      case 'passwordConfirmation':
        setPasswordConfirmation(value);
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsLoading(true);

    if (!validateForm(fullName, email, password, passwordConfirmation, setError)) {
      setIsLoading(false);
      return;
    }

    const isValid = await validateSignup();
    if (isValid) { navigate('/dashboard'); }

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
            onFocus={() => setShowPasswordInfo(true)}
            onBlur={() => setShowPasswordInfo(false)}
          />

          {showPasswordInfo && (
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
          )}
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
          <p>{error}</p>
        </div>
      )}

      <div className="inputs-buttons">
        <button type="submit" disabled={isLoading}>
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
