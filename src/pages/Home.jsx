import React, { useState } from 'react';
import LoginForm from '../components/LoginForm';
import SignupForm from '../components/SignupForm';

import '../styles/Home.css';

function Homepage() {
  const [showSignup, setShowSignup] = useState(false);

  const toggleForm = () => setShowSignup((prevState) => !prevState);

  return (
    <main id="homepage-main">
      <header id="brand-logo">
        <img src="https://metropole4.s3.amazonaws.com/logo.png" alt="Influence Hub Logo" />
      </header>

      <section>
        {showSignup ? (
          <SignupForm toggleForm={toggleForm} />
        ) : (
          <LoginForm toggleForm={toggleForm} />
        )}
      </section>
    </main>
  );
}

export default Homepage;
