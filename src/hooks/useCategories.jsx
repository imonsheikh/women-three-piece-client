import { useQuery } from "@tanstack/react-query";
import useAxiosPublic from "./useAxiosPublic.jsx"; 

const useCategories = () => {  
    const axiosPublic = useAxiosPublic() 
   
    const {data: categories = [], isLoading, refetch} = useQuery({
        queryKey: ['categories'],
        queryFn: async () => {
            const res = await axiosPublic.get('/categories') 
            // console.log(res.data);
            return res.data
        }
    })

    return [categories, isLoading, refetch]
};

export default useCategories;