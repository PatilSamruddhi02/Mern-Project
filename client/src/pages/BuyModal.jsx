import { useState } from 'react';
import axios from 'axios';

const BuyModal = ({ book, customerId, onClose, onConfirm }) => {
  const [error, setError] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const handleConfirmOrder = async () => {
    try {
      const response = await axios.patch(`http://localhost:8000/books/confirm/${book._id}`, {
        customerId,
        quantity,
        price: book.price * quantity // Total price
      });

      onConfirm(response.data);
    } catch (error) {
      console.error('Error confirming order:', error);
      setError(error.response ? error.response.data.error : 'Failed to confirm order. Please try again later.');
    }
  };

  return (
    <div className="fixed inset-0 z-50 overflow-auto bg-gray-900 bg-opacity-75 flex justify-center items-center">
      <div className="bg-white p-8 rounded-md max-w-md justify-center items-center">
        <h2 className="text-3xl font-semibold mb-4 text-center">Confirm Order</h2>
        <div className="mb-6 flex items-center justify-center">
          <img src={book.imageUrl} alt={book.name} className="object-cover object-contain rounded-md w-80 ml-10 h-80" />
        </div>
        <p className="text-lg text-center mb-6">
          Are you sure you want to buy <span className="font-semibold">{book.name}</span>?
        </p>
        <div className="mb-6 text-center">
          <label className="block mb-2">Quantity:</label>
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(Number(e.target.value))}
            min="1"
            max={book.availableCopies}
            className="w-full border rounded px-3 py-2"
          />
        </div>
        <div className="flex justify-center">
          <button onClick={onClose} className="bg-gray-400 text-white px-6 py-3 rounded-md mr-4">Cancel</button>
          <button onClick={handleConfirmOrder} className="bg-green-500 text-white px-6 py-3 rounded-md">Confirm</button>
        </div>
        {error && <p className="text-red-500 mt-4">{error}</p>}
      </div>
    </div>
  );
};

export default BuyModal;
