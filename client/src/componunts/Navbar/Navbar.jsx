// src/components/Navbar/Navbar.js
import React, { useState, useEffect } from 'react';
import Logo from '../../assets/BookWorm Haven.png';
import { NavLink, Link } from 'react-router-dom';
import { faSignOutAlt, faComment} from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ResponsiveMenu from './ResponsiveMenu';
import { HiMenuAlt3, HiMenuAlt1 } from 'react-icons/hi';
import axios from 'axios';
import FeedbackForm from '../../componunts/FeedbackForm/FeedbackForm';

export const NavbarLinks = [
  { name: 'Home', link: '/' },
  { name: 'About', link: '/about' },
  { name: 'Books', link: '/books' },
  { name: 'Best Places', link: '/best-places' },
  { name: 'Blogs', link: '/favorites' },
];

const DropdownLinks = [
  { name: 'Our Services', link: '/#services' },
  { name: 'Top Brands', link: '/#mobile_brands' },
  { name: 'Location', link: '/#location' },
];

const Navbar = ({ handleOrderPopup }) => {
  const [showMenu, setShowMenu] = useState(false);
  const [logoutCounts, setLogoutCounts] = useState({});
  const [showFeedbackForm, setShowFeedbackForm] = useState(false);

  useEffect(() => {
    const fetchLogoutCounts = async () => {
      try {
        const response = await axios.get('http://localhost:8000/logout-counts');
        setLogoutCounts(response.data);
      } catch (error) {
        console.error('Error fetching logout counts:', error);
      }
    };

    fetchLogoutCounts();
  }, []);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const toggleFeedbackForm = () => {
    setShowFeedbackForm(!showFeedbackForm);
  };

  return (
    <>
      <nav className="fixed top-0 right-0 w-full z-50 bg-white backdrop-blur-sm text-black shadow-md">
        <div className="bg-gradient-to-r from-primary to-secondary text-white">
          <div className="container py-3 sm:py-0">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-4 font-bold text-2xl">
                <Link to={'/'} onClick={() => window.scrollTo(0, 0)}>
                  <img src={Logo} alt="Logo" className="h-20 w-500" />
                </Link>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="bg-gradient-to-r from-primary to-secondary hover:bg-primary transition-all duration-600 text-white px-3 py-1 rounded-full"
                  onClick={handleOrderPopup}
                >
                  <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />
                  Sign Up/ Log In
                </button>
                <button
                  className="bg-gradient-to-r from-primary to-secondary hover:bg-blue-600 transition-all duration-600 text-white px-3 py-1 rounded-full flex items-center"
                  onClick={toggleFeedbackForm}
                >
                  <FontAwesomeIcon icon={faComment} className="mr-2" />
                  Feedback
                </button>
                <div className="md:hidden block">
                  {showMenu ? (
                    <HiMenuAlt1 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
                  ) : (
                    <HiMenuAlt3 onClick={toggleMenu} className="cursor-pointer transition-all" size={30} />
                  )}
                </div>
              </div>
            </div>
          </div>
          <ResponsiveMenu setShowMenu={setShowMenu} showMenu={showMenu} />
        </div>
      </nav>

      {showFeedbackForm && <FeedbackForm toggleFeedbackForm={toggleFeedbackForm} />}
    </>
  );
};

export default Navbar;
