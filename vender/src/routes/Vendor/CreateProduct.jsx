import React, { useState } from "react";
import axios from "axios";
import { API_URI } from "../../Contants";
import Swal from "sweetalert2";
import Sidebar from "./Sidebar";
import { useNavigate } from "react-router-dom";

const CreateProduct = () => {
  const userId = localStorage.getItem("userId");
  const token = localStorage.getItem("token");
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    VendorUser: userId,
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
    thumbnail: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleImageChange = (e) => {
    setFormData({
      ...formData,
      images: e.target.files,
    });
  };

  const handleThumbnailChange = (e) => {
    setFormData({
      ...formData,
      thumbnail: e.target.files[0],
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const productData = new FormData();
    productData.append("VendorUser", formData.VendorUser);
    productData.append("title", formData.title);
    productData.append("description", formData.description);
    productData.append("category", formData.category);
    productData.append("price", formData.price);
    productData.append("discountPercentage", formData.discountPercentage);
    productData.append("rating", formData.rating);
    productData.append("stock", formData.stock);
    productData.append("tags", formData.tags.split(","));
    productData.append("brand", formData.brand);
    productData.append("sku", formData.sku);
    productData.append("weight", formData.weight);
    productData.append("dimensions", JSON.stringify(formData.dimensions));
    productData.append("warrantyInformation", formData.warrantyInformation);
    productData.append("shippingInformation", formData.shippingInformation);
    productData.append("availabilityStatus", formData.availabilityStatus);
    productData.append("returnPolicy", formData.returnPolicy);
    productData.append("minimumOrderQuantity", formData.minimumOrderQuantity);

    // Append images and thumbnail to the FormData
    Array.from(formData.images).forEach((file) => {
      productData.append("images", file);
    });

    if (formData.thumbnail) {
      productData.append("thumbnail", formData.thumbnail);
    }

    try {
      await axios.post(`${API_URI}/api/vendor/products`, productData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `Bearer ${token}`,
        },
      });
      Swal.fire({
        icon: "success",
        title: "Product created successfully",
        timer: 3000,
        timerProgressBar: true,
        showConfirmButton: false,
      });
      navigate("/products");
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
            <div className="flex gap-2">
              <input
                type="number"
                id="dimensions-width"
                name="dimensions-width"
                placeholder="Width"
                value={formData.dimensions.width}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: {
                      ...formData.dimensions,
                      width: e.target.value,
                    },
                  })
                }
                className="border p-2 w-full"
              />
              <input
                type="number"
                id="dimensions-height"
                name="dimensions-height"
                placeholder="Height"
                value={formData.dimensions.height}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: {
                      ...formData.dimensions,
                      height: e.target.value,
                    },
                  })
                }
                className="border p-2 w-full"
              />
              <input
                type="number"
                id="dimensions-depth"
                name="dimensions-depth"
                placeholder="Depth"
                value={formData.dimensions.depth}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    dimensions: {
                      ...formData.dimensions,
                      depth: e.target.value,
                    },
                  })
                }
                className="border p-2 w-full"
              />
            </div>
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
              onChange={handleImageChange}
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
              onChange={handleThumbnailChange}
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
