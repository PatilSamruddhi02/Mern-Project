import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faHeart as faHeartSolid, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';
import ModalWrapper from './ModalWrapper'; // Adjust the import path as necessary
import BuyModal from './BuyModal'; // Create a BuyModal component
import Footer from '../componunts/Footer/Footer';
import BookInquiryForm from "../pages/BookInquiryForm";
import Store from "../assets/BookWorm Haven.png";
import OrderPopup from '../componunts/OrderPopup/OrderPopup';
import Carousel from '../componunts/Carousel/Carousel';

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [likedBooks, setLikedBooks] = useState({});
  const [showFavorites, setShowFavorites] = useState(false);
  const [showBuyModal, setShowBuyModal] = useState(false); // State for Buy Modal
  const [buyModalBook, setBuyModalBook] = useState(null); // Book for Buy Modal
  const [confirmedOrders, setConfirmedOrders] = useState({});
  const [showConfirmedOrders, setShowConfirmedOrders] = useState(false);
  const [price, setPrice] = useState(null); // State for price in view more modal
  const [orderPopup, setOrderPopup] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize] = useState(8); // Number of items per page
  const ITEMS_PER_PAGE = 8; // Same as pageSize for clarity
  const PAGINATION_MAX_PAGES = 5; // Maximum number of pagination links to display
  const [userId, setUserId] = useState('exampleUserId'); // Example userId state

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const response = await axios.get('http://localhost:8000/books');
        const allBooks = response.data.flatMap(publisher =>
          publisher.authors.flatMap(author =>
            author.books.map(book => ({
              ...book,
              publisher: publisher.publisher,
              author: author.authorName
            }))
          )
        );
        setBooks(allBooks);
        setLoading(false);
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books');
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const openModal = (book) => {
    setSelectedBook(book);
    setPrice(book.price); // Set the price when opening the modal
  };

  const closeModal = () => {
    setSelectedBook(null);
    setPrice(null); // Reset price when closing the modal
  };

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const toggleLike = (bookId) => {
    setLikedBooks((prev) => ({
      ...prev,
      [bookId]: !prev[bookId]
    }));
  };

  const deleteLike = (bookId) => {
    setLikedBooks((prev) => {
      const newLikes = { ...prev };
      delete newLikes[bookId];
      return newLikes;
    });
  };

  const toggleShowFavorites = () => {
    setShowFavorites(!showFavorites);
  };

  const confirmOrder = (book) => {
    if (book && book.name) {
      setBuyModalBook(book);
      setShowBuyModal(true);
    } else {
      alert("Invalid book object");
    }
  };

  const handleConfirmOrder = async (book) => {
    try {
      // Send PATCH request to confirm order
      await axios.patch(`http://localhost:8000/books/confirm/${book._id}`);

      // Update UI: decrease available copies
      const updatedBooks = books.map((b) =>
        b._id === book._id ? { ...b, availableCopies: b.availableCopies - 1 } : b
      );
      setBooks(updatedBooks);

      // Add the book to confirmed orders
      setConfirmedOrders((prev) => ({
        ...prev,
        [book._id]: true
      }));

      // Close the buy modal
      setShowBuyModal(false);
    } catch (error) {
      console.error('Error confirming order:', error);
      // Handle error here
    }
  };

  const deleteConfirmedOrder = (bookId) => {
    setConfirmedOrders((prev) => {
      const newOrders = { ...prev };
      delete newOrders[bookId];
      return newOrders;
    });
  };

  const toggleShowConfirmedOrders = () => {
    setShowConfirmedOrders(!showConfirmedOrders);
  };

  

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const filteredBooks = books.filter((book) => {
    const searchLower = searchTerm.toLowerCase();
    return (
      book.name.toLowerCase().includes(searchLower) ||
      book.author.toLowerCase().includes(searchLower) ||
      book.publisher.toLowerCase().includes(searchLower)
    );
  });

  // Calculate pagination
  const totalPages = Math.ceil(filteredBooks.length / pageSize);
  const startIndex = (currentPage - 1) * pageSize;
  const endIndex = startIndex + pageSize;
  const paginatedBooks = filteredBooks.slice(startIndex, endIndex);

  // Handle pagination click

  // Your handleLogout function using userId
  const handleLogout = () => {
    setOrderPopup(true);
  };


  

  const likedBooksCount = Object.values(likedBooks).filter(Boolean).length;
  const confirmedOrdersCount = Object.keys(confirmedOrders).length;

  return (
    <div>
      {/* Navigation */}
      <nav className="bg-gradient-to-r from-primary to-secondary text-white p-2 fixed top-0 left-0 right-0 z-10">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-white text-2xl flex items-center">
            <img src={Store} alt="Logo" className="h-16 w-36" />
          </h1>
          <div className="flex items-center space-x-4 ">
            <button
              onClick={toggleShowFavorites}
              className={`py-1 px-4 rounded-md text-white transform transition-transform hover:scale-110 ${showFavorites ? 'bg-blue-600' : 'bg-blue-500 hover:bg-blue-600'}`}
            >
              {showFavorites ? 'Show All Books' : `Show Favorites List (${likedBooksCount})`}
            </button>
            <button
              onClick={toggleShowConfirmedOrders}
              className={`py-1 px-4 rounded-md text-white transform transition-transform hover:scale-110 ${showConfirmedOrders ? 'bg-green-600' : 'bg-green-500 hover:bg-green-600'}`}
            >
              {showConfirmedOrders ? 'Show All Books' : `My Orders (${confirmedOrdersCount})`}
            </button>
            <button
  onClick={handleLogout}
  className="py-1 px-4 rounded-md text-white transform transition-transform hover:scale-110 bg-gradient-to-r from-red-600 to-red-700"
>
  Logout
</button>

          </div>
        </div>
      </nav>

      <Carousel />

      {/* Main Content */}
      <div className="p-8 mt-10">
        <h1 className="text-5xl sm:text-5xl text-center font-bold mb-5 italic">BOOKS</h1>
        {/* Search Input */}
        <div className="mb-8 relative">
          <input
            type="text"
            placeholder="Search by publisher, author, or book name..."
            value={searchTerm}
            onChange={handleSearch}
            className="w-full p-2 border border-gray-300 rounded-md pl-10"
          />
          <FontAwesomeIcon
            icon={faSearch}
            className="absolute top-2 left-2 text-gray-500"
            size="lg"
          />
        </div>
        {/* Book Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {paginatedBooks.map((book) => (
            <div key={book._id} className="p-4 border border-gray-300 rounded-md bg-gray-300" style={{ height: '560px', width: '300px' }}>
              <div style={{ height: '250px', display: 'flex', justifyContent: 'center', alignItems: 'center', overflow: 'hidden' }}>
                <img
                                  src={book.imageUrl}
                                    alt={book.name}
                                    className="object-contain w-full h-full transition-transform duration-300 transform hover:scale-105"
                                  />
                                </div>
                                <div className="p-2">
                                  <h3 className="text-2xl font-semibold mb-2">{book.name}</h3>
                                  <p className="text-lg text-gray-700 mb-2">Author: <span className="text-blue-600">{book.author}</span></p>
                                  <p className="text-lg text-gray-700 mb-2">Publisher: <span className="text-blue-600">{book.publisher}</span></p>
                                  <p className="text-gray-700 mb-2">Year: {book.year}</p>
                                  <p className="text-gray-700 mb-2">Available Copies: {book.availableCopies}</p>
                                  <div className="flex items-center justify-between">
                                    <button onClick={() => openModal(book)} className="bg-blue-500 text-white py-1 px-2 rounded-md">View More</button>
                                    <div className="flex items-center">
                                      <button onClick={() => confirmOrder(book)} className="bg-green-500 text-white py-1 px-2 rounded-md">Buy Now</button>
                                    </div>
                                    <div className="flex items-center">
                                      <button onClick={() => toggleLike(book._id)}>
                                        <FontAwesomeIcon
                                          icon={likedBooks[book._id] ? faHeartSolid : faHeartRegular}
                                          className={`text-2xl ${likedBooks[book._id] ? 'text-red-500' : 'text-gray-500'}`}
                                        />
                                      </button>
                                      {/* Delete like button */}
                                      {showFavorites && likedBooks[book._id] && (
                                        <button onClick={() => deleteLike(book._id)} className="ml-2 text-red-500">
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      )}
                                      {/* Delete confirmed order button */}
                                      {showConfirmedOrders && confirmedOrders[book._id] && (
                                        <button onClick={() => deleteConfirmedOrder(book._id)} className="ml-2 text-red-500">
                                          <FontAwesomeIcon icon={faTrash} />
                                        </button>
                                      )}
                                    </div>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          {/* Pagination */}
                          {totalPages > 1 && (
                            <div className="flex justify-center mt-8">
                              <nav className="bg-white rounded-lg border border-gray-300">
                                <ul className="flex">
                                  {/* Previous button */}
                                  <li>
                                    <button
                                      onClick={() => setCurrentPage(currentPage - 1)}
                                      className={`py-2 px-4 bg-gray-200 ${
                                        currentPage === 1 ? 'cursor-not-allowed' : 'hover:bg-gray-300'
                                      }`}
                                      disabled={currentPage === 1}
                                    >
                                      Previous
                                    </button>
                                  </li>
                                  {/* Page numbers */}
                                  {Array.from({ length: totalPages > PAGINATION_MAX_PAGES ? PAGINATION_MAX_PAGES : totalPages }, (_, index) => index + 1).map(page => (
                                    <li key={page}>
                                      <button
                                        onClick={() => handleClickPage(page)}
                                        className={`py-2 px-4 bg-gray-200 ${
                                          currentPage === page ? 'bg-blue-500 text-white' : 'hover:bg-gray-300'
                                        }`}
                                      >
                                        {page}
                                      </button>
                                    </li>
                                  ))}
                                  {/* Next button */}
                                  <li>
                                    <button
                                      onClick={() => setCurrentPage(currentPage + 1)}
                                      className={`py-2 px-4 bg-gray-200 ${
                                        currentPage === totalPages ? 'cursor-not-allowed' : 'hover:bg-gray-300'
                                      }`}
                                      disabled={currentPage === totalPages}
                                    >
                                      Next
                                    </button>
                                  </li>
                                </ul>
                              </nav>
                            </div>
                          )}
                        </div>
                        {/* Buy Modal */}
                        {showBuyModal && (
                          <BuyModal
                            book={buyModalBook}
                            onClose={() => setShowBuyModal(false)}
                            onConfirm={() => handleConfirmOrder(buyModalBook)}
                            userId={userId}
                          />
                        )}
                        {/* View More Modal */}
                        {selectedBook && (
                          <ModalWrapper onClose={closeModal}>
                            <div className="flex flex-col items-center">
                              <img src={selectedBook.imageUrl} alt={selectedBook.name} className="w-96 h-56 mb-4" />
                              <h2 className="text-2xl font-semibold mb-2">{selectedBook.name}</h2>
                              <p>Author: {selectedBook.author}</p>
                              <p>Year: {selectedBook.year}</p>
                              <p>Price: {price}</p> {/* Displaying the price */}
                              <p>Description: {selectedBook.description}</p>
                            </div>
                          </ModalWrapper>
                        )}
                        <BookInquiryForm />
                        <Footer />
                        <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
                      </div>
                    );
                  };
                  
                  export default BookList;
                  