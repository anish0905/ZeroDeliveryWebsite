import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Sidebar from '../routes/admin/Sidebar';
import { API_URI } from "../Contants";

const AddBanner = () => {

  const [openBannerModules, setBannerModule] = useState(false);
  const [selectedFiles, setSelectedFile] = useState(null);
  const [banners, setBanners] = useState([]);
  const [selectBannerId, setSelectedBannerId] = useState(null); // Initialize as null
  const [isUploading, setIsUploading] = useState(false);

  const handleUpload = async (method) => {
    console.log(method);
    
    if (!selectedFiles) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFiles);

    try {
      setIsUploading(true); // Disable buttons while uploading

      if (method === "upload") {
        await axios.post(`${API_URI}/api/admin/banners/uploads`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      } else if (method === "update") {
        await axios.put(`${API_URI}/api/admin/banners/${selectBannerId}`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
      }

      console.log('Banner uploaded successfully');
      setBannerModule(false);
      setSelectedFile(null); // Clear the selected file after upload
      fetchBanners();
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Error uploading banner. Please try again.');
    } finally {
      setIsUploading(false); // Re-enable buttons
    }
  };

  const fetchBanners = async () => {
    try {
      const response = await axios.get(`${API_URI}/api/admin/banners`);
      setBanners(response.data);
    } catch (error) {
      console.error('Error fetching banners:', error);
      alert('Error fetching banners. Please try again.');
    }
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  const handleDelete = async (bannerId) => {
    if (!window.confirm("Are you sure you want to delete this banner?")) return;

    try {
      await axios.delete(`${API_URI}/api/admin/banners/${bannerId}`);
      console.log('Banner deleted successfully');
      fetchBanners();  // Refresh the banners list after deletion
    } catch (error) {
      console.error('Error deleting banner:', error);
      alert('Error deleting banner. Please try again.');
    }
  };

  const handleUpdate = (id) => {
    setSelectedBannerId(id);
    setBannerModule(true);
  };

  const handleCancel = () => {
    setBannerModule(false);
    setSelectedFile(null); // Clear file selection when canceling
    setSelectedBannerId(null); // Reset selected banner id on cancel
  };

  return (
    <>
      <div className="flex">
        <div className="lg:flex md:flex hidden justify-center items-center h-screen">
          <Sidebar />
        </div>
        <div className="flex-grow p-8">
          {/* Banner upload module */}
          {openBannerModules && (
            <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-75 z-50">
              <div className="bg-white p-6 rounded-lg shadow-lg">
                <h2 className="text-xl font-bold mb-4">{selectBannerId ? "Update Banner" : "Upload Banner"}</h2>
                <input type="file" className="mb-4" onChange={(e) => setSelectedFile(e.target.files[0])} />
                <div className="flex justify-end">
                  <button
                    className="bg-green-500 text-white py-2 px-4 rounded mr-2"
                    onClick={() => handleUpload(selectBannerId ? "update" : "upload")}
                    disabled={isUploading}
                  >
                    {isUploading ? "Uploading..." : selectBannerId ? "Update Banner" : "Upload Banner"}
                  </button>
                  <button className="bg-red-500 text-white py-2 px-4 rounded" onClick={handleCancel}>
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Banner Fetching module */}
          <div className="mt-24">
            <div className='flex justify-between'>
              <h2 className="text-2xl font-bold">Banners</h2>
              {/* Add Banner Button */}
              <button
                className='bg-blue-500 text-white py-2 px-4 rounded m-5'
                onClick={() => setBannerModule(!openBannerModules)}
              >
                Add Banner
              </button>
            </div>
            <div className='grid lg:grid-cols-3 md:grid-cols-3 grid-cols-1 gap-4'>
              {banners.map((banner, index) => (
                <div key={index} className='border p-4 rounded shadow'>
                  <img src={`${API_URI}/uploads/${banner.filename}`} alt="Banner" className="w-full h-auto mb-2" />
                  <div className='flex justify-between'>
                    <button className='bg-blue-500 text-white py-2 px-4 rounded' onClick={() => handleUpdate(banner._id)}>
                      Edit
                    </button>
                    <button className='bg-red-500 text-white py-2 px-4 rounded' onClick={() => handleDelete(banner._id)}>
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddBanner;
