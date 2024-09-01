/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import adminLoginApi from '../api/AuthenticationAPI';

function Homepage() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const validateLogin = async () => {
    try {
      const { accessToken } = await adminLoginApi(email, password);
      localStorage.setItem('metropole4', accessToken);

      return true;
    } catch (err) {
      return false;
    }
  };
  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);

    const isValid = await validateLogin();

    if (isValid) {
      navigate('/dashboard');
    } else {
      setError(true);
    }

    setIsLoading(false);
  };

  return (
    <main>
      <header>
        <h1>Influence Hub</h1>
      </header>

      <section>
        <form onSubmit={handleSubmit}>
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

            <Link to="/signup">
              <button type="button">Cadastrar</button>
            </Link>
          </div>
        </form>
      </section>
    </main>
  );
}

export default Homepage;
