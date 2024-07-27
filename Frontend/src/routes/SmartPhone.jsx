import React, { useState } from "react";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/BagSlice";
import { IoBagAddSharp } from "react-icons/io5";
import { IoBagRemoveSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import axios from "axios";
import { API_URI } from "../Contants";

const SmartPhone = ({ item }) => {
  const dispatch = useDispatch();
  const bagItem = useSelector((store) => store.bag);
  const userId = localStorage.getItem("userId");
  const [quantity, setQuantity] = useState(1);

  const flattenedBagItems = bagItem?.data?.flat() || [];
  const elementFound = flattenedBagItems.some(
    (bagItem) => bagItem.productId === item._id
  );

  const handleAddTOBag = async () => {
    try {
      const resp = await axios.post(`${API_URI}/api/cart`, {
        userId,
        VendorUser: item.VendorUser,
        productId: item._id,
        productName: item.title,
        price: item.price,
        quantity: quantity,
        discountPercentage: item.discountPercentage,
        promotionCode: item.promotionCode || "null",
      });
      fetchItems();
    } catch (error) {
      console.error("Error adding to cart:", error.message);
    }
  };

  const fetchItems = async () => {
    try {
      const resp = await axios.get(
        `${API_URI}/api/cart/totalProductQuantity/${userId}`
      );
      // console.log(resp.data.data)
      dispatch(bagActions.addToBag(resp.data));
    } catch (error) {
      console.error("error", error);
    }
  };

  const handleRemove = async () => {
    try {
      await axios.post(`${API_URI}/api/cart/${userId}/${item._id}`);
      dispatch(bagActions.removeFromBag({ productId: item._id }));
    } catch (error) {
      console.error("Error removing from cart:", error.message);
    }
  };

  return (
    <div className="font-sef px-4 py-2 shadow-md mt-4 border-2 rounded-2xl max-h-min cursor-pointer hover:shadow-2xl">
      <Link
        to={`/productDetails/${item._id}`}
        className="my-2 relative flex justify-center items-center content-center "
      >
        <img
          src={item.images[0]}
          alt="item image"
          loading="lazy"
          className="w-60 h-60 rounded"
        />
        <div className="my-1 absolute left-2 bottom-0 z-20  text-sm font-thin flex content-center items-center gap-1 bg-blue-gray-50 px-2 py-1 rounded ">
          {item.rating} <CiStar className="text-xl text-yellow-900" /> |{" "}
          {item.stock}
        </div>
      </Link>
      <div className="block gap-5 my-1 px-1">
        <p className="text-xl font-semibold"> {item.brand}</p>
        <p className="text-gray-400 text-sm font-thin">{item.title}</p>
      </div>
      <div className="flex gap-5 my-1  px-1">
        <span>RS {item.price}</span>
        <span className="text-gray-400 text-sm font-thin line-through">
          RS{" "}
          {(item.price + item.price * (item.discountPercentage / 100)).toFixed(
            2
          )}{" "}
        </span>
        <span className="text-pink-400 text-sm font-thin">
          ({item.discountPercentage}% OFF)
        </span>
      </div>
      <div className="my-4 w-full">
        {elementFound ? (
          <button
            className=" bg-red-400 w-full rounded text-white py-1  flex justify-center content-center items-center gap-2"
            onClick={handleRemove}
          >
            <IoBagRemoveSharp className="text-2xl" />
            Remove Item
          </button>
        ) : (
          <button
            className=" bg-green-400 w-full  py-1 rounded text-white flex justify-center content-center items-center gap-2 "
            onClick={handleAddTOBag}
          >
            <IoBagAddSharp className="text-2xl  " />
            Add to Bag
          </button>
        )}
      </div>
    </div>
  );
};

export default SmartPhone;
