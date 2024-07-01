import React, { useEffect, useState } from 'react';
import axios from 'axios';
import BuyModal from '../../pages/BuyModal';
import ModalWrapper from '../../pages/ModalWrapper';
import OrderPopup from '../../componunts/OrderPopup/OrderPopup';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart as faHeartSolid, faTrash } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartRegular } from '@fortawesome/free-regular-svg-icons';

const NewArrivals = () => {
  const [newArrivals, setNewArrivals] = useState([]);
  const [selectedBook, setSelectedBook] = useState(null);
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [buyModalBook, setBuyModalBook] = useState(null);
  const [orderPopup, setOrderPopup] = useState(false);
  const [userId] = useState('exampleUserId'); // Example userId state
  const [error, setError] = useState(null);
  const [likedBooks, setLikedBooks] = useState({});

  useEffect(() => {
    const fetchNewArrivals = async () => {
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
        setNewArrivals(allBooks.slice(0, 4)); // Initial display of only the first 4 books
      } catch (err) {
        console.error('Error fetching books:', err);
        setError('Failed to fetch books');
      }
    };

    fetchNewArrivals();
  }, []);

  const openModal = (book) => {
    setSelectedBook(book);
  };

  const closeModal = () => {
    setSelectedBook(null);
  };

  const confirmOrder = (book) => {
    setOrderPopup(true);
    setBuyModalBook(book);
  
  };

  const handleConfirmOrder = async (book) => {
    setOrderPopup(true);
  };

  const toggleLike = (bookId) => {
    setOrderPopup(true);
  };

  const deleteLike = (bookId) => {
    setLikedBooks((prev) => {
      const newLikes = { ...prev };
      delete newLikes[bookId];
      return newLikes;
    });
  };

  return (
    <div className="p-8 mt-10">
      <h2 className="text-5xl font-bold mb-6 text-center">Our New Arrivals</h2>
      {error && <p className="text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {newArrivals.map((book) => (
          <div
            key={book._id}
            className="relative p-4 border border-gray-300 rounded-md bg-gray-300 hover:bg-gradient-to-r from-primary to-secondary hover:text-white transition-colors duration-300"
            style={{ height: '535px', width: '280px' }}
          >
            <div className="absolute top-1 left-10 transform -translate-x-1/2 -translate-y-1/2">
              <div className="bg-red-500 text-white py-1 px-2 rounded-full text-xs font-semibold flex items-center">
                <span className="mr-1">25% OFF</span>
                <svg className="w-4 h-5 fill-current" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                  <path d="M10 0l2.83 6.36 6.36 2.83-6.36 2.83L10 20l-2.83-6.36L0 9.64l6.36-2.83L10 0z" />
                </svg>
              </div>
            </div>
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
              <div className="flex items-center justify-between ">
                <button onClick={() => openModal(book)} className="bg-blue-500 text-white py-1 px-2 rounded-md ">View More</button>
                <button onClick={() => confirmOrder(book)} className="bg-green-500 text-white py-1 px-2 rounded-md">Buy Now</button>
                <button onClick={() => toggleLike(book._id)}>
                  <FontAwesomeIcon
                    icon={likedBooks[book._id] ? faHeartSolid : faHeartRegular}
                    className={`text-2xl ${likedBooks[book._id] ? 'text-red-500' : 'text-gray-500'}`}
                  />
                </button>
                {likedBooks[book._id] && (
                  <button onClick={() => deleteLike(book._id)} className="ml-2 text-red-500">
                    <FontAwesomeIcon icon={faTrash} />
                  </button>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
      {showBuyModal && (
        <BuyModal
          book={buyModalBook}
          onClose={() => setShowBuyModal(false)}
          onConfirm={() => handleConfirmOrder(buyModalBook)}
          userId={userId}
        />
      )}
      {selectedBook && (
        <ModalWrapper onClose={closeModal}>
          <div className="flex flex-col items-center">
            <img src={selectedBook.imageUrl} alt={selectedBook.name} className="w-96 h-56 mb-4" />
            <h2 className="text-2xl font-semibold mb-2">{selectedBook.name}</h2>
            <p>Author: {selectedBook.author}</p>
            <p>Year: {selectedBook.year}</p>
            <p>Description: {selectedBook.description}</p>
          </div>
        </ModalWrapper>
      )}
      <OrderPopup orderPopup={orderPopup} setOrderPopup={setOrderPopup} />
    </div>
  );
};

export default NewArrivals;
