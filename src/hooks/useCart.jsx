import React from 'react';
import useAxiosSecure from './useAxiosSecure.jsx';
import useAuth from './useAuth.jsx';
import { useQuery } from '@tanstack/react-query';

const useCart = () => {
    const axiosSecure = useAxiosSecure() 
    const {user} = useAuth()  
    const {data: carts = [], refetch} = useQuery({
      queryKey: ["carts", user?.email],
      queryFn: async () => {
        const res = await axiosSecure.get(`/carts?email=${user?.email}`)
        return res.data 
      }
    })
    
    return [carts, refetch] 
};

export default useCart;