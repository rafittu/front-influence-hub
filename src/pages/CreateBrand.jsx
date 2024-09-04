import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import BrandForm from '../components/BrandForm';
import Categories from '../utils/CategoryOptions';

function CreateBrand() {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    niches: [],
  });

  console.log(setFormData);

  return (
    <main id="add-brand-main">
      <header>
        <NavigationBar />
      </header>

      <section id="new-brand-section">
        <h1>Cadastrar Marca</h1>

        <BrandForm
          formData={formData}
          // onChange={handleChange}
          // onSubmit={handleSubmit}
          niches={Categories}
        />
      </section>
    </main>
  );
}

export default CreateBrand;
