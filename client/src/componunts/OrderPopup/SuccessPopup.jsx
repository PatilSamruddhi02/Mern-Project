import { IoCloseOutline } from "react-icons/io5";
import PropTypes from 'prop-types';

const SuccessPopup = ({ message, setIsSuccessPopupOpen }) => {
  return (
    <div className="h-screen w-screen fixed top-0 left-0 bg-black/50 z-50 backdrop-blur-sm">
      <div className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-4 shadow-md bg-white dark:bg-gray-900 rounded-md duration-200 h-200 w-[600px]">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-black/70">{message}</h1>
          <IoCloseOutline
            className="text-2xl cursor-pointer"
            onClick={() => setIsSuccessPopupOpen(false)}
          />
        </div>
      </div>
    </div>
  );
};

SuccessPopup.propTypes = {
  message: PropTypes.string.isRequired,
  setIsSuccessPopupOpen: PropTypes.func.isRequired,
};

export default SuccessPopup;
