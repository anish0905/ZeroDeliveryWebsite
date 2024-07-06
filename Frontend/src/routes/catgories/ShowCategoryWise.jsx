import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { CiStar } from "react-icons/ci";
import { IoBagRemoveSharp, IoBagAddSharp } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";

import { bagActions } from "../../store/BagSlice";
import { CategoryList } from "../catgories/CategoryList";
import { API_URI } from "../../Contants";

const ShowCategoryWise = (props) => {
  const params = useParams();
  const name = props.name || params.name;
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const bagItems = useSelector((store) => store.bag);
  const dispatch = useDispatch();

  const modifyName = name.toLowerCase();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(
          `${API_URI}/api/prod/category/${modifyName}`
        );
        setItems(resp.data.data);
        setLoading(false);
      } catch (error) {
        console.log("error", error);
        setLoading(false);
      }
    };

    fetchData();
  }, [name, modifyName]);

  const handleAddToBag = (itemId) => {
    dispatch(bagActions.addToBag(itemId));
  };

  const handleRemove = (itemId) => {
    dispatch(bagActions.removeFromBag(itemId));
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
      </div>
    );
  }

  return (
    <div className="lg:flex md:flex block justify-center gap-5 content-center">
      {params.name && (
        <div className="lg:w-52 md:w-52 w-full">
          <CategoryList />
        </div>
      )}
      <div className={`flex justify-center items-center content-center gap-5 flex-wrap   ${params.name ? 'lg:ml-40 md:ml-40 ml-0 lg:mt-32 md:mt-32 mt-52' : 'mt-10'}`}>
        {items.map((item) => {
          const elementFound = bagItems.some(bagItem => bagItem._id === item._id);

          return (
            <div
              key={item._id}
              className="font-sef px-4 shadow-md mt-4 border-2 rounded-2xl h-[400px] cursor-pointer hover:shadow-2xl"
            >
              <Link
                to={`/productDetails/${item._id}`}
                className="my-2 relative flex justify-center items-center content-center"
              >
                <img
                  src={item.images[0]}
                  alt="item image"
                  loading="lazy"
                  className="w-60 h-60 rounded"
                />
                <div className="my-1 absolute left-2 bottom-0 z-20 text-sm font-thin flex items-center gap-1 bg-blue-gray-50 px-2 py-1 rounded">
                  {item.rating} <CiStar className="text-xl text-yellow-900" /> |{" "}
                  {item.stock}
                </div>
              </Link>
              <div className="block gap-5 my-1 px-1">
                <p className="text-xl font-semibold">{item.brand}</p>
                <p className="text-gray-400 text-sm font-thin">{item.title}</p>
              </div>
              <div className="flex gap-5 my-1 px-1">
                <span>RS {item.price}</span>
                <span className="text-gray-400 text-sm font-thin line-through">
                  RS{" "}
                  {(
                    item.price +
                    item.price * (item.discountPercentage / 100)
                  ).toFixed(2)}
                </span>
                <span className="text-pink-400 text-sm font-thin">
                  ({item.discountPercentage}% OFF)
                </span>
              </div>
              <div className="my-4 w-8/12">
                {elementFound ? (
                  <button
                    className="bg-red-400 w-full rounded text-white py-1 h-8 flex justify-center items-center gap-2"
                    onClick={() => handleRemove(item._id)}
                  >
                    <IoBagRemoveSharp className="text-2xl" />
                    Remove Item
                  </button>
                ) : (
                  <button
                    className="bg-green-400 w-full rounded text-white py-1 h-8 flex justify-center items-center gap-2"
                    onClick={() => handleAddToBag(item._id)}
                  >
                    <IoBagAddSharp className="text-2xl" />
                    Add to Bag
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ShowCategoryWise;
