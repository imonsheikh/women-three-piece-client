import axios from "axios";
import useAuth from './useAuth';
import { useNavigate } from 'react-router-dom';

const axiosSecure = axios.create({
    baseURL: 'http://localhost:5000',
})

const useAxiosSecure = () => {
    const navigate = useNavigate()
    const {logOut} = useAuth()
    
  //1.Request interceptor to add authorization header for every secure call to the api
  axiosSecure.interceptors.request.use(
    function(config) {
        const token = localStorage.getItem('access-token')
        config.headers.Authorization = `Bearer ${token}`
        return config
    },
    function(error){
        return Promise.reject(error)
    }
  )

  //2.Response interceptor 401 and 403 status
  axiosSecure.interceptors.response.use(
    function(response){
        return response
    },
    async(error) => {
        const status = error.response.status 
        console.log('Status error in the interceptors', status);
        //For 401 OR 403 logout the user and move the user to the login page
        if(status === 401 || status === 403){
            await logOut()
            navigate('/login')
        }
        return Promise.reject(error)
    }
  )

    return axiosSecure
};

export default useAxiosSecure;