import React from 'react';
import Banner from '../Banner/Banner.jsx';
import ShopByCategories from '../ShopByCategories/ShopByCategories.jsx';
import Poster from '../Poster/Poster.jsx';
import LatestProducts from '../LatestProducts/LatestProducts.jsx';
import TopSellingProducts from '../TopSellingProducts/TopSellingProducts.jsx';
import CustomerReview from '../CustomerReview/CustomerReview.jsx';
import GetInTouch from '../GetInTouch/GetInTouch.jsx';
import LogoMarque from '../LogoMarque/LogoMarque.jsx';
import Categories from '../../Categories/Categories.jsx';

const Home = () => {
    return (
        <div> 
            <Banner></Banner> 
            <Poster></Poster>
            <ShopByCategories></ShopByCategories> 
            <LatestProducts></LatestProducts>
            <TopSellingProducts></TopSellingProducts>
            <CustomerReview></CustomerReview> 
            {/* <GetInTouch></GetInTouch> */}
            <LogoMarque></LogoMarque>
        </div>
    );
};

export default Home;