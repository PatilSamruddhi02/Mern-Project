import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faRocket, faTag, faLeaf, faHeart } from '@fortawesome/free-solid-svg-icons';

const AboutUs = () => {
  return (
    <div className="container mx-auto py-8 px-4">
      <h2 className="text-5xl font-bold text-center mb-8">About Us</h2>
      <div className="flex flex-wrap justify-around">
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 text-center group">
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform group-hover:scale-105 hover:bg-gradient-to-r from-primary to-secondary hover:text-white">
            <span className="block mb-4 text-5xl text-red-500">
              <FontAwesomeIcon icon={faRocket} />
            </span>
            <div className="tg-titlesubtitle">
              <h3 className="text-2xl font-semibold">Fast Delivery</h3>
              <p className="text-sm text-gray-600">Shipping Worldwide</p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 text-center group">
          <a href="https://www.99booksstore.com/available-coupon">
            <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform group-hover:scale-105 hover:bg-gradient-to-r from-primary to-secondary hover:text-white">
              <span className="block mb-4 text-5xl text-yellow-500">
                <FontAwesomeIcon icon={faTag} />
              </span>
              <div className="tg-titlesubtitle">
                <h3 className="text-2xl font-semibold">Open Discount</h3>
                <p className="text-sm text-gray-600">Offering Open Discount</p>
              </div>
            </div>
          </a>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 text-center group">
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform group-hover:scale-105 hover:bg-gradient-to-r from-primary to-secondary hover:text-white">
            <span className="block mb-4 text-5xl text-green-500">
              <FontAwesomeIcon icon={faLeaf} />
            </span>
            <div className="tg-titlesubtitle">
              <h3 className="text-2xl font-semibold">Eyes On Quality</h3>
              <p className="text-sm text-gray-600">Publishing Quality Work</p>
            </div>
          </div>
        </div>
        <div className="w-full sm:w-1/2 md:w-1/4 p-4 text-center group">
          <div className="bg-white shadow-lg rounded-lg p-6 transition-transform transform group-hover:scale-105 hover:bg-gradient-to-r from-primary to-secondary hover:text-white">
            <span className="block mb-4 text-5xl text-red-600">
              <FontAwesomeIcon icon={faHeart} />
            </span>
            <div className="tg-titlesubtitle">
              <h3 className=" font-semibold text-2xl">24/7 Support</h3>
              <p className="text-sm text-gray-600">Serving Every Moment</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutUs;
