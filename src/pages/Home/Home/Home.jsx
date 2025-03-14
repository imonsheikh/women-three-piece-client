import React from 'react';
import Banner from '../Banner/Banner.jsx';
import ShopByCategories from '../ShopByCategories/ShopByCategories.jsx';
import TopProducts from '../TopProducts/TopProducts.jsx';
import Poster from '../Poster/Poster.jsx';

const Home = () => {
    return (
        <div> 
            <Banner></Banner> 
            <Poster></Poster>
            <ShopByCategories></ShopByCategories> 
            <TopProducts></TopProducts>
        </div>
    );
};

export default Home;