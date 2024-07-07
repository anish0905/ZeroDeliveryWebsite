import React, { useState } from 'react';
import userProfilePic from '../../../public/images/myPic.avif';
import { useSelector, useDispatch } from 'react-redux';
import { FiEdit } from 'react-icons/fi';

const MyAccount = () => {
  const userProfile = useSelector((store) => store.userProfile);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newName, setNewName] = useState(userProfile.name || "");

  const handleUpdateName = () => {
    dispatch({ type: 'UPDATE_NAME', payload: newName });
    setIsModalOpen(false);
  };

  return (
    <div className='flex justify-evenly content-center items-center gap-4'>
      <div>
        <img src={userProfilePic} alt="User Profile" className='w-40' />
      </div>
      <div>
        <h1 className='text-xl font-semibold'>My Account</h1>
        <p className='my-1'>Welcome, {userProfile.name || "John Doe"}</p> 
        <p className='my-1'>+91 {userProfile.mobileNumber}</p>
        <p className='my-1'><span className='font-semibold text-gray-700'>Wallet:</span> ₹{userProfile.wallet||"0"}</p>
      </div>
      <div>
        <button 
          type="button" 
          className="flex w-full items-center justify-center px-4 py-2 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-500 hover:bg-green-600"
          onClick={() => setIsModalOpen(true)}
        >
          <FiEdit className="mr-2" /> Add name
        </button>
      </div>

      {isModalOpen && (
        <div className='fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-4 rounded shadow-lg'>
            <h2 className='text-lg font-semibold mb-2'>Update Name</h2>
            <input 
              type="text" 
              value={newName} 
              onChange={(e) => setNewName(e.target.value)} 
              className='border p-2 w-full mb-4'
            />
            <div className='flex justify-end gap-2'>
              <button 
                type="button" 
                className="px-4 py-2 bg-gray-300 rounded"
                onClick={() => setIsModalOpen(false)}
              >
                Cancel
              </button>
              <button 
                type="button" 
                className="px-4 py-2 bg-green-500 text-white rounded"
                onClick={handleUpdateName}
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default MyAccount;
