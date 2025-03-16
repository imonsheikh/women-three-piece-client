import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';
import ProductCard from '../../../components/ProductCard/ProductCard.jsx';

const TopSellingProducts = () => {
    return (
        <div>
            <SectionTitle heading={'Top Selling Products'}></SectionTitle> 
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </div>
        </div>
    );
};

export default TopSellingProducts;