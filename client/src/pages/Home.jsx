import React from "react";
import BookInquiryForm from "../pages/BookInquiryForm";
import Navbar from "../componunts/Navbar/Navbar";
import OrderPopup from "../componunts/OrderPopup/OrderPopup";
import Footer from "../componunts/Footer/Footer";
import { Outlet } from "react-router-dom";
import Carousel from '../componunts/Carousel/Carousel';
import Partners from '../pages/Partners';
import TestimonialsPage from './TestimonialsPage';
import AboutUs from '../pages/AboutUs'; // adjust the path as necessary
import FeaturedPublishers from '../pages/FeaturedPublishers';
const Home = () => {
  const [orderPopup, setOrderPopup] = React.useState(false);

  const handleOrderPopup = () => {
    setOrderPopup(!orderPopup);
  };
  return (
    <div>
       <Navbar handleOrderPopup={handleOrderPopup} />
       <Carousel />
       <AboutUs />
       <FeaturedPublishers/>
        <Partners/>
        <TestimonialsPage />
       <BookInquiryForm />
     
        <Footer />
        <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default Home;


