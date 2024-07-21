import React from 'react'
import Payment from './Payment'
import BagSummery from '../../Component/BagSummery'
import UserInfo from './UserInfo'
import Address from './Address'

const PaymentHomePage = () => {
  return (
    <div className='lg:flex pt-32 p-10 gap-5 md:block block'>
    <div className='lg:w-1/2 w-full'>

    <UserInfo/>
    <Address/>

     <Payment/>
     
    </div>
    
      <div className='lg:w-5/12 w-full my-4 lg:fixed right-10'>
        <BagSummery name={"payment"} />
      </div>
   
  </div>
  )
}

export default PaymentHomePage
