import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
//import Layout from "./pages/Layout";
import Home from "./pages/Home";
import AdminPage from "./pages/AdminPage";
import UserPage from "./pages/UserPage";

//import favorites from "./pages/avorites";
import AOS from "aos";
import "aos/dist/aos.css";

import Books from "./pages/Books";
const App = () => {
  React.useEffect(() => {
    AOS.init({
      offset: 100,
      duration: 900,
      easing: "ease-in-sine",
      delay: 100,
    });
    AOS.refresh();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
          
          <Route index element={<Home />} />
          <Route path="books" element={<Books />} />
          <Route path="admin" element={<AdminPage />} />
          <Route path="user" element={<UserPage />} />
         
      </Routes>
    </BrowserRouter>
  );
};




export default App;
