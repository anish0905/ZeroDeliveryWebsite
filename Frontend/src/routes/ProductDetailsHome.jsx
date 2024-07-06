import React, { useEffect, useState } from 'react'
import ProductDetils from './ProductDetils'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { API_URI } from '../Contants'
import ShowCategoryWise from './catgories/ShowCategoryWise'

const ProductDetailsHome = () => {
    const {id} = useParams()
    const [loading, setLoading] = useState(true);
    const [item, setItem] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const resp = await axios.get(`${API_URI}/api/products/${id}`);
                setItem(resp.data);
                setLoading(false); // Set loading to false when data is fetched
                console.log(resp.data); // Log the fetched data instead of the state
            } catch (error) {
                console.log("error", error);
                setLoading(false); // Set loading to false on error
            }
        };

        fetchData();
    }, [id]);

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="loader ease-linear rounded-full border-8 border-t-8 border-gray-200 h-24 w-24"></div>
            </div>
        );
    }

  return (
    <div className='py-20'>
      <ProductDetils item={item}/>
      <ShowCategoryWise name={item.category}/>
    </div>
  )
}

export default ProductDetailsHome
