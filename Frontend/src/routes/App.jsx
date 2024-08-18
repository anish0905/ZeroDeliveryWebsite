import React from 'react';
import { useLocation } from 'react-router-dom';
import NavBar1 from '../Component/NavBar/NavBar1';
import Footer from '../Component/Footer';
import ScrollButton from '../Component/scrollToTop';
import FetchItem from '../Component/FetchItem';
import LoadingSpinner from '../Component/LoadingSpinner';
import { Outlet } from 'react-router-dom';
import { useSelector } from 'react-redux';

import '../App.css';


const App = () => {
  const fetchStatus = useSelector(state => state.fetchStatus);
  const location = useLocation();
  const { pathname } = location;

  // Condition to determine when to hide the footer
  const showFooter = !(
    pathname === '/Bag' ||
    pathname === '/payment' ||
    pathname === '/addressForm'||
    pathname.startsWith('/showCategory/')
    
    
  );

  const showNavBar = pathname !== '/';

  return (
    <div>
       {showNavBar && <NavBar1 />}
      <FetchItem />
      {fetchStatus.currentlyFetching ? (
        <LoadingSpinner />
      ) : (
        <Outlet />
      )}
      {showFooter && <Footer />}
      <ScrollButton />
    </div>
  );
};

export default App;
