import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './BookForm'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import Footer from '../componunts/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import OrderPopup from '../componunts/OrderPopup/OrderPopup';
import LogoutPopup from '../pages/LogoutPopup';;
import { faUserShield } from '@fortawesome/free-solid-svg-icons';
import { faBook, faEdit, faUser, faEnvelope, faBars,faShoppingCart ,faSignOutAlt,faComments} from '@fortawesome/free-solid-svg-icons';
import Charts from '../pages/Charts'; // Adjust the path as necessary

const AdminPage = () => {
  const [users, setUsers] = useState([]);
  
  const [books, setBooks] = useState([]);
  const [inquiries, setInquiries] = useState([]);
  const [showBookForm, setShowBookForm] = useState(false);
  const [activeSection, setActiveSection] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const navigate = useNavigate();
  const [showPopup, setShowPopup] = useState(false); // State for showing the logout popup
  const [orderPopup, setOrderPopup] = useState(false);
  const [showInitialImage, setShowInitialImage] = useState(true); // State for initial image display
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const [showPurchaseDetails, setShowPurchaseDetails] = useState(false);
  const [purchaseDetails, setPurchaseDetails] = useState([]);
 
  const [feedbackList, setFeedbackList] = useState([]);

  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        // Assuming backend returns users with loginTimes and logoutTimes
        setUsers(response.data.map(user => ({
          ...user,
          loginTimes: user.loginTimes || [],
          logoutTimes: user.logoutTimes || [] // Add this line to set logoutTimes
        })));
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };
  
    fetchUsers();
  }, []);
  
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('http://localhost:8000/users');
        setUsers(response.data);
      } catch (error) {
        console.error('Error fetching users:', error);
      }
    };

    fetchUsers();
  }, []);

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/books');
        setBooks(response.data);
      } catch (error) {
        console.error('Error fetching book data:', error);
      }
    };

    fetchAllBooks();
  }, []);

  const handleEditBookClick = (book) => {
    setSelectedBook(book);
    setShowBookForm(true);
    setActiveSection('bookForm');
  };

  
  
  const handleUpdateBook = async (updatedBookData) => {
    try {
      if (updatedBookData._id) {
        // Update existing book
        const response = await axios.put(`http://localhost:8000/books/${updatedBookData._id}`, updatedBookData);
        setBooks(prevBooks =>
          prevBooks.map(book => book._id === updatedBookData._id ? response.data : book)
        );
      } else {
        // Add new book
        const response = await axios.post('http://localhost:8000/books', updatedBookData);
        setBooks(prevBooks => [...prevBooks, response.data]);
      }
      setShowBookForm(false);
      setSelectedBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };
  

  const formatLoginTimes = (loginTimes) => {
    const loginMap = {};
    loginTimes.forEach(time => {
      const dateKey = new Date(time).toLocaleDateString();
      const timeValue = new Date(time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
      if (loginMap[dateKey]) {
        loginMap[dateKey].push(timeValue);
      } else {
        loginMap[dateKey] = [timeValue];
      }
    });

    return Object.entries(loginMap).map(([date, times], index) => (
      <React.Fragment key={index}>
        <tr>
          <td>{date}</td>
          <td className="space-x-10">
            {times.map((time, timeIndex) => (
              <div className="ml-10" key={timeIndex}>{time}</div>
            ))}
          </td>
        </tr>
        <tr>
          <td className="border-b border-gray-400" colSpan="2"></td>
        </tr>
      </React.Fragment>
    ));
  };

  const editLoginTimes = async (userId, newLoginTimes) => {
    try {
      await axios.put(`http://localhost:8000/users/${userId}/login-times`, { loginTimes: newLoginTimes });
      const updatedUsers = users.map(user => user._id === userId ? { ...user, loginTimes: newLoginTimes } : user);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating login times:', error);
    }
  };

  const deleteUser = async (userId) => {
    try {
      await axios.delete(`http://localhost:8000/users/${userId}`);
      setUsers(users.filter(user => user._id !== userId));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const deleteBook = async (bookId) => {
    try {
      await axios.delete(`http://localhost:8000/books/${bookId}`);
      setBooks(books.filter(book => book._id !== bookId)); // Update the state after deletion
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  const handleShowBookDetailsClick = async () => {
    try {
      const response = await axios.get('http://localhost:8000/books');
      setBooks(response.data);
      setActiveSection('bookDetails');
    } catch (error) {
      console.error('Error fetching book data:', error);
    }
  };

  const handleShowUserInquiriesClick = async () => {
    console.log('Show User Inquiries button clicked');
    try {
      const response = await axios.get('http://localhost:8000/inquiries');
      console.log('User inquiries data:', response.data);
      setInquiries(response.data);
      setActiveSection('userInquiries');
    } catch (error) {
      console.error('Error fetching user inquiries:', error);
    }
  };

  const handleShowPurchaseDetailsClick = async () => {
    console.log('Attempting to fetch purchase details...');
    try {
      const response = await axios.get('http://localhost:8000/api/purchases');
      console.log('Purchase details data:', response.data);
      setPurchaseDetails(response.data); // Assuming setPurchaseDetails is a state setter
      setShowPurchaseDetails(true); // Assuming setShowPurchaseDetails is a state setter
      setActiveSection('purchaseDetails'); // Ensure this is being set correctly
    } catch (error) {
      console.error('Error fetching purchase details:', error);
      // Handle error state or display an error message to the user
    }
  };


 

  useEffect(() => {
    fetchFeedbackList(); // Fetch feedback data when component mounts
  }, []);

  const fetchFeedbackList = async () => {
    try {
      const response = await axios.get('http://localhost:8000/feedback-list');
      setFeedbackList(response.data); // Update feedbackList state with fetched data
      setActiveSection('userFeedback'); // Set active section after fetching data
    } catch (error) {
      console.error('Error fetching feedback:', error);
    }
  };

  const renderStarRating = (rating) => {
    // Implement your logic to render star ratings based on 'rating'
    // Example: return a string of stars or a component representing the rating
    return ` ${rating}`;
  };
  
  const handleBookNowClick = () => {
    setSelectedBook(null);
    setShowBookForm(true);
    setActiveSection('bookForm');
    setShowInitialImage(false);
  };

  const handleShowUserDetailsClick = () => {
    setActiveSection('userDetails');
  };

  const handleCloseForm = () => {
    setShowBookForm(false);
    setSelectedBook(null);
  };

  const handleLogout = () => {
     window.location.href = '/';
  };
  const editLogoutTimes = async (userId, newLogoutTimes) => {
    try {
      await axios.put(`http://localhost:8000/users/${userId}/logout-times`, { logoutTimes: newLogoutTimes });
      const updatedUsers = users.map(user => user._id === userId ? { ...user, logoutTimes: newLogoutTimes } : user);
      setUsers(updatedUsers);
    } catch (error) {
      console.error('Error updating logout times:', error);
    }
  };
  
    // Calculate total pages
    const totalItems = books.reduce((total, publisher) => {
      publisher.authors.forEach(author => {
        total += author.books.length;
      });
      return total;
    }, 0);
    const totalPages = Math.ceil(totalItems / itemsPerPage);
  
    // Get current books to display
    const getCurrentBooks = () => {
      const flatBooks = books.reduce((acc, publisher) => {
        publisher.authors.forEach(author => {
          author.books.forEach(book => {
            acc.push({ publisher: publisher.publisher, book, author });
          });
        });
        return acc;
      }, []);
  
      const startIndex = (currentPage - 1) * itemsPerPage;
      const endIndex = startIndex + itemsPerPage;
      return flatBooks.slice(startIndex, endIndex);
    };

   // Pagination Logic based on loginTimes
  const allLoginTimes = users.flatMap(user => user.loginTimes);
  const totalLoginItems = allLoginTimes.length;
  const totalLoginPages = Math.ceil(totalLoginItems / itemsPerPage);
  const getCurrentLogins = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return allLoginTimes.slice(startIndex, endIndex);
  };
  
   // Pagination Logic for User Inquiries Section
   const totalInquiryItems = inquiries.length;
   const totalInquiryPages = Math.ceil(totalInquiryItems / itemsPerPage);
   const getCurrentInquiries = () => {
     const startIndex = (currentPage - 1) * itemsPerPage;
     const endIndex = startIndex + itemsPerPage;
     return inquiries.slice(startIndex, endIndex);
   };
  // Pagination Logic for Purchase Details Section
  const totalPurchaseItems = purchaseDetails.length;
  const totalPurchasePages = Math.ceil(totalPurchaseItems / itemsPerPage);
  const getCurrentPurchases = () => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return purchaseDetails.slice(startIndex, endIndex);
  };

  return (
    <div>
      
    <div className="flex ">
      {/* Left Sidebar */}
      <nav className="bg-gradient-to-r from-primary to-secondary h-auto w-56 px-4 py-8 overflow-y-auto">
        <h2 className="text-3xl font-semibold mb-4 mt-16 text-center font-bold"> Dashboard Menu</h2>
        <ul className="space-y-2 text-xl">
          <li>
            
            <button
              className={`w-full py-2 px-4 rounded-md text-left ${activeSection === 'bookForm' && showBookForm ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'}`}
              onClick={handleBookNowClick}
            >
                <FontAwesomeIcon icon={faBook} className="mr-2" />
              Add Book Now
            </button>
          </li>
          <li className="mb-4">
  <button
      className={`w-full py-2 px-4 rounded-md text-left ${activeSection === 'purchaseDetails' ? 'bg-green-500 text-white' : 'hover:bg-gray-300'}`}
    onClick={handleShowPurchaseDetailsClick}
  >
    <FontAwesomeIcon icon={faShoppingCart} className="mr-2" />
    Book Purchased Details
  </button>
</li>


            <li>
            <button
              className={`w-full py-2 px-4 rounded-md text-left ${activeSection === 'userInquiries' ? 'bg-red-500 text-white' : 'hover:bg-gray-300'}`}
              onClick={handleShowUserInquiriesClick}
            >
               <FontAwesomeIcon icon={faEnvelope} className="mr-2" />
              Show User Inquiries
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 px-4 rounded-md text-left ${activeSection === 'userFeedback' ? 'bg-indigo-500 text-white' : 'hover:bg-gray-300'}`}
              onClick={fetchFeedbackList}
            >
              <FontAwesomeIcon icon={faComments} className="mr-2" />
              Show User Feedback
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 px-4 rounded-md text-left ${activeSection === 'bookDetails' ? 'bg-purple-500 text-white' : 'hover:bg-gray-300'}`}
              onClick={handleShowBookDetailsClick}
            >
              <FontAwesomeIcon icon={faEdit} className="mr-2" />
              Update Book Details
            </button>
          </li>
          <li>
            <button
              className={`w-full py-2 px-4 rounded-md text-left ${activeSection === 'userDetails' ? 'bg-yellow-500 text-white' : 'hover:bg-gray-300'}`}
              onClick={handleShowUserDetailsClick}
            >
               <FontAwesomeIcon icon={faUser} className="mr-2" />
              Show User Details
            </button>
          </li>
          
         
          
        </ul>
      </nav>
     
      {/* Right Content Area */}
      <div className="flex-1 overflow-y-auto ">
      <nav className="bg-gradient-to-r from-primary to-secondary text-white p-4 shadow-md fixed top-0 left-0 right-0 z-10 mb-50">
  <div className="container mx-auto flex justify-between items-center">
    <div className="flex items-center">
      <FontAwesomeIcon icon={faUserShield} className="h-10 w-10 text-white mr-2 ml-10" />
      <h1 className="text-white text-3xl font-bold">Admin Dashboard</h1>
    </div>
    <button className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-200" onClick={handleLogout}>
    
    <FontAwesomeIcon icon={faSignOutAlt} className="mr-2" />  Logout
    </button>
  </div>
</nav>


        
      {/* Initial Charts Section */}
      {showInitialImage && (
         <div className="flex justify-center items-center h-screen">
          <Charts />
        </div>
      )}
      

       {/* Initial Image Section */}
       {/* {showInitialImage && (
          <div className="flex justify-center items-center h-screen ">
            <img src="https://st2.depositphotos.com/34031690/46736/v/450/depositphotos_467366440-stock-illustration-flat-isometric-vector-illustration-isolated.jpg" alt="Initial Image" className="w-1/2  ml-4" />
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ7TqlpoT_n42bKhuH2K-KRrMvyCueCoUsYAw&usqp=CAU" alt="Initial Image" className="w-1/2 h-full " />
          
          </div>
        )} */}

        {activeSection === 'bookForm' && showBookForm && (
          <BookForm
            book={selectedBook}
            onClose={handleCloseForm}
            onSubmit={handleUpdateBook}
          />
        )}

{activeSection === 'userDetails' && (
        <div>
          <h2 className="text-2xl mb-4 mt-20 text-center">Users Details Section</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-md">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Mobile</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Username</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Login Times</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentLogins().map((loginTime, index) => {
                  const user = users.find(user => user.loginTimes.includes(loginTime));
                  return (
                    <tr key={index} className="bg-white hover:bg-gray-100 transition-colors duration-200">
                      <td className="border border-gray-300 px-4 py-2">{user.fullName}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.mobile}</td>
                      <td className="border border-gray-300 px-4 py-2">{user.username}</td>
                      <td className="border border-gray-400 px-4 py-2">{new Date(loginTime).toLocaleString()}</td>
                      <td className="border border-gray-300 px-4 py-2 space-x-2">
                        <button
                          className="bg-green-500 text-white py-1 px-2 rounded-md hover:bg-green-600 transition-colors duration-200"
                          onClick={() => {
                            const newLoginTimes = prompt('Enter new login times (comma separated):')?.split(',').map(time => new Date(time).toISOString());
                            if (newLoginTimes) {
                              editLoginTimes(user._id, newLoginTimes);
                            }
                          }}
                        >
                          Edit
                        </button>
                        <button
                          className="bg-red-500 text-white py-1 px-2 rounded-md hover:bg-red-600 transition-colors duration-200"
                          onClick={() => deleteUser(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalLoginPages}`}</span>
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalLoginPages))}
              disabled={currentPage === totalLoginPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

{activeSection === 'bookDetails' && (
        <div>
          <h2 className="text-2xl mb-4 mt-20 text-center">Book Details Section</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-400 shadow-md">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="border border-gray-400 px-4 py-2 text-center">Publisher Name</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Author Name</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Book Name</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Year</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Price</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Total Copies</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Available Copies</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Purchased Copies</th>
                  <th className="border border-gray-400 px-4 py-2 text-center">Actions</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentBooks().map((item, index) => (
                  <tr key={item.book._id} className="bg-white hover:bg-gray-100 transition-colors duration-200">
                    {index === 0 && (
                      <td className="border border-gray-400 px-4 py-2 text-center" rowSpan={itemsPerPage}>{item.publisher}</td>
                    )}
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.author.authorName}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.book.name}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.book.year}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.book.price}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.book.copies}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.book.availableCopies}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">{item.book.purchasedCopies}</td>
                    <td className="border border-gray-400 px-4 py-2 text-center">
                      <button
                        className="text-green-500 py-1 px-1 rounded-md mr-1 hover:bg-green-600 transition-colors duration-200"
                        onClick={() => handleEditBookClick(item.book)}
                      >
                        <span role="img" aria-label="edit">✏️</span>
                      </button>
                      <button
                        className="text-red-500 py-1 px-1 rounded-md mr-1 hover:bg-red-600 transition-colors duration-200"
                        onClick={() => deleteBook(item.book._id)}
                      >
                        <FontAwesomeIcon icon={faTrash} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPages}`}</span>
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
              disabled={currentPage === totalPages}
            >
              Next
            </button>
          </div>
        </div>
      )}

{activeSection === 'userInquiries' && (
        <div>
          <h2 className="text-2xl mb-4 mt-20 text-center">Users Inquiries Section</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-md">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Full Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Email</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Mobile</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Inquiry</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentInquiries().map(inquiry => (
                  <tr key={inquiry._id} className="bg-white hover:bg-gray-100 transition-colors duration-200">
                    <td className="border border-gray-300 px-4 py-2">{inquiry.fullName}</td>
                    <td className="border border-gray-300 px-4 py-2">{inquiry.email}</td>
                    <td className="border border-gray-300 px-4 py-2">{inquiry.mobile}</td>
                    <td className="border border-gray-300 px-4 py-2">{inquiry.inquiry}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(inquiry.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalInquiryPages}`}</span>
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalInquiryPages))}
              disabled={currentPage === totalInquiryPages}
            >
              Next
            </button>
          </div>
        </div>
      )}


{activeSection === 'userFeedback' && (
        <div>
          <h2 className="text-2xl mb-4 mt-20 text-center">User Feedback Section</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-md">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="border border-gray-300 px-4 py-2 text-left">Sr. No.</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Name</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Address</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Rating</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Message</th>
                  <th className="border border-gray-300 px-4 py-2 text-left">Date</th>
                </tr>
              </thead>
              <tbody>
                {feedbackList.map((feedback, index) => (
                  <tr key={feedback._id} className="bg-white hover:bg-gray-100 transition-colors duration-200">
                    <td className="border border-gray-300 px-4 py-2">{index + 1}</td>
                    <td className="border border-gray-300 px-4 py-2">{feedback.name}</td>
                    <td className="border border-gray-300 px-4 py-2">{feedback.address}</td>
                    <td className="border border-gray-300 px-4 py-2">{renderStarRating(feedback.rating)}</td>
                    <td className="border border-gray-300 px-4 py-2">{feedback.comment}</td>
                    <td className="border border-gray-300 px-4 py-2">{new Date(feedback.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

{activeSection === 'purchaseDetails' && (
        <div>
          <h2 className="text-2xl mb-4 mt-20 text-center">Book Purchase Details</h2>
          <div className="overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md rounded-md">
              <thead className="bg-gradient-to-r from-primary to-secondary text-white">
                <tr>
                  <th className="border-b border-gray-400 py-2 px-4">Customer Name</th>
                  <th className="border-b border-gray-400 py-2 px-4">Publisher Name</th>
                  <th className="border-b border-gray-400 py-2 px-4">Book Name</th>
                  <th className="border-b border-gray-400 py-2 px-4">Price</th>
                  <th className="border-b border-gray-400 py-2 px-4">Quantity</th>
                  <th className="border-b border-gray-400 py-2 px-4">Total Price</th>
                  <th className="border-b border-gray-400 py-2 px-4">Purchase Date</th>
                </tr>
              </thead>
              <tbody>
                {getCurrentPurchases().map((purchase, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100 transition-colors duration-200">
                    <td className="border-b border-gray-400 py-2 px-4">{purchase.customerName}</td>
                    <td className="border-b border-gray-400 py-2 px-4">{purchase.publisherName}</td>
                    <td className="border-b border-gray-400 py-2 px-4">{purchase.bookName}</td>
                    <td className="border-b border-gray-400 py-2 px-4">${purchase.price}</td>
                    <td className="border-b border-gray-400 py-2 px-4">{purchase.quantity}</td>
                    <td className="border-b border-gray-400 py-2 px-4">${purchase.totalPrice}</td>
                    <td className="border-b border-gray-400 py-2 px-4">{new Date(purchase.purchaseDate).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </button>
            <span className="px-4 py-2">{`Page ${currentPage} of ${totalPurchasePages}`}</span>
            <button
              className="mx-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPurchasePages))}
              disabled={currentPage === totalPurchasePages}
            >
              Next
            </button>
          </div>
        </div>
      )}

      </div>
      </div>
      <Footer />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
   
  );
};

export default AdminPage;
