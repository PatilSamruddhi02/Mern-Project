import React, { useState, useEffect, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStar, faStarHalfAlt } from '@fortawesome/free-solid-svg-icons';
import { faStar as faStarRegular } from '@fortawesome/free-regular-svg-icons';

const Testimonials = () => {
  const testimonials = [
    {
      id: 1,
      name: 'John Doe',
      city: 'New York',
      content: '"Great service and fast delivery. I love shopping here for all my book needs."',
      image: 'https://randomuser.me/api/portraits/men/1.jpg',
      rating: 5, // Rating out of 5 stars
    },
    {
      id: 2,
      name: 'Jane Smith',
      city: 'Los Angeles',
      content: '"Best bookstore online! They have an amazing collection and excellent customer support."',
      image: 'https://randomuser.me/api/portraits/women/2.jpg',
      rating: 4,
    },
    {
      id: 3,
      name: 'Chris Rogers',
      city: 'Chicago',
      content: '"The variety of books here is unmatched. Highly recommended!"',
      image: 'https://randomuser.me/api/portraits/men/3.jpg',
      rating: 4.5,
    },
    {
      id: 4,
      name: 'Emily Brown',
      city: 'San Francisco',
      content: '"Super easy to navigate and find what you\'re looking for. A must-visit for book lovers."',
      image: 'https://randomuser.me/api/portraits/women/4.jpg',
      rating: 5,
    },
    {
      id: 5,
      name: 'Sarah Johnson',
      city: 'Seattle',
      content: '"I keep coming back for more. The quality and service are top-notch!"',
      image: 'https://randomuser.me/api/portraits/women/5.jpg',
      rating: 4.8,
    },
  ];

  const [activeIndex, setActiveIndex] = useState(0);
  const [testimonialHeight, setTestimonialHeight] = useState(0);
  const testimonialRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000); // Change testimonial every 3 seconds (3000ms)

    return () => clearInterval(interval);
  }, [activeIndex]);

  useEffect(() => {
    if (testimonialRef.current) {
      setTestimonialHeight(testimonialRef.current.clientHeight);
    }
  }, [activeIndex]);

  const nextSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === testimonials.length - 1 ? 0 : prevIndex + 1));
  };

  const prevSlide = () => {
    setActiveIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1));
  };

  // Function to render star icons based on rating
  const renderStars = (rating) => {
    const stars = [];
    const floorRating = Math.floor(rating);
    const remainder = rating - floorRating;

    // Full stars
    for (let i = 0; i < floorRating; i++) {
      stars.push(<FontAwesomeIcon key={i} icon={faStar} className="text-yellow-500" />);
    }

    // Half star if remainder is 0.5 or more
    if (remainder >= 0.5) {
      stars.push(<FontAwesomeIcon key="half" icon={faStarHalfAlt} className="text-yellow-500" />);
    }

    // Empty stars to complete 5 stars
    while (stars.length < 5) {
      stars.push(<FontAwesomeIcon key={`empty-${stars.length}`} icon={faStarRegular} className="text-yellow-500" />);
    }

    return stars;
  };

  return (
    <section className="bg-white dark:bg-gray-900">
      <h1 className="text-6xl text-center mt-10">What Our Clients Said...??</h1>
      <div className="max-w-screen px-4 py-8 mx-auto text-center lg:py-16 lg:px-6 relative mt-10 overflow-hidden">
        <div className="testimonial-carousel flex items-center justify-center" style={{ height: `${testimonialHeight}px` }}>
          {testimonials.map((testimonial, index) => (
            <div
              ref={testimonialRef}
              key={testimonial.id}
              className={`testimonial-item absolute left-0 top-0 w-full transform transition-transform duration-200 ${
                index === activeIndex ? 'translate-x-0 opacity-100' : 'translate-x-full opacity-0'
              }`}
              style={{ zIndex: testimonials.length - index }}
            >
              <div className="max-w-screen-md mx-auto bg-gray-200 dark:bg-gray-800 rounded-lg p-6 shadow-lg">
                <img
                  className="w-16 h-16 rounded-full mx-auto mb-4"
                  src={testimonial.image}
                  alt={`Profile of ${testimonial.name}`}
                />
                <blockquote>
                  <p className="text-lg text-gray-900 dark:text-white">{testimonial.content}</p>
                </blockquote>
                <figcaption className="flex items-center justify-center mt-4 space-x-3">
                  <div>
                    <p className="font-semibold text-gray-900 dark:text-white">{testimonial.name}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{testimonial.city}</p>
                    <div className="flex items-center mt-2">{renderStars(testimonial.rating)}</div>
                  </div>
                </figcaption>
              </div>
            </div>
          ))}
        </div>
        <button
          className="prev absolute top-1/3 align-center transform -translate-y-1/2 left-40 bg-gray-300 dark:bg-gray-700 text-gray-700  dark:text-gray-200 rounded-full p-2 shadow-lg focus:outline-none z-10"
          onClick={prevSlide}
        >
          Prev
        </button>
        <button
          className="next absolute top-1/3 transform -translate-y-1/2 right-40 bg-gray-300 dark:bg-gray-700 text-gray-700  dark:text-gray-200 rounded-full p-2 shadow-lg focus:outline-none z-10"
          onClick={nextSlide}
        >
          Next
        </button>
      </div>
    </section>
  );
};

export default Testimonials;
