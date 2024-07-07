import React from 'react'
import userProfilePic from '../../../public/images/myPic.avif'
import { useSelector } from 'react-redux';

const MyAcount = () => {
    const  userProfile  = useSelector((store) => store.userProfile);

  return (
    <div className='flex justify-center content-center items-center gap-4'>
     <div>
     <img src={userProfilePic} alt="" className='w-40' />
     </div>
     <div>
       <h1 className='text-xl font-semibold'>My Account</h1>
       <p className='my-1'>Welcome, John Doe!</p>
       <p className='my-1'>+91{userProfile.mobileNumber}</p>
       <p className='my-1'><span className='font-semibold text-gray-700'>Wallet:</span> ₹{userProfile.wallet}</p>
    </div>
    </div>
  )
}

export default MyAcount
