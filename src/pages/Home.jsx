import React, { useState } from 'react';
import LoginForm from '../components/Homepage/LoginForm';
import SignupForm from '../components/Homepage/SignupForm';

import '../styles/Homepage/Home.css';

function Homepage() {
  const [showSignup, setShowSignup] = useState(false);

  const toggleForm = () => setShowSignup((prevState) => !prevState);

  return (
    <main id="homepage-main">
      <figure id="brand-logo">
        <img src="https://metropole4.s3.amazonaws.com/logo.png" alt="Influence Hub Logo" />
      </figure>

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
