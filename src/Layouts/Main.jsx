import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar.jsx';
import Footer from '../Shared/Footer/Footer.jsx';
import { Tooltip } from 'react-tooltip'

const Main = () => {
    return (
      <div className=''>
          <div className='lg:max-w-9/12 mx-auto'> 
            <Tooltip id='my-tooltip' className='z-10'></Tooltip>
            <Navbar></Navbar> 
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
      </div>
    );
};

export default Main;