import React from 'react';
import Banner from '../Banner/Banner.jsx';
import ShopByCategories from '../ShopByCategories/ShopByCategories.jsx';
import Poster from '../Poster/Poster.jsx';
import LatestProducts from '../LatestProducts/LatestProducts.jsx';
import TopSellingProducts from '../TopSellingProducts/TopSellingProducts.jsx';

const Home = () => {
    return (
        <div> 
            <Banner></Banner> 
            <Poster></Poster>
            <ShopByCategories></ShopByCategories> 
            <LatestProducts></LatestProducts>
            <TopSellingProducts></TopSellingProducts>
        </div>
    );
};

export default Home;