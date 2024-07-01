import React, { useState } from 'react';
import axios from 'axios';
import BuyModal from './pages/BuyModal';

const OrderForm = () => {
  const [orderData, setOrderData] = useState({
    customerName: '',
    customerEmail: '',
    bookName: '',
    authorName: '',
    publisherName: '',
    price: 0,
    quantity: 1,
  });
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setOrderData({
      ...orderData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSelectedBook(orderData);
    setShowModal(true);
  };

  const handleConfirmOrder = async (confirmedOrder) => {
    try {
      const response = await axios.post('http://localhost:3001/orders', confirmedOrder);
      alert('Order placed successfully!');
      setOrderData({
        customerName: '',
        customerEmail: '',
        bookName: '',
        authorName: '',
        publisherName: '',
        price: 0,
        quantity: 1,
      });
      setShowModal(false);
    } catch (error) {
      console.error('Error placing order:', error);
      alert('Failed to place order.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="customerName"
          value={orderData.customerName}
          onChange={handleChange}
          placeholder="Customer Name"
          required
        />
        <input
          type="email"
          name="customerEmail"
          value={orderData.customerEmail}
          onChange={handleChange}
          placeholder="Customer Email"
          required
        />
        <input
          type="text"
          name="bookName"
          value={orderData.bookName}
          onChange={handleChange}
          placeholder="Book Name"
          required
        />
        <input
          type="text"
          name="authorName"
          value={orderData.authorName}
          onChange={handleChange}
          placeholder="Author Name"
          required
        />
        <input
          type="text"
          name="publisherName"
          value={orderData.publisherName}
          onChange={handleChange}
          placeholder="Publisher Name"
          required
        />
        <input
          type="number"
          name="price"
          value={orderData.price}
          onChange={handleChange}
          placeholder="Price"
          required
        />
        <input
          type="number"
          name="quantity"
          value={orderData.quantity}
          onChange={handleChange}
          placeholder="Quantity"
          required
        />
        <button type="submit">Place Order</button>
      </form>

      {showModal && (
        <BuyModal
          book={selectedBook}
          customerId={1} // Replace with actual customer ID if available
          onClose={() => setShowModal(false)}
          onConfirm={handleConfirmOrder}
        />
      )}
    </div>
  );
};

export default OrderForm;
