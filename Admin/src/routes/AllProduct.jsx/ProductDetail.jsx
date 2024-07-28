import React from 'react';
import { API_URI } from '../../Contants';
import Swal from 'sweetalert2';
import axios from 'axios';

const ProductDetail = ({ product, onEditClick ,setProducts }) => {
 
  if (!product) return <div>No product selected</div>;

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: 'Are you sure?',
      text: "You won't be able to revert this!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, delete it!',
      cancelButtonText: 'No, cancel!',
    });
  
    if (result.isConfirmed) {
      try {
       const resp = await axios.delete(`${API_URI}/api/vendor/products/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        Swal.fire({
          title: 'Deleted!',
          text: 'Product has been deleted.',
          icon: 'success',
          confirmButtonText: 'Close',
        });
        // Optionally, update the products list
       setProducts(resp.data);
        setIsModalOpen(false);
      } catch (error) {
        console.error('Error deleting product:', error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to delete product.',
          icon: 'error',
          confirmButtonText: 'Close',
        });
      }
    }
  };
  

  return (
    <div className="container mx-auto p-4 pt-24 w-full">
      <div className="flex flex-col border rounded shadow-lg p-4 space-y-4 md:space-y-0 md:space-x-4">
       <div>
       <img
          src={product.thumbnail}
          alt={product.title}
          className="w-full  h-64 object-cover rounded"
        />
       </div>
       <h2 className="text-2xl font-bold mb-2">{product.title}</h2>
          <p className="text-gray-700 my-4">{product.description}</p>
        <div className="grid grid-cols-2 gap-2">
          
          <div className="">
            <span className="text-gray-900 font-semibold">Category:</span> {product.category}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Price:</span> ${product?.price?.toFixed(2)}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Discount:</span> {product.discountPercentage}%
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Rating:</span> {product.rating}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Stock:</span> {product.stock}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Brand:</span> {product.brand}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">SKU:</span> {product.sku}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Weight:</span> {product.weight} kg
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Dimensions:</span> {product.dimensions.width} x {product.dimensions.height} x {product.dimensions.depth} cm
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Warranty:</span> {product.warrantyInformation}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Shipping:</span> {product.shippingInformation}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Return Policy:</span> {product.returnPolicy}
          </div>
          <div className="">
            <span className="text-gray-900 font-semibold">Minimum Order Quantity:</span> {product.minimumOrderQuantity}
          </div>
          
        </div>
        
        <div className='flex items-center justify-between gap-5'>
        <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onEditClick}
          >
            Edit Product
          </button>
          <button
            className="mt-4 px-4 py-2 bg-red-500 text-white rounded hover:bg-red-700"
            onClick={()=>handleDelete(product._id)}
          >
           delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
