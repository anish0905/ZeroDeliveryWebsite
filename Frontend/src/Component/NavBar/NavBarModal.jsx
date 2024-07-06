import React from "react";
import {
  Drawer,
  Button,
  Typography,
  IconButton,
} from "@material-tailwind/react";
import { IoReorderThree } from "react-icons/io5";
import NavBar2 from "./Navbar2";
 
export function NavBarModal() {
  const [open, setOpen] = React.useState(false);
 
  const openDrawer = () => setOpen(true);
  const closeDrawer = () => setOpen(false);
 
  return (
    <React.Fragment>
      <Button onClick={openDrawer} className="lg:hidden md:hidden block  px-2 py-1 shadow-none">
      <IoReorderThree className="text-5xl lg:hidden md:hidden float-end block text-black"/>
      </Button>
      <Drawer open={open} onClose={closeDrawer} className="p-4">
       <NavBar2/>
      </Drawer>
    </React.Fragment>
  );
}