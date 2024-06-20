/* eslint-disable react/prop-types */
import { useState, useEffect } from 'react';
import axios from 'axios';

const BookForm = ({ book, onClose }) => {
  const [formData, setFormData] = useState({
    name: '',
    author: '',
    publisher: '',
    year: '',
    copies: '',
    availableCopies: '',
    price: '', // Added price field
    description: '',
    imageUrl: '',
  });
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  useEffect(() => {
    if (book) {
      setFormData({
        name: book.name || '',
        author: book.author || '',
        publisher: book.publisher || '',
        year: book.year || '',
        copies: book.copies || '',
        availableCopies: book.availableCopies || '',
        price: book.price || '', // Include price
        description: book.description || '',
        imageUrl: book.imageUrl || '',
      });
    } else {
      setFormData({
        name: '',
        author: '',
        publisher: '',
        year: '',
        copies: '',
        availableCopies: '',
        price: '', // Initialize price
        description: '',
        imageUrl: '',
      });
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { name, author, publisher, year, copies, imageUrl, price } = formData;

      if (!name || !author || !publisher || !year || !copies || !imageUrl || !price) {
        setErrorMessage('Please fill in all required fields.');
        return;
      }

      const newBook = {
        name,
        author,
        publisher,
        year: Number(year),
        copies: Number(copies),
        availableCopies: Number(copies),
        price: Number(price), // Convert price to number
        description: formData.description,
        imageUrl,
      };

      let response;
      if (book) {
        // Update existing book
        response = await axios.put(`http://localhost:8000/books/${book._id}`, newBook);
        setSuccessMessage('Book updated successfully!');
      } else {
        // Add new book
        response = await axios.post('http://localhost:8000/books', newBook);
        setSuccessMessage('Book added successfully!');
      }

      setErrorMessage('');
      setFormData({
        name: '',
        author: '',
        publisher: '',
        year: '',
        copies: '',
        availableCopies: '',
        price: '', // Clear price after submission
        description: '',
        imageUrl: '',
      });
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);
      onClose();
    } catch (error) {
      console.error('Error adding/updating book:', error);
      setErrorMessage('Error adding/updating book. Please try again later.');
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-lg border border-gray-200">
      <h2 className="text-2xl mb-4 mt-20">{book ? 'Edit Book' : 'Add New Book'}</h2>
      {successMessage && (
        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 mb-4 rounded relative" role="alert">
          {successMessage}
        </div>
      )}
      {errorMessage && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 mb-4 rounded relative" role="alert">
          {errorMessage}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-gray-700">Name</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="author" className="block text-gray-700">Author</label>
          <input
            type="text"
            id="author"
            name="author"
            value={formData.author}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="publisher" className="block text-gray-700">Publisher</label>
          <input
            type="text"
            id="publisher"
            name="publisher"
            value={formData.publisher}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="year" className="block text-gray-700">Year</label>
          <input
            type="number"
            id="year"
            name="year"
            value={formData.year}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="copies" className="block text-gray-700">Copies</label>
          <input
            type="number"
            id="copies"
            name="copies"
            value={formData.copies}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="availableCopies" className="block text-gray-700">Available Copies</label>
          <input
            type="number"
            id="availableCopies"
            name="availableCopies"
            value={formData.availableCopies}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">Price</label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
          />
        </div>
        <div className="mb-4">
          <label htmlFor="imageUrl" className="block text-gray-700">Image URL</label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={formData.imageUrl}
            onChange={handleChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
            required
          />
        </div>
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            {book ? 'Update' : 'Add'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookForm;
