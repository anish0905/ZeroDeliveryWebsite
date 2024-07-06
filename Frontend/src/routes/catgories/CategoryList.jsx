import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { API_URI } from "../../Contants";

export function CategoryList() {
  const [categories, setCategories] = useState([]);
  const [brands, setBrands] = useState([]);

  const fetchData = async () => {
    try {
      const resp = await axios.get(`${API_URI}/api/categories`);

      setCategories(resp.data); // Assuming resp.data is an array of category names
    } catch (error) {
      console.log("Error fetching categories:", error);
    }
  };

  const fetchBrands = async () => {
    try {
      const resp = await axios.get(`${API_URI}/api/product/brands`);
      setBrands(resp.data);
    } catch (error) {
      console.log("Error fetching brands:", error);
    }
  };



  useEffect(() => {
    fetchData();
    fetchBrands();
  }, []);

  return (
    <div className="lg:min-w-52 lg:h-screen md:h-screen md:w-40 z-40 lg:mt-10 md:mt-10 w-full fixed md:fixed py-4 lg:left-5 top-20 lg:bg-gray-100 md:bg-blue-gray-100 bg-gray-200 shadow-md lg:rounded-lg md:rounded-lg overflow-y-auto my-4 ">
      <h1 className="text-center font-bold text-xl lg:block md:block hidden my-4 ">Categories</h1>
      <div className=" lg:block md:block flex justify-evenly items-center content-center px-2 ">
        {categories.map((category, index) => (
          <Link
            to={`/showCategory/${category}`}
            key={index}
            className="lg:block md:block block px-4 py-1 mb-1 lg:text-base lg:font-thin   text-lg  md:font-medium  font-semibold text-gray-900 hover:bg-gray-800 hover:text-gray-100 rounded-md transition duration-300"
          >
            {category.charAt(0).toUpperCase() + category.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>
      <h1 className="text-center font-bold text-xl lg:block md:block hidden my-4">Brand</h1>
      <div className=" lg:block md:block flex justify-evenly items-center content-center px-2 ">
        {brands.map((brand, index) => (
          <Link
            to={`/showCategory/${brand}`}
            key={index}
            className="lg:block md:block block px-4 py-1 mb-1 lg:text-base lg:font-thin   text-lg  md:font-medium  font-semibold text-gray-900 hover:bg-gray-800 hover:text-gray-100 rounded-md transition duration-300"
          >
            {brand.charAt(0).toUpperCase() + brand.slice(1).toLowerCase()}
          </Link>
        ))}
      </div>
      
    </div>
  );
}
