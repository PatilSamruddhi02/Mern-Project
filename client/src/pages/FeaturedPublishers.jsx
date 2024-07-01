import React, { useRef, useEffect } from 'react';
import Slider from 'react-slick';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faInstagram, faTwitter } from '@fortawesome/free-brands-svg-icons';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { library } from '@fortawesome/fontawesome-svg-core';

// Add icons to the library
library.add(faFacebook, faInstagram, faTwitter);

const publishers = [
  { name: 'John Grisham', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640688757529_Grisham.jpg' },
  { name: 'Ravi Belagere', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640688787108_Belegare.jpg' },
  { name: 'Kuvempu', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640688962135_Kuvempu.jpg' },
  { name: 'D V Guruprasad', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640689058438_GuruPrasad.JPG' },
  { name: 'Shivarama Karanth', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640689120139_Karanth.JPG' },
  { name: 'Sadhguru', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640689212895_3.jpg' },
  { name: 'Cecelia Ahern', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640689400101_Ahern.jpg' },
  { name: 'J K Rowling', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1646301108485_Kambara.jpg' },
  { name: 'Paulo Coelho', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640688962135_Kuvempu.jpg' },
  { name: 'Dan Brown', img: 'https://s3-ap-southeast-1.amazonaws.com/filehost.sapnaonline.com/widgets/1640689058438_GuruPrasad.JPG' },
];

const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 2,
  arrows: true,
};

const FeaturedPublishers = () => {
  const sliderRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      sliderRef.current.slickNext();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto py-8">
      <h2 className="text-5xl font-bold text-center mb-8">Featured Authors</h2>
      <Slider ref={sliderRef} {...settings}>
        {publishers.map((publisher, index) => (
          <div key={index} className="p-4">
            <div className="relative overflow-hidden border rounded-lg shadow-lg hover:shadow-2xl transition-shadow duration-300">
              <img src={publisher.img} alt={publisher.name} className="w-48 h-48 object-cover rounded-full mx-auto" />
              <div className="p-4 text-center">
                <h3 className="text-lg font-semibold">{publisher.name}</h3>
              </div>
              <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300">
                <div className="text-white space-x-4">
                  <FontAwesomeIcon icon={['fab', 'facebook']} size="2x" />
                  <FontAwesomeIcon icon={['fab', 'instagram']} size="2x" />
                  <FontAwesomeIcon icon={['fab', 'twitter']} size="2x" />
                </div>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FeaturedPublishers;
