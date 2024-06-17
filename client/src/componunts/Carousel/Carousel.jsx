/* eslint-disable react/prop-types */
import  { useState, useEffect } from 'react';
import { Transition } from '@headlessui/react';

const TypewriterText = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;
    const intervalId = setInterval(() => {
      setDisplayText((prevText) => {
        if (currentIndex < text.length) {
          currentIndex++;
          return text.slice(0, currentIndex);
        } else {
          clearInterval(intervalId);
          return prevText;
        }
      });
    }, 100); // Adjust typing speed as needed

    return () => clearInterval(intervalId);
  }, [text]);

  return <span>{displayText}</span>;
};

const CarouselBasicExample = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const carouselItems = [
    {
      id: 1,
      imgUrl: 'https://static01.nyt.com/images/2017/05/11/t-magazine/bookstore-slide-2MCD/bookstore-slide-2MCD-superJumbo.jpg',
      label: 'Embark on Literary Journeys. Explore New Worlds Between Pages!',
    },
    {
      id: 2,
      imgUrl: 'https://thelagirl.com/wp-content/uploads/2017/04/Los-Angeles-Bookstores.jpg',
      label: 'Delve into Stories. Uncover Treasures of the Written Word!',
    },
    {
      id: 3,
      imgUrl: 'https://freshcup.com/wp-content/uploads/2023/05/20221111-nov-4-1024x682.jpg',
      label: 'Ignite Your Imagination. Let Books Paint the Colors of Your Dreams!',
    },
  
  
  ];
  

  const handleNext = () => {
    setActiveIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
  };

  const handlePrev = () => {
    setActiveIndex((prevIndex) => (prevIndex - 1 + carouselItems.length) % carouselItems.length);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      handleNext();
    }, 5000); // Change slide every 5 seconds (5000 milliseconds)

    return () => clearInterval(intervalId); // Cleanup the interval on component unmount
  }, []); // Run this effect only once, when the component mounts

  return (
    <div className="relative mt-35">
      <div className="overflow-hidden relative w-full h-[700px]">
        {carouselItems.map((item, index) => (
          <Transition
            key={item.id}
            show={index === activeIndex}
            enter="transition-opacity duration-1000 ease-in-out"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="transition-opacity duration-1000 ease-in-out"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
            className="absolute inset-0 flex items-center justify-center"
          >
            <div className="w-full h-full bg-cover bg-center text-center text-white">
              <img src={item.imgUrl} className="w-full h-full object-cover" alt={`Slide ${item.id}`} />
              <div className="absolute bottom-0 left-0 right-0 p-4 bg-black bg-opacity-50">
                <h1 className="text-5xl sm:text-5xl font-bold mb-2 italic"><TypewriterText text={item.label} /></h1>
              </div>
            </div>
          </Transition>
        ))}
      </div>
      <button
        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-white rounded-full p-3 text-black"
        onClick={handlePrev}
      >
        &#8592;
      </button>
      <button
        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-white rounded-full p-3 text-black"
        onClick={handleNext}
      >
        &#8594;
      </button>
    </div>
  );
};

export default CarouselBasicExample;
