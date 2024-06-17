import React, { useState } from 'react';

const BookInquiryForm = () => {
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    mobile: '',
    inquiry: ''
  });
  const [message, setMessage] = useState('');
  const [showForm, setShowForm] = useState(false); // State to control form visibility

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:8000/inquiries', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(formData)
      });

      const result = await response.json();
      if (response.ok) {
        setMessage('Inquiry submitted successfully!');
      } else {
        setMessage(`Error: ${result.error}`);
      }
    } catch (error) {
      setMessage('Error submitting inquiry.');
    }
  };

  const toggleForm = () => {
    setShowForm(!showForm); // Toggle form visibility
  };

  return (
   
    <div className="relative min-h-screen bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('https://coastalbendozfund.com/wp-content/uploads/2023/07/contact-us-customer-support-concept-vector-1.jpg')`, minHeight: '500px' }}>
      <div className="absolute inset-0 bg-black bg-opacity-10"></div>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="max-w-3xl w-full p-10 rounded-lg bg-transparent shadow-md">
          {!showForm ? (
            <div className="text-center">
              <h2 className="text-6xl font-extrabold text-black mb-20 relative">
                Have a Query?
                <span className="absolute inset-0 text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary animate-pulse">Have a Query?</span>
              </h2>
              <button
                onClick={toggleForm}
                className="group relative flex justify-center py-3 px-6 ml-56 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-primary to-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
              >
                Contact Us!
              </button>
            </div>
          ) : (
            <div>
              <h2 className="text-center text-5xl font-extrabold text-white mb-6">Feel Free To Ask..!</h2>
              <form className="space-y-6 bg-transparent" onSubmit={handleSubmit}>
                <div className="rounded-md shadow-sm -space-y-px bg-white bg-opacity-20 backdrop-filter backdrop-blur-lg backdrop-saturate-150 rounded-md bg-clip-border">
                  <div>
                    <label htmlFor="fullName" className="sr-only">Full Name</label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                      placeholder="Full Name"
                      value={formData.fullName}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="sr-only">Email address</label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                      placeholder="Email address"
                      value={formData.email}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="mobile" className="sr-only">Mobile Number</label>
                    <input
                      id="mobile"
                      name="mobile"
                      type="tel"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                      placeholder="Mobile Number"
                      value={formData.mobile}
                      onChange={handleChange}
                    />
                  </div>
                  <div>
                    <label htmlFor="inquiry" className="sr-only">Your Message</label>
                    <textarea
                      id="inquiry"
                      name="inquiry"
                      rows="5"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm bg-transparent"
                      placeholder="Your Message"
                      value={formData.inquiry}
                      onChange={handleChange}
                    />
                  </div>
                </div>
                <div className="flex justify-between">
                  <button
                    type="submit"
                    className="group relative flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-primary to-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  >
                    Submit Inquiry
                  </button>
                  <button
                    type="button"
                    onClick={toggleForm}
                    className="group relative flex justify-center py-3 px-6 border border-transparent text-lg font-medium rounded-md text-white bg-gradient-to-r from-primary to-secondary hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-300 ease-in-out transform hover:scale-105 shadow-lg"
                  >
                    Close
                  </button>
                </div>
                {message && (
                  <div className={`mt-4 p-2 rounded ${message.includes('Error') ? 'bg-red-200 text-red-800' : 'bg-green-200 text-green-800'}`}>
                    {message}
                  </div>
                )}
              </form>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookInquiryForm;