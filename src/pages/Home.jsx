import React from 'react';
import LoginForm from '../components/LoginForm';

function Homepage() {
  return (
    <main>
      <header>
        <h1>Influence Hub</h1>
      </header>

      <section>
        <LoginForm />
      </section>
    </main>
  );
}

export default Homepage;
