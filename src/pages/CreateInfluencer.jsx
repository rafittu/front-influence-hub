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

  const handleChange = (e) => {
    const { name, value, type } = e.target;

    if (type === 'checkbox') {
      const updatedNiches = formData.niches.includes(value)
        ? formData.niches.filter((niche) => niche !== value)
        : [...formData.niches, value];

      setFormData((prev) => ({
        ...prev,
        niches: updatedNiches,
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }

    if (name === 'zipCode' && value.length === 8) {
      fetchAddressByZipCode(value);
    }
  };

  return (
    <main id="create-influencer-main">
      <header>
        <NavigationBar />
      </header>

      <section id="new-influence-section">
        <h1>Cadastrar Influencer</h1>

        <InfluencerForm
          formData={formData}
          onChange={handleChange}
          niches={Categories}
        />
      </section>
    </main>
  );
}

export default CreateInfluencer;
