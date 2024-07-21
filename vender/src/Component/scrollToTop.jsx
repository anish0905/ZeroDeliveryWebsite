import React, { useState, useEffect } from 'react';
import { IoIosArrowUp } from "react-icons/io";
const ScrollButton = () => {
  const [isVisible, setIsVisible] = useState(false);

  // Show button when page is scrolled down
  const toggleVisibility = () => {
    if (window.pageYOffset > 300) {
      setIsVisible(true);
    } else {
      setIsVisible(false);
    }
  };

  // Set the top button visible on scroll
  useEffect(() => {
    document.addEventListener('scroll', toggleVisibility);
    return () => {
      document.removeEventListener('scroll', toggleVisibility);
    };
  }, []);

  // Scroll to top
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <>
      {isVisible && 
        <div className="fixed bottom-10 right-4">
          <button 
            onClick={scrollToTop}
            className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
          >
            <IoIosArrowUp className='text-3xl' />
          </button>
        </div>
      }
    </>
  );
};

export default ScrollButton;
