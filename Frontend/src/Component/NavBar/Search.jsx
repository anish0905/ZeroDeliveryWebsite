import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Typography
} from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";

export function Search() {
  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [brand, setBrand] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const handleOpen = () => setOpen(!open);

  const handleSearch = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/products/search");
      const products = response.data;

      // Apply filters directly in the frontend
      const filteredResults = products.filter(product => {
        const matchesTitle = searchTerm ? product.title.toLowerCase().includes(searchTerm.toLowerCase()) : true;
        const matchesCategory = category ? product.category.toLowerCase().includes(category.toLowerCase()) : true;
        const matchesBrand = brand ? product.brand.toLowerCase().includes(brand.toLowerCase()) : true;

        return matchesTitle && matchesCategory && matchesBrand;
      });

      setSearchResults(filteredResults);
    } catch (error) {
      console.error("Error fetching search results:", error);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="lg:hidden md:block hidden">
        <IoSearch className="text-2xl lg:absolute lg:left-3 lg:top-2 text-gray-500" />
      </Button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Search Products</DialogHeader>
        <DialogBody>
          <div className="grid gap-6">
            <Input
              label="Search by Title"
              type="search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <Input
              label="Filter by Category"
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
            />
            <Input
              label="Filter by Brand"
              type="text"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
            />
            <Button onClick={handleSearch} color="blue">
              Search
            </Button>
            <div className="max-h-64 overflow-auto">
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-gray-200">
                      <div className="flex items-center">
                        <img
                          src={result.thumbnail}
                          alt={result.title}
                          className="w-12 h-12 object-cover mr-4"
                        />
                        <div>
                          <Typography variant="h6" className="font-bold">
                            {result.title}
                          </Typography>
                          <Typography className="text-sm text-gray-600">
                            {result.category} | {result.brand} | ${result.price}
                          </Typography>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              ) : (
                <Typography>No results found</Typography>
              )}
            </div>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            Cancel
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}
