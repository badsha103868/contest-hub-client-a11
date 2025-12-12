import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
  //  react hook form destructuring
  const { register, handleSubmit, formState: {errors}} = useForm()

  // state
  const [firebaseError, setFirebaseError] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  // authInfo load
  const { signInUser } = useAuth()

  const location = useLocation()
  const navigate = useNavigate()

  // handlelogin
  const handleLogIn = ( data ) =>{
    console.log('form data', data)
    signInUser(data.email, data.password)
    .then((result)=>{
      const user = result.user
      console.log(user)
        Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Login Successful",
            showConfirmButton: false,
            timer: 1500,
          });
      navigate(location?.state || '/')
    })
      .catch((error) => {
        console.log(error.message);
        setFirebaseError(error.message);
      });
  }

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(handleLogIn)} className="card-body ">
        <h3 className="text-center font-bold text-3xl">Please Login</h3>
        
        <fieldset className="fieldset">
          {/* email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && (
            <p className="text-red-500">Email is required</p>
          )}

          {/* password */}
          <label className="label ">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", {
                required: true,
                minLength: 6,
                // pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/,
              })}
              className="input "
              placeholder="Password"
            />
            {/*  Show/Hide Button */}
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='btn btn-xs top-2 right-5 absolute'
            >
              {showPassword ? <FaEye /> :<FaEyeSlash /> }
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
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-primary mt-4">Login</button>
        </fieldset>
        <p>
          New to Contest Hub ?
          <Link
            state={location.state}
            className="text-green-400 underline text-lg"
            to="/register"
          >
            Register
          </Link>
        </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;