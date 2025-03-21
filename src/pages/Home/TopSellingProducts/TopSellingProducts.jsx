import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';
import ProductCard from '../../../components/ProductCard/ProductCard.jsx';

const TopSellingProducts = () => {
    return (
        <div>
        <div className='flex justify-center items-center relative'>
        <SectionTitle heading={'Top Selling Products'}></SectionTitle>
        <div className='btn md:btn-md btn-sm bg-primary-c text-white absolute right-0'><button>View All</button></div>  
        </div>
          {/* Products Grid */}
          <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
            {[...Array(8)].map((_, index) => (
                <ProductCard key={index} />
            ))}
        </div>
    </div>
    );
};

export default TopSellingProducts;