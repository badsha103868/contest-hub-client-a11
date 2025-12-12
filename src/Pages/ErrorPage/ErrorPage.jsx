import React from 'react';
import { MdErrorOutline } from "react-icons/md";
import { Link } from 'react-router';


const ErrorPage = () => {
  return (
    <div className='flex flex-col col-span-full   justify-center  items-center h-[50vh] bg-primary'>
      <MdErrorOutline className='text-6xl text-red-500 mb-4' />
       <p className='text-5xl text-white font-bold'>404</p>
       <h3 className="text-center col-span-full text-warning text-2xl">Not Found</h3>
        <span className='text-white/70'>Sorry,the page you are looking for might be removed , renamed or is temporarily unavailable </span>
        <div>
          <Link to='/'>
          <button className="btn btn-accent text-white mt-6 px-2 md:px-5">Back To Home</button>
          </Link>
        
        </div>

    </div>
  );
};

export default ErrorPage;