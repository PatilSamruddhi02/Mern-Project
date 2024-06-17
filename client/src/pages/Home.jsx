// src/pages/Home.js
import React, { useState } from 'react';
import OrderPopup from '../componunts/OrderPopup/OrderPopup';

const Home = () => {
  const [orderPopup, setOrderPopup] = useState(true);

  return (
    <div>
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default Home;
