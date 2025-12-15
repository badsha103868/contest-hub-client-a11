import React from 'react';
import useAuth from '../Hooks/useAuth';
import useRole from '../Hooks/useRole';
import Loading from '../Pages/Loading/Loading';
import Forbidden from '../Components/Forbidden/Forbidden';

const CreatorRoute = ({children}) => {
   //  user data
  const {  loading, user } = useAuth(); 
   
  const { role , roleLoading } = useRole()

   if(loading || !user || roleLoading){
     return <Loading></Loading>
   }

   if(role !== 'creator'){
    return <Forbidden></Forbidden>
   }

  return children;
};

export default CreatorRoute;