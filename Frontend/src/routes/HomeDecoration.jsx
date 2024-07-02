import React from "react";
import { CiStar } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { bagActions } from "../store/BagSlice";
import { IoBagAddSharp } from "react-icons/io5";
import { IoBagRemoveSharp } from "react-icons/io5";

const  HomeDecoration= ({ item }) => {
  const dispatch = useDispatch();
  const bagItem = useSelector((store) => store.bag);

  const elementFound = bagItem.includes(item.id);

  const handleAddTOBag = () => {
    dispatch(bagActions.addToBag(item.id));
  };

  const handleRemove = () => {
    dispatch(bagActions.removeFromBag(item.id));
  };

  return (
    <div className="font-sef px-4 shadow-md mt-4 border-2 rounded-2xl h-[400px] cursor-pointer hover:shadow-2xl">
      <div  className="my-2 relative flex justify-center items-center content-center ">
        <img src={item.images[0]} alt="item image" className="w-60 h-60 rounded" />
        <div className="my-1 absolute left-2 bottom-0 z-40  text-sm font-thin flex content-center items-center gap-1 bg-blue-gray-50 px-2 py-1 rounded ">
          {item.rating} <CiStar className="text-xl text-yellow-900" /> |{" "}
           {item.stock} 
        </div>
      </div>
      <div className="block gap-5 my-1 px-1">
        <p className="text-xl font-semibold"> {item.brand}</p>
        <p className="text-gray-400 text-sm font-thin">{item.title}</p>
      </div>
      <div className="flex gap-5 my-1  px-1">
        <span>RS {item.price}</span>
        <span className="text-gray-400 text-sm font-thin line-through">
          RS {(item.price+item.price*(item.discountPercentage/100)).toFixed(2)}{" "}
        </span>
        <span className="text-pink-400 text-sm font-thin">
          ({item.discountPercentage}% OFF)
        </span>
      </div>
      <div className="my-4 w-1/2">
        {elementFound ? (
          <button
          className=" bg-red-400 w-full rounded text-white py-1 h-8 flex justify-center content-center items-center gap-2"
          onClick={handleRemove}
        >
          <IoBagRemoveSharp className="text-2xl" />
          Remove Item
        </button>
         
        ) : (
          
           <button
           className=" bg-green-400 w-full h-8 py-1 rounded text-white flex justify-center content-center items-center gap-2 "
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

export default HomeDecoration;
