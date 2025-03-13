import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";
import Main from "../Layouts/Main.jsx";
import Shop from "../pages/Shop/Shop.jsx";
import EidOffers from "../pages/EidOffers/EidOffers.jsx";


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
                path: '/shop',
                element: <Shop></Shop>
            },
            {
                path: '/eid-offers',
                element: <EidOffers></EidOffers>
            },

        ]
    },
    {
        path: 'dashboard'
    }
])

