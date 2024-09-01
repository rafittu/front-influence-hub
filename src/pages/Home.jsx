import React, { useState } from 'react';

function Homepage() {
  const [email, setEmail] = useState('');

  const handleChange = (event) => event;

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
          </div>
        </form>
      </section>
    </main>
  );
}

export default Homepage;
