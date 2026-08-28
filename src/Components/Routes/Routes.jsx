import { createBrowserRouter } from "react-router";
import MainSection from "../MainSection/MainSection";
import LoginSection from "../LoginSection/LoginSection";
import RegisterSection from "../RegisterSection/RegisterSection";
import BidsSection from "../BidsSection/BidsSection";
import ProtectedRoutes from "../ProtectedRoutes/ProtectedRoutes";
import AllProducts from "../AllProducts/AllProducts";
import { Component } from "react";
import HomeSection from "../HomeSection/HomeSection";
import ProductsDetailPage from "../ProductsDetailPage/ProductsDetailPage";

const router = createBrowserRouter([
  {
    path: "/",
    Component: MainSection,
    children:[
      {
        index:true,
        Component:HomeSection
      },
      
      {
        path:'login',
        Component:LoginSection
      },
      {
        path:'register',
        Component: RegisterSection
      },
      {
        path:'/bids',
        element:<ProtectedRoutes><BidsSection></BidsSection></ProtectedRoutes>
      },
      {
        path:'/allproducts',
        element: <ProtectedRoutes><AllProducts></AllProducts></ProtectedRoutes>
      },
      {
        path:'/Product/details/:id',
        loader:({params})=>fetch(`http://localhost:4000/products/${params.id}`),
        hydrateFallbackElement:<p>Loading...</p>,
        element: <ProtectedRoutes><ProductsDetailPage></ProductsDetailPage></ProtectedRoutes>
      }
    ]
  },
]);

export default router;
