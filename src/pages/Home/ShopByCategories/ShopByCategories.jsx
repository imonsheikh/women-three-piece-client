import React from 'react';
import SectionTitle from '../../../components/SectionTitle/SectionTitle.jsx';

const ShopByCategories = () => {
    return (
        <div>
            <SectionTitle heading={'Shop By Categories'}></SectionTitle>
            <div className='grid lg:grid-cols-4 md:grid-cols-3 grid-cols-2 gap-3'>
              <div>
               <img className='rounded-t-2xl h-50 w-full object-cover brightness-50' src="https://www.smarteshopbd.com/wp-content/uploads/2025/03/DRS87.webp" alt="" />
               <h1 className='font-bold text-xl bg-primary-c rounded-b-4xl text-white text-center p-1'>Secuence</h1>
              </div>
              <div>
               <img className='rounded-t-2xl h-50 w-full object-cover brightness-50' src="https://www.smarteshopbd.com/wp-content/uploads/2025/03/DRS88.webp" alt="" />
               <h1 className='font-bold text-xl  bg-primary-c rounded-b-4xl text-white text-center p-1'> Ari embroidery</h1>
              </div>
              <div>
               <img className='rounded-t-2xl h-50 w-full object-cover brightness-50' src="https://www.smarteshopbd.com/wp-content/uploads/2025/03/DRS89.webp" alt="" />
               <h1 className='font-bold text-xl bg-primary-c rounded-b-4xl text-white text-center p-1'>Malhar</h1>
              </div>
              <div>
               <img className='rounded-t-2xl h-50 w-full object-cover brightness-50' src="https://www.smarteshopbd.com/wp-content/uploads/2025/03/DRS83.webp" alt="" />
               <h1 className='font-bold text-xl bg-primary-c rounded-b-4xl text-white text-center p-1'>Zom Zom</h1>
              </div>
            
            </div>
        </div>
    );
};

export default ShopByCategories;