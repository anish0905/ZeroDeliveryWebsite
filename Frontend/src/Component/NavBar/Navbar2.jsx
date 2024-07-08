import React from "react";
import { VscAccount } from "react-icons/vsc";
import { HiShoppingBag } from "react-icons/hi2";
import { Link, useNavigate } from "react-router-dom"; // Updated import to useNavigate
import { useDispatch, useSelector } from 'react-redux';
import { FaClipboardList } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoWallet } from "react-icons/io5";
import { CiLogin } from "react-icons/ci";
import loginIMg from "../../../public/images/login.png";
import Swal from 'sweetalert2'; // Import SweetAlert2
import { Login } from "../../routes/Login";
import { userActions } from "../../store/userInfoSlice";


const NavBar2 = () => {
  const bag = useSelector((store) => store.bag);
  const userId= localStorage.getItem('userId');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // Use useNavigate instead of useHistory

  // Function to handle click on links requiring authentication
  const handleAuthenticationRequired = (link) => {
    if (!userId) {
      // Show SweetAlert2 login prompt
      Swal.fire({
        icon: 'info',
        title: 'Please login first',
        showConfirmButton: true,
        confirmButtonText: 'Login',
        showCancelButton: true,
        cancelButtonText: 'Cancel',
      }).then((result) => {
        if (result.isConfirmed) {
          // Navigate to login page
          navigate('/login'); // Use navigate instead of history.push
        }
      });
    } else {
      // Navigate to the link if user is authenticated
      navigate(link); // Use navigate instead of history.push
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    dispatch(userActions.clearUser());
    window.location.reload(); // This line might not be necessary
    navigate("/"); // Navigate to home or another appropriate route
  };

  const totalQuantity = bag.reduce((acc, cart) => {
    const cartQuantity = cart.cartItems?.reduce((cartAcc, item) => {
      const quantity = isNaN(item.quantity) ? 0 : item.quantity;
      return cartAcc + quantity;
    }, 0);
    return acc + cartQuantity;
  }, 0);

  return (
    <div className="mb-4">
      <div className="flex justify-center content-center items-center">
        <img src={loginIMg} alt="" className="h-40" />
      </div>
      <div className="px-1 my-4">
        <ul>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60"
          onClick={() => handleAuthenticationRequired('/user/MyAcount')}>
            <div>
              <VscAccount className="text-2xl" />
            </div>
            <button className="border-bottom2">
              Profile
            </button>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60"
           onClick={() => handleAuthenticationRequired('/user/MyOrder')}>
            <div>
              <FaClipboardList className="text-2xl" />
            </div>
            <button className="border-bottom2">
              My Orders
            </button>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60" onClick={() => handleAuthenticationRequired('/user/SaveAddress')}
          >
            <div>
              <MdLocationOn className="text-2xl" />
            </div>
            <button  className="border-bottom2">
              Save Address
            </button>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60"
            onClick={() => handleAuthenticationRequired('/user/MyWishlist')}>
            <div>
              <IoWallet className="text-2xl" />
            </div>
            <button  className="border-bottom2"
             
            style={{ cursor: 'pointer' }}>
              My Wishlist
            </button>
          </li>
          <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60" onClick={() => handleAuthenticationRequired('/Bag')}>
            <div className="flex justify-center content-center items-center relative">
              <HiShoppingBag className="text-2xl" />
              <div className="absolute px-2 py-1 left-4 -top-3 rounded-full bg-deep-orange-800 text-white text-xs"  >
                {totalQuantity}
              </div>
            </div>
            <button  className="border-bottom2"
           
            >
              Bag
            </button>
          </li>
          {
            userId ? (
              <li className="flex my-4 gap-5 hover:bg-blue-gray-200 px-4 py-1 rounded w-60" onClick={handleLogout}>
                <div>
                  <CiLogin className="text-2xl" />
                </div>
                <button className="border-bottom2">
                  Logout
                </button>
              </li>
            ) : (
              <li
                className="flex my-4  items-center content-center hover:bg-blue-gray-200 pl-4 py-1 rounded w-60"
                
              >
                <div>
                  <CiLogin className="text-2xl" />
                </div>
                <Login name={"Login"}/>
              </li>
            )
          }
        </ul>
      </div>
      <div className="my-4 px-1"></div>
    </div>
  );
};

export default NavBar2;
