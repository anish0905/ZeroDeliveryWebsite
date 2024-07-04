

import { IoCheckmarkDone } from "react-icons/io5";
import AddressForm from "../../Component/AddressForm";
import { Link } from "react-router-dom";

const Address = () => {
  return (
   
  
        <div className="bg-gray-50 shadow-md w-full flex gap-4 content-center items-center p-4 mt-2">
          <span className="bg-blue-gray-200 py-1 px-2 text-sm rounded-sm text-blue-600">
            2
          </span>
          <div className="flex justify-between w-full items-center content-center ">
            <div>
              <div className="flex gap-2  items-center content-center">
                <h1 className="font-semibold text-gray-600 text-base">Diliver Adress</h1>
                <IoCheckmarkDone className="text-blue-600 text-xl font-extrabold" />
              </div>
    
              <div className=" flex justify-between content-center items-center gap-5 ">
                <p className="text-sm">Ganesha Men's Pg in Rajajinagar, Bangalore</p>
              </div>
            </div>
            <Link to={`/addressForm`} className="text-xs font-semibold px-6">CHANGE </Link>
              
          </div>
        </div>
   
    
  )
}

export default Address
