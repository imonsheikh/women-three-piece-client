import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import Main from "../Layouts/Main.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import EidOffers from "../pages/EidOffers/EidOffers.jsx";
import ProductDetails from "../pages/ProductDetails/ProductDetails.jsx";
import Login from "../pages/Login/Login.jsx";
import Login2 from "../pages/Login2/Login2.jsx";
import Register from "../pages/Register/Register.jsx";
import PrivateRoute from "./PrivateRoute.jsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },
            {
                path: '/mens',
                element: <h1>Mens collection</h1>
            },
            {
                path: '/shop',
                element: <PrivateRoute><Shop></Shop></PrivateRoute>
            },
            {
                path: '/eid-offers',
                element: <EidOffers></EidOffers>
            },
            {
                path: '/product-details',
                element: <ProductDetails></ProductDetails>
            },
            // {
            //     path: '/login',
            //     element: <Login></Login>
            // },
            {
                path: '/login',
                element: <Login2></Login2>
            },
            {
                path: '/register',
                element: <Register></Register>
            },

        ]
    },
    // {
    //     path: 'dashboard'
    // }
])

