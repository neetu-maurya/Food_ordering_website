import "./App.css";
import { createBrowserRouter, Navigate,  RouterProvider } from "react-router-dom";

import Login from "./auth/Login";
import Signup from "./auth/Signup";
import ForgotPassword from "./auth/ForgotPassword";
import ResetPassword from "./auth/ResetPassword";

import MainLayout from "./layout/MainLayout";
import HeroSection from "./components/HeroSection";
import Profile from "./components/Profile";
import SearchPage from "./components/SearchPage";
import RestaurantDetail from "./components/RestaurantDetail";
import Cart from "./components/Cart";
import Restaurant from "./admin/Restaurant";
import AddMenu from "./admin/AddMenu";
import Order from "./admin/Order";
import Success from "./components/Success";
import VerifyEmail from "./auth/VerifyEmail";
import { useUserStore } from "./store/useUserStore";
import { useEffect } from "react";
import Loading from "./components/Loading";



const ProtectedRoute =({children}:{children:React.ReactNode}) =>
{
const {isAuthenticated,user} = useUserStore();
if(!isAuthenticated)
{
  return<Navigate to="/login" replace/>
}
if(!user?.isVerified)
{
  return<Navigate to="/verify-email" replace/>
}
return children;
};

const AuthenticatedUser= ({children}:{children:React.ReactNode}) =>
{
  const {isAuthenticated,user}=useUserStore();
  if(isAuthenticated && user?.isVerified)
  {
    return <Navigate to ="/" replace/>
  }
  return children;
};

const AdminRoute = ({children}:{children:React.ReactNode})=>
{
  const {user,isAuthenticated} = useUserStore();
  if(!isAuthenticated){
    return <Navigate to="/login" replace/>
  }
  if(!user?.admin)
  {
    return <Navigate to="/" replace/>
  }
  return children;
}





const appRouter = createBrowserRouter([
  {
    path: "/",
    element:<ProtectedRoute> <MainLayout /></ProtectedRoute>,
    children: [
      {
        path: "/",
        element: <HeroSection />,
      },
      {
        path: "/profile",
        element: <Profile />,
      },
      {
        path: "/Search/:text",
        element: <SearchPage />,
      },
      {
        path: "/restaurant/:id",
        element: <RestaurantDetail />,
      },
      {
        path: "/cart",
        element: <Cart />,
      },
      {
        path: "/order/status",
        element: <Success />,
      },
      //admin service start from here
      {
        path: "/admin/restaurant",
        element: <AdminRoute><Restaurant /></AdminRoute>,
      },
      //add menu
      {
        path: "/admin/menu",
        element: <AdminRoute><AddMenu /></AdminRoute>,
      },
      //add order
      {
        path: "/admin/order",
        element: <AdminRoute><Order /></AdminRoute>,
      },
    ],
  },
  {
    path: "/login",
    element:<AuthenticatedUser><Login /></AuthenticatedUser> ,
  },
  {
    path: "/signup",
    element: <AuthenticatedUser><Signup /></AuthenticatedUser>,
  },
  {
    path: "/forgot-password",
    element: <AuthenticatedUser><ForgotPassword /></AuthenticatedUser>,
  },
  {
    path: "/reset-password",
    element: <ResetPassword />,
  },
  {
    path: "/verify-email",
    element: <VerifyEmail />,
  },
]);

function App() {
  const {checkAuthentication,isCheckingAuth} =useUserStore();
  //checking auth every time when page is loaded
  useEffect(()=>{
    checkAuthentication();
  },[checkAuthentication]);
  if(isCheckingAuth) return <Loading/>
  return (
    <main>
      <RouterProvider router={appRouter} />
    </main>
  );
}

export default App;
