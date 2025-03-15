import React from 'react';
import SectionTitle from './../../../components/SectionTitle/SectionTitle';
import ProductCard from './../../../components/ProductCard/ProductCard';

const LatestProducts = () => {
    return (
        <div>
            <SectionTitle heading={'Latest Products'}></SectionTitle> 
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
            </div>
        </div>
    );
};

export default LatestProducts;