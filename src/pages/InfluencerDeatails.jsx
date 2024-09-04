import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { getInfluencersByIdApi } from '../api/InfluencerAPI';

function InfluencerDetails() {
  const { id } = useParams();
  const [influencer, setInfluencer] = useState(null);

  useEffect(() => {
    const fetchInfluencer = async () => {
      const accessToken = localStorage.getItem('metropole4');
      const response = await getInfluencersByIdApi(accessToken, id);

      setInfluencer(response);
    };

    fetchInfluencer();
  }, []);

  console.log(influencer);

  return (
    <main>
      <header>
        <NavigationBar />
      </header>
    </main>
  );
}

export default InfluencerDetails;
