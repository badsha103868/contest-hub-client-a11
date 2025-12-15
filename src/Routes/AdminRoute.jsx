import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Pages/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';



const AdminRoute = ( { children } ) => {
  //  user data
  const {  loading } = useAuth();
   
  const { role , roleLoading } = useRole()

   if(loading || roleLoading){
     return <Loading></Loading>
   }

   if(role !== 'admin'){
    return <Forbidden></Forbidden>
   }

  return children;
};

export default AdminRoute;