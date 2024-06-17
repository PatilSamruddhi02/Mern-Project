import React from "react";
import Navbar from "../componunts/Navbar/Navbar";
import OrderPopup from "../componunts/OrderPopup/OrderPopup";
import Footer from "../componunts/Footer/Footer";
import { Outlet } from "react-router-dom";

const Layout = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <>
      <Navbar handleOrderPopup={handleOrderPopup} />
      <Outlet />
      <Footer />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </>
  );
};

export default Layout;
