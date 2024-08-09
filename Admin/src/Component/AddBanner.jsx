import React, { useState } from 'react';
import axios from 'axios';

const AddBanner = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [bannerUrl, setBannerUrl] = useState('');

  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) {
      alert('Please select a file first!');
      return;
    }

    const formData = new FormData();
    formData.append('images', selectedFile);

    try {
      const response = await axios.post('http://localhost:5001/api/admin/banners', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      const fileId = response.data.fileId;
      setBannerUrl(`http://localhost:5001/api/admin/banners/${fileId}`);
      alert('Banner uploaded successfully!');
    } catch (error) {
      console.error('Error uploading banner:', error);
      alert('Error uploading banner. Please try again.');
    }
  };

  return (
    <div className="mt-24">
      <input type="file" onChange={handleFileChange} className="mb-4" />
      <button onClick={handleUpload} className="bg-blue-500 text-white py-2 px-4 rounded">
        Upload Banner
      </button>
      {bannerUrl && (
        <div className="mt-4">
          <img src={bannerUrl} alt="Uploaded Banner" className="max-w-full h-auto" />
          <p>Banner URL: <a href={bannerUrl} target="_blank" rel="noopener noreferrer">{bannerUrl}</a></p>
        </div>
      )}
    </div>
  );
};

export default AddBanner;
