import React from 'react';
import useAxiosPublic from './useAxiosPublic.jsx';
import { useQuery } from '@tanstack/react-query';

const useSubCategories = () => {
   const axiosPublic = useAxiosPublic() 

   const {data:subCategories = [], isLoading: subCategoriesLoading, refetch} = useQuery({
        queryKey: ['subCategories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/subCategories') 
            return res.data
        } 
   }) 

    return [subCategories, subCategoriesLoading, refetch] 
};

export default useSubCategories;