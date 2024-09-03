import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import InfluencerForm from '../components/InfluencerForm';
import Categories from '../utils/CategoryOptions';

import '../styles/CreateInfluencer/CreateInfluencer.css';

function CreateInfluencer() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    username: '',
    reach: '',
    photo: '',
    zipCode: '',
    street: '',
    number: '',
    city: '',
    state: '',
    niches: [],
  });

  console.log(setFormData);

  return (
    <main id="create-influencer-main">
      <header>
        <NavigationBar />
      </header>

      <section>
        <h1>Cadastrar Influencer</h1>

        <InfluencerForm
          formData={formData}
          niches={Categories}
        />
      </section>
    </main>
  );
}

export default CreateInfluencer;
