import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home/Home/Home.jsx";
import ErrorPage from "../pages/ErrorPage/ErrorPage.jsx";


export const router = createBrowserRouter([
    {
        path: '/',
        element: <div>Hello</div>,
        errorElement: <ErrorPage></ErrorPage>,
        children: [
            {
                path: '/',
                element: <Home></Home>
            },

        ]
    },
    {
        path: 'dashboard'
    }
])

