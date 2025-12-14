import React, { use } from 'react';

import { Navigate, useLocation } from 'react-router';
import Loading from '../Pages/Loading/Loading';
import { AuthContext } from '../Context/AuthContext';



const PrivateRoute = ({children}) => {
  
  const {user , loading} = use(AuthContext)
  const location = useLocation()
  console.log(location)

   if(loading){
        return <Loading></Loading>
   }
    
  if(user){
    return children;
  }

  return <Navigate state={location?.pathname} to='/login'></Navigate>
     
  
};

export default PrivateRoute;