import React, { useState } from 'react';
import SocialLogin from '../SocialLogin/SocialLogin';
import { Link, useLocation, useNavigate } from 'react-router';
import { useForm } from 'react-hook-form';
import useAuth from '../../../Hooks/useAuth';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import Swal from 'sweetalert2';

const Register = () => {
   const [showPassword, setShowPassword] = useState(false);
  const [firebaseError, setFirebaseError] = useState("");
  // hook form
   const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  // location
   const location = useLocation();

  // console.log("in the register", location);
   
  // use navigate
  const navigate = useNavigate(); 

   //  useAuth authInfo data load
  const { registerUser, updateUserProfile } = useAuth();
  //   axiosSecure
  const axiosSecure = useAxiosSecure()
  // handleRegistration
  const handleRegistration = ( data ) =>{
    console.log('after register' ,data)

    const profileImg = data.photo[0]

       registerUser(data.email, data.password)
       .then(result =>{
        const user = result.user
        console.log(user)

    //  image store and photo url pete
    const formData = new FormData();
    formData.append('image', profileImg)

    // img bb api url
    const image_API_URL =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`

    // url paour jonno axios ar maddome post
    axios.post(image_API_URL, formData)
    .then(res=>{
      console.log('after photo upload ', res.data.data.url)
      const photoURL= res.data.data.url;
     
      // user create in data base 
      const userInfo = {
        email : data.email,
        displayName: data.name,
        photoURL: photoURL
      }
      axiosSecure.post('/users', userInfo)
      .then((res)=>{

          if (res.data.insertedId) {
              console.log("user created in the database");

            }
      })

       // update user profile
        const updateProfile={
          displayName : data.name,
          photoURL: photoURL
        }
         

      updateUserProfile(updateProfile)
      .then(()=>{
        // console.log('profile updated done')
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Registration Successful",
            showConfirmButton: false,
            timer: 1500,
          });
        navigate(location?.state || "/");
      })
       .catch((error) => {
        setFirebaseError(error.message);
      });
    })
      


      
       })
        .catch((error) => {
        console.log(error.message);
        setFirebaseError(error.message);
      });
  }



  return (
     <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body " onSubmit={handleSubmit(handleRegistration)}>
        <h3 className="text-center font-bold text-3xl">
          Welcome to Contest Hub
        </h3>
        <p className=" mt-3 font-bold text-lg">Please register</p>

        <fieldset className="fieldset">
          {/*name field*/}
          <label className="label">Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            placeholder="Your name"
          />

          {errors.name?.type === "required" && (
            <p className="text-red-500">Name is required</p>
          )}

          {/*phot image  field*/}
          <label className="label">Photo</label>
          <input
            type="file"
            {...register("photo", {required: true})}                               
            className="file-input w-full"
            placeholder="Your photo"
          />

          {errors.photo?.type === "required" && (
            <p className="text-red-500">Photo is required</p>
          )}

          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input w-full"
            placeholder="Email"
          />

          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
             type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              className="input w-full"
              placeholder="Password"
            />
            {/*  Show/Hide Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="btn btn-xs top-2 right-5 absolute"
            >
              {showPassword ? <FaEye /> :<FaEyeSlash
               /> }
            </button>
          </div>

          {/* required error */}

          {errors.password?.type === "required" && (
            <p className="text-red-500">Password is required</p>
          )}

          {/* length error */}

          {errors.password?.type === "minLength" && (
            <p className="text-red-500">
              Password must be 6 character or longer
            </p>
          )}

          {/* pattern error  */}
          {errors.password?.type === "pattern" && (
            <p className="text-red-500">
              password must have at least on uppercase or lowercase and one
              number
            </p>
          )} 
          {/*  Firebase Error Output */}
          {firebaseError && (
            <p className="text-red-500 font-semibold">{firebaseError}</p>
          )}

          <button className="btn btn-secondary mt-4">Register</button>
        </fieldset>
        <p>
          Already Have An Account ?
          <Link
            state={location.state}
            className="text-blue-400 underline text-lg"
            to="/login"
          >
            Login
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;