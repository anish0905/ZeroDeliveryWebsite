import React, { useState, useEffect } from "react";
import axios from "axios";
import { API_URI } from "../../Contants";
import Sidebar from "../admin/Sidebar";
import { Link } from "react-router-dom";
import Register from "./Register";

const PAGE_SIZE = 10;

const VendorDetails = () => {
  const [vendorDetails, setVendorDetails] = useState([]);
  const [filteredVendorDetails, setFilteredVendorDetails] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [sortKey, setSortKey] = useState("name"); // Default sort by name
  const [sortOrder, setSortOrder] = useState("asc"); // Default ascending order

  useEffect(() => {
    const fetchVendorDetails = async () => {
      try {
        const response = await axios.get(`${API_URI}/api/vendor/vendor-details`);
        setVendorDetails(response.data.data);
        setFilteredVendorDetails(response.data.data);
      } catch (error) {
        console.error("Error fetching vendor details:", error);
        setError("Failed to load vendor details");
      } finally {
        setLoading(false);
      }
    };

    fetchVendorDetails();
  }, []);

  useEffect(() => {
    const filtered = vendorDetails.filter((vendor) =>
      vendor?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      vendor?.email?.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Sorting logic
    const sorted = filtered.sort((a, b) => {
      const valueA = a[sortKey]?.toLowerCase();
      const valueB = b[sortKey]?.toLowerCase();
      if (valueA < valueB) return sortOrder === "asc" ? -1 : 1;
      if (valueA > valueB) return sortOrder === "asc" ? 1 : -1;
      return 0;
    });

    setFilteredVendorDetails(sorted);
    setCurrentPage(1); // Reset to first page on search
  }, [searchTerm, vendorDetails, sortKey, sortOrder]);

  const handleRegister = () => {
    setShowRegisterModal(true);
  };

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleSortChange = (e) => {
    const [key, order] = e.target.value.split("_");
    setSortKey(key);
    setSortOrder(order);
  };

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  if (!filteredVendorDetails.length) {
    return <div>No vendor details available</div>;
  }

  const startIndex = (currentPage - 1) * PAGE_SIZE;
  const endIndex = startIndex + PAGE_SIZE;
  const paginatedVendors = filteredVendorDetails.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredVendorDetails.length / PAGE_SIZE);

  return (
    <div className="flex">
      <div className="lg:flex md:flex hidden justify-center items-center h-screen">
        <Sidebar />
      </div>
      <div className="container mx-auto p-4 mt-20">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold mb-4 text-center">Vendor Details</h1>
          <button
            className="bg-green-400 text-white font-bold p-2 shadow-md rounded-md"
            onClick={handleRegister}
          >
            Register
          </button>
        </div>
        <div className="flex flex-wrap items-center content-center justify-between">
          <div className="mb-4 w-9/12">
            <input
              type="text"
              placeholder="Search by name or email"
              className="w-full px-3 py-2  rounded border-2 border-black "
              value={searchTerm}
              onChange={handleSearchChange}
            />
          </div>
          <div className="mb-4 w-1/5">
            <select
              onChange={handleSortChange}
              className="w-full px-3 py-2 border-2 border-blue-400 bg-blue-400 text-white rounded"
            >
              <option value="name_asc">Sort by Name (Asc)</option>
              <option value="name_desc">Sort by Name (Desc)</option>
              <option value="email_asc">Sort by Email (Asc)</option>
              <option value="email_desc">Sort by Email (Desc)</option>
            </select>
          </div>
        </div>
        <p className="text-gray-600">Total Vendors: {filteredVendorDetails.length}</p>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white border border-gray-200 rounded-lg shadow-lg">
            <thead className="bg-gray-800 text-white">
              <tr>
                <th className="py-3 px-4 border">Name</th>
                <th className="py-3 px-4 border">Email</th>
                <th className="py-3 px-4 border">Mobile</th>
                <th className="py-3 px-4 border">Address</th>
                <th className="py-3 px-4 border">Verified</th>
                <th className="py-3 px-4 border">Order</th>
              </tr>
            </thead>
            <tbody>
              {paginatedVendors.map((vendor) => (
                <tr key={vendor._id} className="odd:bg-gray-100 even:bg-gray-50">
                  <td className="py-2 px-4 border">{vendor.name}</td>
                  <td className="py-2 px-4 border">{vendor.email}</td>
                  <td className="py-2 px-4 border">{vendor.mobile}</td>
                  <td className="py-2 px-4 border">
                    {vendor.address} - {vendor.pincode}
                  </td>
                  <td className="py-2 px-4 border">{vendor.isVerified ? "Yes" : "No"}</td>
                  <td className="py-2 px-4 border">
                    <Link to={`/order/${vendor._id}`}>View</Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="flex justify-between mt-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Page {currentPage} of {totalPages}
          </span>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-md"
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </div>
      {showRegisterModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-800 bg-opacity-50">
          <Register onClose={() => setShowRegisterModal(false)} className="w-full" />
        </div>
      )}
    </div>
  );
};

export default VendorDetails;
