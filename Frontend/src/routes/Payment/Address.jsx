import { IoCheckmarkDone } from "react-icons/io5";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation

const Address = () => {
  const [showAll, setShowAll] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const addressData = useSelector((store) => store.address);
  const navigate = useNavigate(); // Initialize useNavigate

  const addresses = Object.keys(addressData)
    .filter((key) => !isNaN(key))
    .map((key) => addressData[key]);

  useEffect(() => {
    // Save the first address if no address is selected
    if (!selectedAddress && addresses.length > 0) {
      setSelectedAddress(addresses[0]);
      localStorage.setItem('selectedAddress', JSON.stringify(addresses[0]));
    }
  }, [selectedAddress, addresses]);

  const handleChangeClick = () => {
    setShowAll((prev) => !prev);
  };

  const handleSelectAddress = (address) => {
    setSelectedAddress(address);
    localStorage.setItem('selectedAddress', JSON.stringify(address));
    setShowAll(false);
  };

  const handleNavigateToAddressForm = () => {
    navigate("/addressForm"); // Navigate to /addressForm route
  };

  return (
    <div className="bg-gray-50 shadow-md w-full flex gap-4 content-center items-center p-4 mt-2">
      <span className="bg-blue-gray-200 py-1 px-2 text-sm rounded-sm text-blue-600">2</span>
      <div className="flex justify-between w-full items-center content-center">
        <div>
          <div className="flex gap-2 items-center content-center">
            <h1 className="font-semibold text-gray-600 text-base">Deliver Address</h1>
            <IoCheckmarkDone className="text-blue-600 text-xl font-extrabold" />
          </div>
          {showAll ? (
            addresses.map((addr, index) => (
              <div
                key={index}
                className="flex justify-between content-center items-center gap-5"
                onClick={() => handleSelectAddress(addr)}
              >
                <p className="text-sm cursor-pointer mb-2">
                  {addr.street}, {addr.city}, {addr.postalCode}, {addr.state}, {addr.country}
                </p>
              </div>
            ))
          ) : (
            <div className="flex justify-between content-center items-center gap-5 my-1">
              <p className="text-sm">
                {selectedAddress
                  ? `${selectedAddress.street}, ${selectedAddress.city}, ${selectedAddress.postalCode}, ${selectedAddress.state}, ${selectedAddress.country}`
                  : addresses.length > 0
                  ? `${addresses[0].street}, ${addresses[0].city}, ${addresses[0].postalCode}, ${addresses[0].state}, ${addresses[0].country}`
                  : "No address available"}
              </p>
            </div>
          )}
        </div>
        <button onClick={addresses.length === 0 ? handleNavigateToAddressForm : handleChangeClick} className="text-xs font-semibold px-6">
          {showAll ? "SELECT" : "CHANGE"}
        </button>
      </div>
    </div>
  );
};

export default Address;
