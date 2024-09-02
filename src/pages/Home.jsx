import React from 'react';
import LoginForm from '../components/LoginForm';

import '../styles/Home.css';

function Homepage() {
  return (
    <main id="homepage-main">
      <header id="brand-logo">
        <img src="https://metropole4.s3.amazonaws.com/logo.png" alt="Influence Hub Logo" />
      </header>

      <section>
        <LoginForm />
      </section>
    </main>
  );
}

export default Homepage;
