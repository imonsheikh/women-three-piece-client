import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar.jsx';
import Footer from '../Shared/Footer/Footer.jsx';

const Main = () => {
    return (
        <div className='lg:max-w-9/12 w-full mx-auto'>
            <Navbar></Navbar> 
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;