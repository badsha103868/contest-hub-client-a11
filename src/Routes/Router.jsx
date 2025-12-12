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
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import AddContest from "../Dashboard/Creator/AddContest";
import MyCreatedContests from "../Dashboard/Creator/MyCreatedContests";
import Submissions from "../Dashboard/Creator/Submissions";
import MyParticipatedContests from "../Dashboard/User/MyParticipatedContests";
import MyWinningContests from "../Dashboard/User/MyWinningContests";
import MyProfile from "../Dashboard/User/MyProfile";
import ManageContests from "../Dashboard/Admin/ManageContests";
import ManageUsers from "../Dashboard/Admin/ManageUsers";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "/allContest",
        Component: AllContests,
      },
      {
        path: "/about",
        Component: About,
      },
      {
        path: "/contact",
        Component: Contact,
      },
      {
        path: "/dashboard",
        Component: DashboardLayout,
      },
    ],
  },
  {
    path: "/",
    Component: AuthLayout,
    children: [
      {
        path: "/login",
        Component: Login,
      },
      {
        path: "/register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: DashboardLayout,
    children:[

      // creators only routes
      {
        path:'add-contest',
        Component: AddContest
      },
      {
        path:'my-created-contest',
        Component: MyCreatedContests
      },
      {
        path:'submissions',
        Component: Submissions
      },

      //  users routes only
      {
        path:'my-participated-contest',
        Component:MyParticipatedContests
      },
      {
        path:'my-winning-contest',
        Component:MyWinningContests
      },
      {
        path:'my-profile',
        Component:MyProfile
      },

      //  admin route 
      {
        path:'manage-contest',
        Component:ManageContests
      },
      {
        path:'manage-users',
        Component:ManageUsers
      },
    ]
  },
  {
    path: "/*",
    Component: ErrorPage,
  },
]);
