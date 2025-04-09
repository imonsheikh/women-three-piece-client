import React from 'react';
import SectionTitle from './../../../components/SectionTitle/SectionTitle';
import ProductCard from './../../../components/ProductCard/ProductCard';
import useProducts from '../../../hooks/useProducts.jsx';

const LatestProducts = () => {   
    const [products = [] ] = useProducts()
    return (
        <div>
            <div className='flex justify-center items-center relative'>
            <SectionTitle heading={'Latest Products'}></SectionTitle>
            <div className='btn md:btn-md btn-sm  bg-primary-c text-white absolute right-0'><button>View All</button></div>  
            </div>
              {/* Products Grid */}
              <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-2'>
                {products.map((product) => (
                    <ProductCard 
                    key={product._id}
                    product={product}
                    />
                ))}
            </div>
        </div>
    );
};

export default LatestProducts;