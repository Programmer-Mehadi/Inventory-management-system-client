import { createBrowserRouter } from "react-router-dom";
import Dashboard from "../layouts/Dashboard";
import Main from "../layouts/Main";
import Addproduct from "../pages/Dashboard/Addproduct/Addproduct";
import EditProduct from "../pages/Dashboard/EditProduct/EditProduct";
import ViewBySort from "../pages/Dashboard/ViewBySort/ViewBySort";
import ViewCategories from "../pages/Dashboard/ViewCategories/ViewCategories";
import Login from "../pages/Login/Login";
import Signup from "../pages/Signup/Signup";
import PrivateRoutes from "./privateRoutes";

const router = createBrowserRouter([
    {
        path: '/',
        element: <Main></Main>,
        children: [
            {
                path: '/login',
                element: <Login></Login>
            },
            {
                path: '/',
                element: <Login></Login>
            },
            {
                path: '/signup',
                element: <Signup></Signup>
            }
        ]
    },
    {
        path: '/dashboard',
        element: <PrivateRoutes><Dashboard></Dashboard></PrivateRoutes>,
        children: [
            {
                path: '/dashboard/addproduct',
                element: <Addproduct></Addproduct>
            },
            {
                path: '/dashboard/viewbysort',
                element: <ViewBySort></ViewBySort>
            },
            {
                path: '/dashboard/editproduct/:id',
                loader: ({ params }) => fetch(`http://localhost:5000/product/single/${params.id}`),
                element: <EditProduct></EditProduct>
            },
            {
                path: '/dashboard/viewcategories',
                element: <ViewCategories></ViewCategories>
            }
        ]
    }
])

export default router;