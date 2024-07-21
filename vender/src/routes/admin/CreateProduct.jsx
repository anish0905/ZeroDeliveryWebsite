import React, { useState } from "react";
import axios from "axios";
import { API_URI } from "../../Contants";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";

const CreateProduct = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    category: "",
    price: "",
    discountPercentage: "",
    rating: "",
    stock: "",
    tags: "",
    brand: "",
    sku: "",
    weight: "",
    dimensions: { width: "", height: "", depth: "" },
    warrantyInformation: "",
    shippingInformation: "",
    availabilityStatus: "",
    returnPolicy: "",
    minimumOrderQuantity: "",
    images: [],
    thumbnail: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = async (e, fieldName) => {
    const files = Array.from(e.target.files);
    const base64Images = await Promise.all(
      files.map((file) => convertToBase64(file))
    );
    setFormData({
      ...formData,
      [fieldName]: base64Images,
    });
  };
  const handleThumbnailChange = async (e, fieldName) => {
    const file = e.target.files[0];
    const base64Thumbnail = await convertToBase64(file);
    setFormData({
      ...formData,
      thumbnail: base64Thumbnail,
    });
  };

  const convertToBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const { tags, dimensions, ...rest } = formData;
    const productData = {
      ...rest,
      tags: tags.split(",").map((tag) => tag.trim()),
      dimensions: {
        width: parseFloat(dimensions.width),
        height: parseFloat(dimensions.height),
        depth: parseFloat(dimensions.depth),
      },
    };

    try {
      await axios.post(`${API_URI}/api/products`, productData);
      Swal.fire({
        icon: "success",
        title: "Product created successfully",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    } catch (error) {
      console.error("Error creating product:", error.message);
      Swal.fire({
        icon: "error",
        title: "Something went wrong while creating the product",
        text: `${error.message}`,
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
    }
  };

  return (
    <div className="flex">
      <div>
        <div className="lg:block md:block hidden">
          <Sidebar />
        </div>
      </div>
      <form
        onSubmit={handleSubmit}
        className="space-y-4 max-w-7xl mx-auto p-4 px-10 w-full pt-20"
      >
        <h1 className="bg-gray-800 text-white px-10 p-4 my-4 mb-10">
          Add Product
        </h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          {/* Form fields here */}
          {[
            "title",
            "description",
            "category",
            "price",
            "discountPercentage",
            "rating",
            "stock",
            "brand",
            "sku",
            "weight",
            "warrantyInformation",
            "shippingInformation",
            "availabilityStatus",
            "returnPolicy",
            "minimumOrderQuantity",
          ].map((field) => (
            <div key={field}>
              <label htmlFor={field} className="block capitalize">
                {field.replace(/([A-Z])/g, " $1")}
              </label>
              <input
                type={
                  field === "price" ||
                  field === "discountPercentage" ||
                  field === "rating" ||
                  field === "stock" ||
                  field === "weight" ||
                  field === "minimumOrderQuantity"
                    ? "number"
                    : "text"
                }
                id={field}
                name={field}
                value={formData[field]}
                onChange={handleChange}
                className="border p-2 w-full"
                required={
                  field !== "discountPercentage" &&
                  field !== "warrantyInformation"
                }
              />
            </div>
          ))}
          <div>
            <label htmlFor="tags" className="block">
              Tags (comma separated)
            </label>
            <input
              type="text"
              id="tags"
              name="tags"
              value={formData.tags}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="dimensions" className="block">
              Dimensions (W x H x D)
            </label>
            <input
              type="text"
              id="dimensions"
              name="dimensions"
              value={`${formData.dimensions.width} x ${formData.dimensions.height} x ${formData.dimensions.depth}`}
              onChange={handleChange}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="images" className="block">
              Images
            </label>
            <input
              type="file"
              id="images"
              name="images"
              multiple
              onChange={(e) => handleImageChange(e, "images")}
              className="border p-2 w-full"
            />
          </div>
          <div>
            <label htmlFor="thumbnail" className="block">
              Thumbnail
            </label>
            <input
              type="file"
              id="thumbnail"
              name="thumbnail"
              onChange={(e) => handleThumbnailChange(e, "thumbnail")}
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
    </div>
  );
};

export default CreateProduct;
