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
import SalesReport from "../dashboardPages/AdminPages/SalesReport/SalesReport.jsx";
import ManageCategory from "../dashboardPages/AdminPages/ManageCategory/ManageCategory.jsx";
import ManageProducts from "../dashboardPages/AdminPages/ManageProducts/ManageProducts.jsx";
import Cart from "../pages/Cart/Cart.jsx";
import Checkout from "../pages/Checkout/Checkout.jsx";
import OrderConfirmation from "../pages/OrderConfirmation/OrderConfirmation .jsx";
import MyOrders from "../dashboardPages/UserPages/MyOrders/MyOrders.jsx";
import ManageOrders from "../dashboardPages/AdminPages/ManageOrders/ManageOrders.jsx";
import UpdateProduct from "../dashboardPages/AdminPages/UpdateProduct/UpdateProduct.jsx";
import ManageUsers from "../dashboardPages/AdminPages/ManageUsers/ManageUsers.jsx";
import Categories from "../pages/Categories/Categories.jsx";
import AdminRoute from "./AdminRoute.jsx";
import ManageSubCategory from "../dashboardPages/AdminPages/SubCategories/SubCategories.jsx";
import GetInTouch from "../pages/Home/GetInTouch/GetInTouch.jsx";
import AboutUs from "../pages/AboutUs/AboutUs.jsx";


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
                path: '/products',
                element: <Shop></Shop>
            },
            {
                path: '/about-us',
                element: <AboutUs></AboutUs>
            },
            {
                path: '/contact-us',
                element: <GetInTouch></GetInTouch>
            },
            {
                path: '/:name',
                element: <Shop></Shop>
            },
            {
                path: '/:category/:subCategory',
                element: <Shop></Shop>
            },
            {
                path: '/categories',
                element: <Categories></Categories>
            },
            {
                path: '/cart',
                element: <PrivateRoute><Cart></Cart></PrivateRoute>
            },
            {
                path: '/checkout',
                element: <PrivateRoute><Checkout></Checkout></PrivateRoute>
            },
            {
                path: '/order-confirmation',
                element: <PrivateRoute><OrderConfirmation></OrderConfirmation></PrivateRoute>
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
                element: <AdminRoute><PrivateRoute><AddProduct/></PrivateRoute></AdminRoute>
            },
            {
                path: 'manage-category',
                element: <AdminRoute><PrivateRoute><ManageCategory/></PrivateRoute></AdminRoute>
            },
            {
                path: 'sub-categories',
                element: <AdminRoute><PrivateRoute><ManageSubCategory/></PrivateRoute></AdminRoute>
            },
            {
                path: 'manage-products',
                element: <AdminRoute><PrivateRoute><ManageProducts/></PrivateRoute></AdminRoute>
            },
            {
                path: 'update-product/:id',
                element: <PrivateRoute><UpdateProduct/></PrivateRoute>
            },
            {
                path: 'manage-payment',
                element: <AdminRoute><PrivateRoute><ManageOrders/></PrivateRoute></AdminRoute>
            },
            {
                path: 'manage-users',
                element:<AdminRoute><PrivateRoute><ManageUsers/></PrivateRoute></AdminRoute>
            },
            {
                path: 'sales-report',
                element: <SalesReport/>
            },
            {
                path: 'my-orders',
                element: <MyOrders/>
            }
        ] 
    }
])



