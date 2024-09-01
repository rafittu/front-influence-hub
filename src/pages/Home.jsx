import React, { useState } from 'react';

function Homepage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleChange = (event) => {
    const { name, value } = event.target;

    if (name === 'email') {
      setEmail(value);
    } else {
      setPassword(value);
    }
  };

  const handleSubmit = async (event) => event;

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
                id="login"
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
        </form>
      </section>
    </main>
  );
}

export default Homepage;
