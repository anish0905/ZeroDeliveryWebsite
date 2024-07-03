import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { CiStar } from 'react-icons/ci';
import { IoBagRemoveSharp, IoBagAddSharp } from 'react-icons/io5';
import { useDispatch, useSelector } from 'react-redux';
import { bagActions } from '../store/BagSlice'; // Adjust path as needed
import { API_URI } from '../Contants';

const ShowCategoryWise = () => {
    const { name } = useParams();
    const [items, setItems] = useState([]);
    const [loading, setLoading] = useState(true); // State to manage loading state
    const bagItem = useSelector(state => state.bag.items) || [];
    const dispatch = useDispatch();
    
    const modifyName = name.toLowerCase();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`${API_URI}/api/prod/category/${modifyName}`);
                setItems(resp.data.data);
                setLoading(false); // Set loading to false when data is fetched
                console.log(resp.data.data); // Log the fetched data instead of the state
            } catch (error) {
                console.log("error", error);
                setLoading(false); // Set loading to false on error
            }
        };

        fetchData();
    }, [name]);

    const elementFound = bagItem.includes(items.id);

    const handleAddToBag = (itemId) => {
        dispatch(bagActions.addToBag(itemId)); // Pass itemId to addToBag action
    };

    const handleRemove = (itemId) => {
        dispatch(bagActions.removeFromBag(itemId)); // Pass itemId to removeFromBag action
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
            </div>
        );
    }

    return (
        <div className='flex justify-center items-center content-center gap-5 px-4 flex-wrap pt-32'>
            {items.map(item => {
                return (
                    <div key={item.id} className="font-sef px-4 shadow-md mt-4 border-2 rounded-2xl h-[400px] cursor-pointer hover:shadow-2xl">
                        <div className="my-2 relative flex justify-center items-center content-center ">
                            <img src={item.images[0]} alt="item image" className="w-60 h-60 rounded" />
                            <div className="my-1 absolute left-2 bottom-0 z-40 text-sm font-thin flex content-center items-center gap-1 bg-blue-gray-50 px-2 py-1 rounded ">
                                {item.rating} <CiStar className="text-xl text-yellow-900" /> | {item.stock}
                            </div>
                        </div>
                        <div className="block gap-5 my-1 px-1">
                            <p className="text-xl font-semibold"> {item.brand}</p>
                            <p className="text-gray-400 text-sm font-thin">{item.title}</p>
                        </div>
                        <div className="flex gap-5 my-1 px-1">
                            <span>RS {item.price}</span>
                            <span className="text-gray-400 text-sm font-thin line-through">
                                RS {(item.price + item.price * (item.discountPercentage / 100)).toFixed(2)}
                            </span>
                            <span className="text-pink-400 text-sm font-thin">
                                ({item.discountPercentage}% OFF)
                            </span>
                        </div>
                        <div className="my-4 w-8/12">
                            {elementFound ? (
                                <button
                                    className="bg-red-400 w-full rounded text-white py-1 h-8 flex justify-center content-center items-center gap-2"
                                    onClick={() => handleRemove(item.id)} // Pass item.id to handleRemove
                                >
                                    <IoBagRemoveSharp className="text-2xl" />
                                    Remove Item
                                </button>
                            ) : (
                                <button
                                    className="bg-green-400 w-full h-8 py-1 rounded text-white flex justify-center content-center items-center gap-2"
                                    onClick={() => handleAddToBag(item.id)} // Pass item.id to handleAddToBag
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
    );
};

export default ShowCategoryWise;
