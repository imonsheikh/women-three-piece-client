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
import CategoryDetails from "../pages/CategoryDetails/CategoryDetails.jsx";
import Dashboard from "../Layouts/Dashboard.jsx";
import DashboardHome from "../dashboardPages/DashboardHome/DashboardHome.jsx";
import AddProduct from "../dashboardPages/AdminPages/AddProduct/AddProduct.jsx";
import ManageUser from "../dashboardPages/AdminPages/ManageUser/ManageUser.jsx";
import ManagePayment from "../dashboardPages/AdminPages/ManagePayment/ManagePayment.jsx";
import SalesReport from "../dashboardPages/AdminPages/SalesReport/SalesReport.jsx";
import ManageCategory from "../dashboardPages/AdminPages/ManageCategory/ManageCategory.jsx";
import ManageProducts from "../dashboardPages/AdminPages/ManageProducts/ManageProducts.jsx";


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
                path: '/mens-collection',
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
                path: '/product-details/:id',
                element: <ProductDetails></ProductDetails>
            },
            {
                path: '/:categoryName',
                element: <CategoryDetails></CategoryDetails>
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
    {
        path: '/dashboard',
        errorElement: <ErrorPage></ErrorPage>,
        element: <Dashboard/>,
        children: [
            {
                path: 'home',
                element: <PrivateRoute><DashboardHome/></PrivateRoute>
            },
            {
                path: 'add-product',
                element: <PrivateRoute><AddProduct/></PrivateRoute>
            },
            {
                path: 'manage-category',
                element: <PrivateRoute><ManageCategory/></PrivateRoute>
            },
            {
                path: 'manage-products',
                element: <PrivateRoute><ManageProducts/></PrivateRoute>
            },
            {
                path: 'manage-payment',
                element: <ManagePayment/>
            },
            {
                path: 'manage-user',
                element: <ManageUser/>
            },
            {
                path: 'sales-report',
                element: <SalesReport/>
            }
        ] 
    }
])



