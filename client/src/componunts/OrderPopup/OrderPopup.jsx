import { useState, useEffect } from "react";
import { IoCloseOutline } from "react-icons/io5";
import axios from 'axios';
import PropTypes from 'prop-types';
import SuccessPopup from './SuccessPopup';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import "animate.css/animate.min.css";
import { useNavigate } from 'react-router-dom';
import Store from "../../assets/bstore.png";
const OrderPopup = ({ orderPopup, setOrderPopup }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    address: "",
    mobile: "",
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isSignUp, setIsSignUp] = useState(true);
  const [errors, setErrors] = useState({});
  const [isSuccessPopupOpen, setIsSuccessPopupOpen] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const validateForm = () => {
    const newErrors = {};

    if (isSignUp) {
      if (!formData.fullName) newErrors.fullName = "Full name is required";
      if (!formData.address) newErrors.address = "Address is required";

      const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!formData.email) {
        newErrors.email = "Email is required";
      } else if (!emailPattern.test(formData.email)) {
        newErrors.email = "Invalid email address";
      }

      const mobilePattern = /^\d{10}$/;
      if (!formData.mobile) {
        newErrors.mobile = "Mobile number is required";
      } else if (!mobilePattern.test(formData.mobile)) {
        newErrors.mobile = "Invalid mobile number";
      }

      const usernamePattern = /^(?=.*[A-Z])(?=.*\d).{6,}$/;
      if (!formData.username) {
        newErrors.username = "Username is required";
      } else if (!usernamePattern.test(formData.username)) {
        newErrors.username = "Username must be at least 6 characters long, include an uppercase letter, and a number";
      }

      const passwordPattern = /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
      if (!formData.password) {
        newErrors.password = "Password is required";
      } else if (!passwordPattern.test(formData.password)) {
        newErrors.password = "Password must be at least 8 characters long, include an uppercase letter, a number, and a special character";
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = "Passwords do not match";
      }
    } else {
      if (!formData.username) newErrors.username = "Username is required";
      if (!formData.password) newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  useEffect(() => {
    document.body.style.overflow = orderPopup ? 'hidden' : 'auto';
  }, [orderPopup]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    const emailDomain = formData.email.split('@')[1];
    const userType = emailDomain === "numetry.com" ? "admin" : "user";

    try {
      const response = await axios.post('http://localhost:8000/', { ...formData, userType });
      console.log("Form submitted:", response.data);
      setSuccessMessage("Congratulations! You have signed up successfully.");
      setIsSuccessPopupOpen(true);
      resetForm();
    } catch (error) {
      console.error("There was an error submitting the form:", error);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    if (!validateForm()) return;
  
    try {
      const response = await axios.post('http://localhost:8000/login', {
        username: formData.username,
        password: formData.password,
      });
  
      const { message, userType } = response.data;
      console.log("Login response:", response.data);
  
      if (message === "Login successful") {
        resetForm();
  
        if (userType === 'admin') {
          alert("Welcome to admin page!"); // Display admin-specific message
          setOrderPopup(false);
          navigate('/admin');
        } else {
          alert(message); // Display regular user message
          setOrderPopup(false);
          navigate('/books'); // Redirect to home page
        }
      } else {
        alert(message);
      }
    } catch (error) {
      console.error("Error during login:", error);
      if (error.response) {
        alert(`Error: ${error.response.data.error || 'An error occurred during login. Please try again later.'}`);
      } else {
        alert("An error occurred during login. Please try again later.");
      }
    }
  };
  

  const resetForm = () => {
    setFormData({
      fullName: "",
      email: "",
      address: "",
      mobile: "",
      username: "",
      password: "",
      confirmPassword: "",
    });
    setErrors({});
  };

  const toggleForm = () => {
    setIsSignUp(!isSignUp);
  };

  return (
    <>
      {orderPopup && (
        <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
          <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 w-[1200px] flex">
            <div className="hidden md:block w-1/2 relative">
              <img
                src={Store}
                alt="Travel"
                className="w-full h-full object-cover rounded-l-md"
              />
              <p className="absolute top-40 left-10 text-4xl text-white bg-black bg-opacity-50 p-4 animate__animated animate__fadeInRight" style={{ animation: 'bounce 2s infinite' }}>
                Connect Now to join the club of
                <br /><br />
                5 crore+ HAPPY CUSTOMERS
              </p>
            </div>
            <div className="w-full md:w-1/2 p-4">
              <div className="flex items-center justify-between">
                <div>
                  <h1 className="text-xl font-semibold text-black/70">
                    {isSignUp ? "SIGN-UP" : "LOG IN"}
                  </h1>
                </div>
                <div>
                  <IoCloseOutline
                    className="text-2xl cursor-pointer"
                    onClick={() => setOrderPopup(false)}
                  />
                </div>
              </div>
              <div className="mt-4">
                <form onSubmit={isSignUp ? handleSignUp : handleLogin}>
                  {isSignUp && (
                    <>
                      <input
                        type="text"
                        name="fullName"
                        placeholder="Full Name"
                        value={formData.fullName}
                        onChange={handleChange}
                        required
                        className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                      {errors.fullName && <div className="text-red-500 mb-2">{errors.fullName}</div>}
                      <input
                        type="text"
                        name="address"
                        placeholder="Address"
                        value={formData.address}
                        onChange={handleChange}
                        required
                        className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                      {errors.address && <div className="text-red-500 mb-2">{errors.address}</div>}
                      <input
                        type="email"
                        name="email"
                        placeholder="Email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                      {errors.email && <div className="text-red-500 mb-2">{errors.email}</div>}
                      <input
                        type="number"
                        name="mobile"
                        placeholder="Mobile No"
                        value={formData.mobile}
                        onChange={handleChange}
                        required
                        className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                      {errors.mobile && <div className="text-red-500 mb-2">{errors.mobile}</div>}
                    </>
                  )}
                  <input
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={formData.username}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  {errors.username && <div className="text-red-500 mb-2">{errors.username}</div>}
                  <input
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={formData.password}
                    onChange={handleChange}
                    required
                    className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                  />
                  {errors.password && <div className="text-red-500 mb-2">{errors.password}</div>}
                  {isSignUp && (
                    <>
                      <input
                        type="password"
                        name="confirmPassword"
                        placeholder="Confirm Password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        required
                        className="w-full rounded-full border border-gray-300 dark:border-gray-500 dark:bg-gray-800 px-2 py-1 mb-4"
                      />
                      {errors.confirmPassword && <div className="text-red-500 mb-2">{errors.confirmPassword}</div>}
                    </>
                  )}
                  <div className="flex justify-center">
                    <button
                      type="submit"
                      className="bg-gradient-to-r from-primary to-secondary hover:scale-105 duration-200 text-white py-1 px-4 rounded-full"
                    >
                      {isSignUp ? "SIGN-UP" : "LOG IN"}
                    </button>
                  </div>
                </form>
                <div className="text-center mt-2">
                  <p>
                    {isSignUp
                      ? "Already have an account?"
                      : "Don't have an account?"}
                    <span
                      className="text-blue-500 cursor-pointer"
                      onClick={toggleForm}
                    >
                      {isSignUp ? " Log In" : " Sign Up"}
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
      <ToastContainer />
      {isSuccessPopupOpen && (
        <SuccessPopup
          message={successMessage}
          setIsSuccessPopupOpen={setIsSuccessPopupOpen}
        />
      )}
    </>
  );
};

OrderPopup.propTypes = {
  orderPopup: PropTypes.bool.isRequired,
  setOrderPopup: PropTypes.func.isRequired,
};

export default OrderPopup;
