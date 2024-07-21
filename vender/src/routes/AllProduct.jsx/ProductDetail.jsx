import React from 'react';

const ProductDetail = ({ product, onEditClick }) => {
  if (!product) return <div>No product selected</div>;

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
            <span className="text-gray-900 font-semibold">Price:</span> ${product.price.toFixed(2)}
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
        
        <button
            className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700"
            onClick={onEditClick}
          >
            Edit Product
          </button>
      </div>
    </div>
  );
};

export default ProductDetail;
