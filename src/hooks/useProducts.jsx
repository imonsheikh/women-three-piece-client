import React from 'react';
import useAxiosPublic from './useAxiosPublic';
import { useQuery } from '@tanstack/react-query'; 

const useProducts = () => {  
    const axiosPublic = useAxiosPublic() 
    const {data: products = [], isLoading, refetch} = useQuery({
        queryKey: ['products'],
        queryFn: async () => {
            const res = await axiosPublic.get('/products')
            return res.data
        }
    })
   
    return [products, isLoading, refetch]
};

export default useProducts;