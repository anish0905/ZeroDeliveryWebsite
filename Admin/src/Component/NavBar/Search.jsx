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
  const [searchResults, setSearchResults] = useState([]);

  const handleOpen = () => setOpen(!open);

  const handleSearch = async (event) => {
    setSearchTerm(event.target.value);
    if (event.target.value.length > 2) {
      try {
        const response = await axios.get(`http://localhost:5001/api/products/search/${event.target.value}`);
        setSearchResults(response.data);
      } catch (error) {
        console.error("Error fetching search results:", error);
      }
    } else {
      setSearchResults([]);
    }
  };

  return (
    <>
      <Button onClick={handleOpen} className="lg:hidden md:block hidden">
        <IoSearch className="text-2xl lg:absolute lg:left-3 lg:top-2 text-gray-500"/>
      </Button>
      <Dialog open={open} size="xs" handler={handleOpen}>
        <DialogHeader>Search Products</DialogHeader>
        <DialogBody>
          <div className="grid gap-6">
            <Input
              label="Search"
              type="search"
              value={searchTerm}
              onChange={handleSearch}
            />
            <div className="max-h-64 overflow-auto">
              {searchResults.length > 0 ? (
                <ul>
                  {searchResults.map((result, index) => (
                    <li key={index} className="px-4 py-2 hover:bg-gray-200">
                      {result.title} {/* Adjust based on your API response */}
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
