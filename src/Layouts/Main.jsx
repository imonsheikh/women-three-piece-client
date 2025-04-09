import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from '../Shared/Navbar/Navbar.jsx';
import Footer from '../Shared/Footer/Footer.jsx';
import { Tooltip } from 'react-tooltip'
import useAuth from '../hooks/useAuth.jsx';
import Loading from './../components/Loading/Loading';

const Main = () => {  

  const {loading} = useAuth()
  
  if(loading){
    return <Loading></Loading>
  }

    return (
      <div className=''>
          <div className='lg:max-w-9/12 mx-auto flex flex-col min-h-screen'> 
            <Navbar></Navbar> 
            <div className='flex-grow'>
            <Outlet></Outlet>
            </div>
            <Footer></Footer>
            <Tooltip id='my-tooltip' className='z-10'></Tooltip>
        </div>
      </div>
    );
};

export default Main;