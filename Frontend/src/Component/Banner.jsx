import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URI } from "../Contants";

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentSlide, setCurrentSlide] = useState(0);

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URI}/api/admin/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prevSlide) => (prevSlide + 1) % banners.length);
    }, 3000); // Change slide every 3 seconds

    return () => clearInterval(interval);
  }, [banners.length]);

  return (
    <div className="mt-20 mb-10 relative overflow-hidden">
      {banners.length > 0 && (
        <img 
          src={`${API_URI}/${banners[currentSlide].path}`} 
          alt={`Banner ${currentSlide + 1}`} 
          className="w-full h-auto object-cover transition-all duration-300 ease-in-out" 
          style={{ maxHeight: '400px' }} // Set a max height for the banner
        />
      )}
    </div>
  );
};

export default Banner;
