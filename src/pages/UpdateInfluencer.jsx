import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavigationBar from '../components/NavigationBar';
import { getInfluencerByIdApi } from '../api/InfluencerAPI';

function UpdateInfluencer() {
  const { id } = useParams();

  const [influencer, setInfluencer] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);

    const fetchInfluencer = async () => {
      const accessToken = localStorage.getItem('metropole4');
      const response = await getInfluencerByIdApi(accessToken, id);

      setInfluencer(response);
      setIsLoading(false);
    };

    fetchInfluencer();
  }, [id]);

  console.log(isLoading, influencer);

  return (
    <main id="influencer-main">
      <header>
        <NavigationBar />
      </header>
    </main>
  );
}

export default UpdateInfluencer;
