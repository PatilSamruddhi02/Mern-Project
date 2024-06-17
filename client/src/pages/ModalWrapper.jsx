
import PropTypes from 'prop-types';

const ModalWrapper = ({ children, onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white p-4 rounded-md w-1/2 max-w-2xl">
        <button onClick={onClose} className="bg-red-500 text-white py-1 px-2 rounded-md float-right">Close</button>
        <div className="mt-4">
          {children}
        </div>
      </div>
    </div>
  );
};

ModalWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  onClose: PropTypes.func.isRequired
};

export default ModalWrapper;
