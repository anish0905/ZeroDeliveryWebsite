import React, { useState, useCallback } from 'react';
import { GoogleMap, useLoadScript, Marker } from '@react-google-maps/api';
import { FaHome, FaBriefcase, FaHotel, FaMapMarkerAlt } from 'react-icons/fa';
import { FiEdit } from 'react-icons/fi';

const libraries = ['places'];
const mapContainerStyle = {
  flex: 1,
  height: '400px',
};
const longitude = localStorage.getItem('longitude');

const latitude = localStorage.getItem('latitude');
const center = {
  lat: longitude,
  lng: latitude // Example longitude for Bengaluru
};

const AddressForm = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: 'YOUR_GOOGLE_MAPS_API_KEY', // Replace with your Google Maps API key
    libraries,
  });

  const [markers, setMarkers] = useState([]);

  const onMapClick = useCallback((event) => {
    setMarkers((current) => [
      {
        lat: event.latLng.lat(),
        lng: event.latLng.lng(),
        time: new Date(),
      },
    ]);
  }, []);

  if (loadError) return 'Error loading maps';
  if (!isLoaded) return 'Loading Maps';

  return (
    <div className="p-1 max-w-4xl mx-auto lg:flex md:flex block gap-10 px-10  pt-28 ">
      <div className="lg:w-1/2 md:w-1/2 w-full my-8  ">
        <GoogleMap
          mapContainerStyle={mapContainerStyle}
          zoom={15}
          center={center}
          onClick={onMapClick}
        >
          {markers.map((marker) => (
            <Marker key={marker.time.toISOString()} position={{ lat: marker.lat, lng: marker.lng }} />
          ))}
        </GoogleMap>
      </div>
      <div className="lg:w-1/2 md:w-1/2 w-full my-4 ">
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Save address as *</label>
            <div className="flex space-x-2 mt-1">
              <button type="button" className="flex items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FaHome className="mr-2" /> Home
              </button>
              <button type="button" className="flex items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FaBriefcase className="mr-2" /> Work
              </button>
              <button type="button" className="flex items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FaHotel className="mr-2" /> Hotel
              </button>
              <button type="button" className="flex items-center px-3 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50">
                <FaMapMarkerAlt className="mr-2" /> Other
              </button>
            </div>
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Flat / House no / Building name *</label>
            <input type="text" className="block w-full border-2 solid border-black rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Floor (optional)</label>
            <input type="text" className="block w-full border-2 pl-5 solid border-black rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Area / Sector / Locality *</label>
            <input type="text" className="block w-full  rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm border-2 pl-5 solid border-black" defaultValue=" Rajajinagar, Bengaluru" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Nearby landmark (optional)</label>
            <input type="text" className="block w-full rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm border-2 solid border-black" />
          </div>
          <div className="space-y-1">
            <label className="block text-sm font-medium text-gray-700">Enter your details for seamless delivery experience</label>
            <input type="text" placeholder="Your name *" className="block w-full  rounded pl-5 shadow-sm focus:ring-indigo-500 focus:border-indigo-500 h-8 sm:text-sm border-2 solid border-black" />
            <input type="number" placeholder="Your phone number (optional)" className="block w-full pl-5 rounded shadow-sm focus:ring-indigo-500 focus:border-indigo-500  h-8 sm:text-sm mt-2 border-2 solid border-black" defaultValue="7260858715" />
          </div>
          <button type="submit" className="flex items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600">
            <FiEdit className="mr-2" /> Save
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddressForm;
