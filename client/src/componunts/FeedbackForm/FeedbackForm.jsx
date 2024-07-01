import React, { useState } from 'react';
import axios from 'axios';

const FeedbackForm = ({ toggleFeedbackForm }) => {
  const [rating, setRating] = useState(0);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [comment, setComment] = useState('');
  const [showCommentBox, setShowCommentBox] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleRating = (index) => {
    setRating(index + 1);
    setShowCommentBox(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8000/submit-feedback', {
        rating,
        name,
        address,
        comment,
      });

      console.log('Feedback submitted:', response.data);
      // Simulating a submission success
      setRating(0);
      setName('');
      setAddress('');
      setComment('');
      setShowCommentBox(false);
      setSubmitted(true);

      // Optional: Call a function to toggle the feedback form
      // toggleFeedbackForm();
    } catch (error) {
      console.error('Error submitting feedback:', error);
      // Handle error states or display error messages
    }
  };

  const handlePopupClose = () => {
    setSubmitted(false);
    toggleFeedbackForm(); // Close the feedback form after popup close
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
        <button
          onClick={toggleFeedbackForm}
          className="absolute top-0 right-0 mt-2 mr-2 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <form onSubmit={handleSubmit} className="p-6 bg-white rounded-lg shadow-md">
          <h2 className="text-2xl font-bold mb-4 text-center">Remark Your Feedback</h2>
          <div className="flex justify-center mb-4">
            {[...Array(5)].map((star, index) => (
              <span
                key={index}
                className={`cursor-pointer text-3xl transition-all duration-300 ${index < rating ? 'text-yellow-500' : 'text-gray-400'}`}
                onClick={() => handleRating(index)}
              >
                ★
                
              </span>
              
            ))}

          </div>
          {showCommentBox && (
            <>
              <input
                type="text"
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your name..."
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <input
                type="text"
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your address..."
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <textarea
                className="w-full p-2 border rounded-lg mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Write your feedback here..."
                value={comment}
                onChange={(e) => setComment(e.target.value)}
              ></textarea>
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-300 hover:bg-blue-600"
              >
                Submit
              </button>
            </>
          )}
        </form>
      </div>
      {submitted && (
        <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-md max-w-md w-full relative">
            <p className="text-center text-3xl text-green-500 mb-8 mt-5 ">Thank you for your feedback!</p>
            <button
              onClick={handlePopupClose}
              className="bg-gradient-to-r from-blue-500 to-green-500 text-white px-4 py-2 rounded-lg w-full transition-all duration-300 hover:bg-blue-600"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FeedbackForm;
