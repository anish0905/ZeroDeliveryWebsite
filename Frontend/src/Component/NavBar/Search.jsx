import React from "react";
import {
  Button,
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Input,
  Textarea,
  Typography
} from "@material-tailwind/react";
import { IoSearch } from "react-icons/io5";
 
export function Search() {
  const [open, setOpen] = React.useState(false);
 
  const handleOpen = () => setOpen(!open);
 
  return (
    <>
      <Button onClick={handleOpen} className="lg:hidden md:block hidden">
      <IoSearch className="text-2xl lg:absolute lg:left-3 lg:top-2 text-gray-500"/>
      </Button>
    <Dialog open={open} size="xs" handler={handleOpen}>
    
        <DialogBody>
         
          <div className="grid gap-6">
        
            <Input label="Search"  type="search"/>
          </div>
        </DialogBody>
        <DialogFooter className="space-x-2">
          <Button variant="text" color="gray" onClick={handleOpen}>
            cancel
          </Button>
          <Button variant="gradient" color="gray" onClick={handleOpen}>
            Search
          </Button>
        </DialogFooter>
      </Dialog>
    </>
  );
}