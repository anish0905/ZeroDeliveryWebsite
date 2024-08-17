import React, { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
import UpdateProductModal from "./UpdateProductModal";
import Sidebar from "../Vendor/Sidebar";
import axios from "axios";
import { API_URI } from "../../Contants";
import Swal from "sweetalert2";

const ProductHome = () => {
  const [products, setProducts] = useState([]);
 
  
  const userId = localStorage.getItem("userId");


  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };



  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const fetchProducts = async () => {
    try {
      const response = await axios.get(`${API_URI}/api/vendor/products/${userId}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const data = response.data;
      setProducts(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);
  const handleUpdateProduct =async (updatedProduct) => {
   
    try {
      const resp = await axios.put(`${API_URI}/api/vendor/products/${updatedProduct._id}`,updatedProduct,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      );
      Swal.fire({
        icon: "success",
        title: "Product updated successfully",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
  
      
      fetchProducts()
      setIsModalOpen(false);
  
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Failed to update product",
        text: "Please try again.",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
     
    }
   };

  return (
    <div className='flex'>
      <div className="lg:block md:block hidden">
        <Sidebar />
      </div>
      <div className="mb-4 grid lg:grid-cols-4 md:grid-cols-2 grid-cols-1 gap-4">
        {products?.map((product) => (
          <React.Fragment key={product._id}>
            <ProductDetail product={product} onEditClick={() => handleEditClick(product)} setProducts={setProducts} />
            {isModalOpen && selectedProduct && selectedProduct._id === product._id && (
              <UpdateProductModal
                product={selectedProduct}
                onClose={handleCloseModal}
                onUpdate={handleUpdateProduct}
              />
            )}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ProductHome;
