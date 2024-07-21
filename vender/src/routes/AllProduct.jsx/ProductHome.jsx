import React, { useState } from "react";
import ProductDetail from "./ProductDetail";
import UpdateProductModal from "./UpdateProductModal";
import Sidebar from "../admin/Sidebar";

const ProductHome = () => {
  const [products, setProducts] = useState([
    {
      "_id": { "$oid": "668446e4b966a2dcacbde833" },
      "title": "Essence Mascara Lash Princess",
      "description": "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
      "category": "beauty",
      "price": 9.99,
      "discountPercentage": 7.17,
      "rating": 4.94,
      "stock": 5,
      "tags": [
        "beauty",
        "mascara"
      ],
      "brand": "Essence",
      "sku": "RCH45Q1A",
      "weight": 2,
      "dimensions": {
        "width": 23.17,
        "height": 14.43,
        "depth": 28.01
      },
      "warrantyInformation": "1 month warranty",
      "shippingInformation": "Ships in 5 days",
      "availabilityStatus": "Low Stock",
      "reviews": [
        {
          "rating": 2,
          "comment": "Very unhappy with my purchase!",
          "date": "2024-05-23T08:56:21.618Z",
          "reviewerName": "John Doe",
          "reviewerEmail": "john.doe@x.dummyjson.com"
        },
        {
          "rating": 2,
          "comment": "Not as described!",
          "date": "2024-05-23T08:56:21.618Z",
          "reviewerName": "Nolan Gonzalez",
          "reviewerEmail": "nolan.gonzalez@x.dummyjson.com"
        },
        {
          "rating": 5,
          "comment": "Very satisfied!",
          "date": "2024-05-23T08:56:21.618Z",
          "reviewerName": "Scarlett Wright",
          "reviewerEmail": "scarlett.wright@x.dummyjson.com"
        }
      ],
      "returnPolicy": "30 days return policy",
      "minimumOrderQuantity": 24,
      "meta": {
        "createdAt": "2024-05-23T08:56:21.618Z",
        "updatedAt": "2024-05-23T08:56:21.618Z",
        "barcode": "9164035109868",
        "qrCode": "https://cdn.dummyjson.com/public/qr-code.png"
      },
      "images": [
        "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/1.png"
      ],
      "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Essence%20Mascara%20Lash%20Princess/thumbnail.png"
    },{
        "_id": {
          "$oid": "66844713b966a2dcacbde83a"
        },
        "title": "Eyeshadow Palette with Mirror",
        "description": "The Eyeshadow Palette with Mirror offers a versatile range of eyeshadow shades for creating stunning eye looks. With a built-in mirror, it's convenient for on-the-go makeup application.",
        "category": "beauty",
        "price": 19.99,
        "discountPercentage": 5.5,
        "rating": 3.28,
        "stock": 44,
        "tags": [
          "beauty",
          "eyeshadow"
        ],
        "brand": "Glamour Beauty",
        "sku": "MVCFH27F",
        "weight": 3,
        "dimensions": {
          "width": 12.42,
          "height": 8.63,
          "depth": 29.13,
          "_id": {
            "$oid": "66844713b966a2dcacbde83b"
          }
        },
        "warrantyInformation": "1 year warranty",
        "shippingInformation": "Ships in 2 weeks",
        "availabilityStatus": "In Stock",
        "reviews": [
          {
            "rating": 4,
            "comment": "Very satisfied!",
            "date": {
              "$date": "2024-05-23T08:56:21.618Z"
            },
            "reviewerName": "Liam Garcia",
            "reviewerEmail": "liam.garcia@x.dummyjson.com",
            "_id": {
              "$oid": "66844713b966a2dcacbde83c"
            }
          },
          {
            "rating": 1,
            "comment": "Very disappointed!",
            "date": {
              "$date": "2024-05-23T08:56:21.618Z"
            },
            "reviewerName": "Nora Russell",
            "reviewerEmail": "nora.russell@x.dummyjson.com",
            "_id": {
              "$oid": "66844713b966a2dcacbde83d"
            }
          },
          {
            "rating": 5,
            "comment": "Highly impressed!",
            "date": {
              "$date": "2024-05-23T08:56:21.618Z"
            },
            "reviewerName": "Elena Baker",
            "reviewerEmail": "elena.baker@x.dummyjson.com",
            "_id": {
              "$oid": "66844713b966a2dcacbde83e"
            }
          }
        ],
        "returnPolicy": "30 days return policy",
        "minimumOrderQuantity": 32,
        "meta": {
          "createdAt": {
            "$date": "2024-05-23T08:56:21.618Z"
          },
          "updatedAt": {
            "$date": "2024-05-23T08:56:21.618Z"
          },
          "barcode": "2817839095220",
          "qrCode": "https://cdn.dummyjson.com/public/qr-code.png",
          "_id": {
            "$oid": "66844713b966a2dcacbde83f"
          }
        },
        "images": [
          "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/1.png"
        ],
        "thumbnail": "https://cdn.dummyjson.com/products/images/beauty/Eyeshadow%20Palette%20with%20Mirror/thumbnail.png",
        "__v": 0
      }
  ]);

  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = () => {
    setIsModalOpen(true);
  };

  const handleUpdateProduct = (updatedProduct) => {
    setProducts(products.map(p => p._id === updatedProduct._id ? updatedProduct : p));
    setIsModalOpen(false);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className='flex' >
     
      <div className="lg:block md:block hidden">
          <Sidebar />
        </div>
      <div className="mb-4 grid lg:grid-cols-2 md:grid-cols-2  grid-cols-1 gap-4">
        {products.length > 0 && (
          <>
            <ProductDetail product={products[0]} onEditClick={handleEditClick} />
            {isModalOpen && (
              <UpdateProductModal
                product={products[0]}
                onClose={handleCloseModal}
                onUpdate={handleUpdateProduct}
              />
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default ProductHome;
