import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic.jsx"; 

const useBanners = () => {  
    const axiosPublic = useAxiosPublic();
   
    const { data: banners = [], isLoading: bannersLoading, refetch } = useQuery({
        queryKey: ['banners'],
        queryFn: async () => {
            const res = await axiosPublic.get('/banners'); 
            return res.data;
        }
    });

    return [banners, bannersLoading, refetch];
};

export default useBanners;
