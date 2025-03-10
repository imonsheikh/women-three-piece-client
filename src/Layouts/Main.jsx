import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar.jsx';
import Footer from '../Shared/Footer/Footer.jsx';

const Main = () => {
    return (
        <div>
            <Navbar></Navbar> 
            <Outlet></Outlet>
            <Footer></Footer>
        </div>
    );
};

export default Main;