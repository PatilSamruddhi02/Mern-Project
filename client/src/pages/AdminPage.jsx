import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BookForm from './BookForm'; // Adjust the import path as necessary
import { useNavigate } from 'react-router-dom';
import Footer from '../componunts/Footer/Footer';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import OrderPopup from '../componunts/OrderPopup/OrderPopup';
import LogoutPopup from '../pages/LogoutPopup';

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
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10); // Number of items per page
  
 
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


  const handleBookNowClick = () => {
    setSelectedBook(null);
    setShowBookForm(true);
    setActiveSection('bookForm');
  };

  const handleShowUserDetailsClick = () => {
    setActiveSection('userDetails');
  };

  const handleCloseForm = () => {
    setShowBookForm(false);
    setSelectedBook(null);
  };

  const handleLogout = () => {
    setOrderPopup(true);
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
  
  
  return (
    <div>
      <nav className="bg-gradient-to-r from-primary to-secondary text-white p-4 fixed top-0 left-0 right-0 z-10 shadow-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl">Admin Dashboard</h1>
          <button className="bg-gray-500 text-white py-2 px-4 rounded-md shadow-md hover:bg-gray-600 transition-colors duration-200" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </nav>

      <div className="container mx-auto p-4 mt-20">
        <h1 className="text-3xl mb-4 text-center">Welcome to Admin Page</h1>
        <div className="flex justify-center space-x-4 mb-8">
          <button
            className="bg-gradient-to-r from-green-400 to-blue-500 hover:from-blue-500 hover:to-green-400 text-white py-2 px-6 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={handleBookNowClick}
          >
            Add Book Now
          </button>
          <button
            className="bg-gradient-to-r from-purple-400 to-pink-500 hover:from-pink-500 hover:to-purple-400 text-white py-2 px-6 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={handleShowBookDetailsClick}
          >
            Update Book Details
          </button>
          <button
            className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-orange-500 hover:to-yellow-400 text-white py-2 px-6 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={handleShowUserDetailsClick}
          >
            Show User Details
          </button>
          <button
            className="bg-gradient-to-r from-red-400 to-pink-500 hover:from-pink-500 hover:to-red-400 text-white py-2 px-6 rounded-md shadow-lg transform transition-transform duration-300 hover:scale-105"
            onClick={handleShowUserInquiriesClick}
          >
            Show User Inquiries
          </button>
        </div>

        {activeSection === 'bookForm' && showBookForm && (
          <BookForm
            book={selectedBook}
            onClose={handleCloseForm}
            onSubmit={handleUpdateBook}
          />
        )}

{activeSection === 'userDetails' && (
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
        {users.map((user) => (
          <tr key={user._id} className="bg-white hover:bg-gray-100 transition-colors duration-200">
            <td className="border border-gray-300 px-4 py-2">{user.fullName}</td>
            <td className="border border-gray-300 px-4 py-2">{user.mobile}</td>
            <td className="border border-gray-300 px-4 py-2">{user.username}</td>
            <td className="border border-gray-400 px-4 py-2">
              <table>
                <tbody>
                  {formatLoginTimes(user.loginTimes)}
                </tbody>
              </table>
            </td>
           

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
        ))}
      </tbody>
    </table>

    
  </div>
)}


        {activeSection === 'bookDetails' && (
          <div>
            <h2 className="text-2xl mb-4">Book Details Section</h2>
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
                  {books.reduce((acc, publisher) => {
                    publisher.authors.forEach(author => {
                      author.books.forEach(book => {
                        const existingRow = acc.find(row => row.publisher === publisher.publisher);
                        if (existingRow) {
                          existingRow.books.push({ book, author }); // Pushing the book with author
                        } else {
                          acc.push({
                            publisher: publisher.publisher,
                            books: [{ book, author }]
                          });
                        }
                      });
                    });
                    return acc;
                  }, []).map((group, groupIndex) => (
                    <React.Fragment key={groupIndex}>
                      {group.books.map((item, index) => (
                        <tr key={item.book._id} className="bg-white hover:bg-gray-100 transition-colors duration-200">
                          {index === 0 && (
                            <td className="border border-gray-400 px-4 py-2 text-center" rowSpan={group.books.length}>{group.publisher}</td>
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
                              className="text-red-500 py-1 px-1 rounded-md mr-1 hover:bg-green-600 transition-colors duration-200"
                              onClick={() => deleteBook(item.book._id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </React.Fragment>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

{activeSection === 'userInquiries' && (
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
                {inquiries.map(inquiry => (
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
        )}
      </div>
      <Footer />
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default AdminPage;
