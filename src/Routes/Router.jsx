import { createBrowserRouter } from "react-router";
import RootLayout from "../Layouts/RootLayout";
import Home from "../Pages/Home/Home/Home";
import AllContests from "../Pages/AllContests/AllContests";
import About from "../Pages/ExtraPages/About";
import Contact from "../Pages/ExtraPages/Contact";
import DashboardLayout from "../Layouts/DashboardLayout";
import AuthLayout from "../Layouts/AuthLayout";
import Login from "../Pages/Auth/Login/Login";
import Register from "../Pages/Auth/Register/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children:[
      {
        index: true,
        Component: Home
      },
      {
        path:'/allContest',
        Component:AllContests
      },
      {
        path:'/about',
        Component: About
      },
      {
        path:'/contact',
        Component: Contact
      },
      {
        path:'/dashboard',
        Component:DashboardLayout
      }
     
    ]
  },
  {
    path: '/',
    Component:AuthLayout,
    children:[
      {
        path:'/login',
        Component:Login
      },
      {
        path:'/register',
        Component:Register
      }
    ]
  }
]);