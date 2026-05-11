import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layouts/MainLayout.jsx";
import PrivateRoute from "../components/PrivateRoute.jsx";
import Home from "../pages/Home.jsx";
import Apps from "../pages/Apps.jsx";
import AppDetails from "../pages/AppDetails.jsx";
import Login from "../pages/Login.jsx";
import Register from "../pages/Register.jsx";
import Profile from "../pages/Profile.jsx";
import About from "../pages/About.jsx";
import NotFound from "../pages/NotFound.jsx";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <MainLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: "apps", element: <Apps /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "about", element: <About /> },
        {
          element: <PrivateRoute />,
          children: [
            { path: "app/:id", element: <AppDetails /> },
            { path: "profile", element: <Profile /> },
          ],
        },
      ],
    },
    { path: "*", element: <NotFound /> },
  ],
  { basename: "/appstore-platform" }
);
