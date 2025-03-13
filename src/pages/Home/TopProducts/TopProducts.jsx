import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';
import ProductCard from '../../../components/ProductCard/ProductCard.jsx';

const TopProducts = () => {
    return (
        <div>
            <SectionTitle heading={'Top Products'}></SectionTitle>  
            <div className='flex gap-4'>
                <div className='border-b-4'><button>All</button></div>
                <div><button>kalam </button></div>
                <div><button>Kari</button></div>
                <div><button>pakistani</button></div>
                <div><button>jamdani</button></div>
                <div><button>Indian</button></div>
            </div>
            <div className='grid md:grid-cols-4 grid-cols-2'>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
                <ProductCard></ProductCard>
            </div> 
            <div className='text-center mx-auto w-xs flex border btn btn-primary'>See All Products</div>
        </div>
    );
};

export default TopProducts;