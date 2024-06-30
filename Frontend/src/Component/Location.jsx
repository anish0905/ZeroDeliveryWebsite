import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Location = () => {
  const [location, setLocation] = useState('Fetching location...');
  const [deliveryTime, setDeliveryTime] = useState('Calculating...');

  useEffect(() => {
    const fetchLocation = async (latitude, longitude) => {
      try {
        const response = await axios.get(`https://api.bigdatacloud.net/data/reverse-geocode-client`, {
          params: {
            latitude: latitude,
            longitude: longitude,
            localityLanguage: 'en'
          }
        });
        const data = response.data;
        setLocation(`${data.city}, ${data.countryName}`);
        setDeliveryTime('11 minutes'); // Example delivery time
      } catch (error) {
        setLocation('Unable to fetch location');
      }
    };

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          fetchLocation(position.coords.latitude, position.coords.longitude);
        },
        (error) => {
          setLocation('Unable to access location');
        }
      );
    } else {
      setLocation('Geolocation not supported');
    }
  }, []);

  return (
    <div>
      <p>Delivery in {deliveryTime}</p>
      <p className="text-xs font-thin">{location}</p>
    </div>
  );
};

export default Location;
