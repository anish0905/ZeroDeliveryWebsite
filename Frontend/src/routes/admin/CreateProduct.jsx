import React, { useState } from "react";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: [],
    brand: "",
    sku: "",
    weight: "",
    dimensions: { width: "", height: "", length: "" },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    reviews: [],
    returnPolicy: "",
    minimumOrderQuantity: "",
    meta: {},
    images: [],
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData({
      ...formData,
      images: files,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would handle form submission, such as posting to an API
    console.log(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-2xl mx-auto p-4">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className="mt-4 lg:mt-0">
          <label htmlFor="title" className="block">
            Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="description" className="block">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="category" className="block">
            Category
          </label>
          <input
            type="text"
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="price" className="block">
            Price
          </label>
          <input
            type="number"
            id="price"
            name="price"
            value={formData.price}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="discountPercentage" className="block">
            Discount Percentage
          </label>
          <input
            type="number"
            id="discountPercentage"
            name="discountPercentage"
            value={formData.discountPercentage}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="rating" className="block">
            Rating
          </label>
          <input
            type="number"
            id="rating"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="stock" className="block">
            Stock
          </label>
          <input
            type="number"
            id="stock"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="tags" className="block">
            Tags (comma separated)
          </label>
          <input
            type="text"
            id="tags"
            name="tags"
            value={formData.tags.join(", ")}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(",").map((tag) => tag.trim()),
              })
            }
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="brand" className="block">
            Brand
          </label>
          <input
            type="text"
            id="brand"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="sku" className="block">
            SKU
          </label>
          <input
            type="text"
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="weight" className="block">
            Weight
          </label>
          <input
            type="number"
            id="weight"
            name="weight"
            value={formData.weight}
            onChange={handleChange}
            className="border p-2 w-full"
            required
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="dimensions" className="block">
            Dimensions (W x H x L)
          </label>
          <input
            type="text"
            id="dimensions"
            name="dimensions"
            value={`${formData.dimensions.width} x ${formData.dimensions.height} x ${formData.dimensions.length}`}
            onChange={(e) => {
              const [width, height, length] = e.target.value
                .split(" x ")
                .map((dim) => parseFloat(dim));
              setFormData({
                ...formData,
                dimensions: { width, height, length },
              });
            }}
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="warrantyInformation" className="block">
            Warranty Information
          </label>
          <input
            type="text"
            id="warrantyInformation"
            name="warrantyInformation"
            value={formData.warrantyInformation}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="shippingInformation" className="block">
            Shipping Information
          </label>
          <input
            type="text"
            id="shippingInformation"
            name="shippingInformation"
            value={formData.shippingInformation}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="availabilityStatus" className="block">
            Availability Status
          </label>
          <input
            type="text"
            id="availabilityStatus"
            name="availabilityStatus"
            value={formData.availabilityStatus}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="returnPolicy" className="block">
            Return Policy
          </label>
          <input
            type="text"
            id="returnPolicy"
            name="returnPolicy"
            value={formData.returnPolicy}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="minimumOrderQuantity" className="block">
            Minimum Order Quantity
          </label>
          <input
            type="number"
            id="minimumOrderQuantity"
            name="minimumOrderQuantity"
            value={formData.minimumOrderQuantity}
            onChange={handleChange}
            className="border p-2 w-full"
          />
        </div>

        <div className="mt-4 lg:mt-0">
          <label htmlFor="images" className="block">
            Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            onChange={handleImageChange}
            className="border p-2 w-full"
          />
        </div>
      </div>

      <button
        type="submit"
        className="bg-blue-500 text-white p-2 rounded w-full lg:w-auto mt-4"
      >
        Submit
      </button>
    </form>
  );
};

export default CreateProduct;
