import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar.jsx';
import Footer from '../Shared/Footer/Footer.jsx';
import { Tooltip } from 'react-tooltip'

const Main = () => {
    return (
      <div>
          <div className='lg:max-w-9/12 md:w-11/12 w-full mx-auto'> 
            <Tooltip id='my-tooltip' className='z-10'></Tooltip>
            <Navbar></Navbar> 
            <Outlet></Outlet>
        </div>
            <Footer></Footer>
      </div>
    );
};

export default Main;