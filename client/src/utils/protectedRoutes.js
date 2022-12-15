import {
    Routes,
    Route,
    Link,
    Navigate,
    Outlet,
  } from 'react-router-dom';
  

export const ProtectedRoute = ({
        redirectPath = '/',
        children,
      }) => {

        if (!localStorage.getItem("LoginToken")) {
          return <Navigate to={redirectPath} replace />;
        }
        return children;
};


export const ProtectedRouteSignIn= ({
    redirectPath= '/dashboard',
    children,
})=>{
    
      if (localStorage.getItem("LoginToken")) {
        return <Navigate to={redirectPath} replace />;
      }
      return children ? children : <Outlet />;
}