// src/components/LogoutPopup.jsx
import React from 'react';

const LogoutPopup = ({ showPopup, setShowPopup }) => {
  if (!showPopup) return null;

  const handleClose = () => {
    setShowPopup(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <h2 className="text-2xl mb-4">Logout Confirmation</h2>
        <p>Are you sure you want to logout?</p>
        <div className="flex justify-end mt-4">
          <button
            className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md mr-2"
            onClick={handleClose}
          >
            Cancel
          </button>
          <button
            className="bg-red-500 text-white py-2 px-4 rounded-md shadow-md"
            onClick={() => {
              // Add your logout logic here
              handleClose();
            }}
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutPopup;
