import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URI } from "../../Contants";
import Sidebar from "../admin/Sidebar"

const VendorDetails = () => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(`${API_URI}/api/vendor/vendor-details`);
        setVendorDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        setError("Failed to load vendor details");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!vendorDetails.length) {
    return <div>No vendor details available</div>;
  }

  return (
    <div className="flex">
      <div className="flex justify-center items-center h-screen">
       <Sidebar/>
      </div>
      <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Vendor Details</h1>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
          <thead className="bg-gray-800 text-white">
            <tr>
              <th className="py-3 px-4 border">ID</th>
              <th className="py-3 px-4 border">Email</th>
              <th className="py-3 px-4 border">Mobile</th>
              <th className="py-3 px-4 border">Verified</th>
              
            </tr>
          </thead>
          <tbody>
            {vendorDetails.map((vendor) => (
              <tr key={vendor._id} className="odd:bg-gray-100 even:bg-gray-50">
                <td className="py-2 px-4 border">{vendor._id}</td>
                <td className="py-2 px-4 border">{vendor.email}</td>
                <td className="py-2 px-4 border">{vendor.mobile}</td>
                <td className="py-2 px-4 border">{vendor.isVerified ? "Yes" : "No"}</td>
               
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  );
};

export default VendorDetails;
