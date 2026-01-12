import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import SocialLogin from '../SocialLogin/SocialLogin';
import useAuth from '../../../Hooks/useAuth';
import { Link, useLocation, useNavigate } from 'react-router';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import Swal from 'sweetalert2';

const Login = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [firebaseError, setFirebaseError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const { signInUser, resetPassword } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogIn = (data) => {
    setFirebaseError('');
    signInUser(data.email, data.password)
      .then((result) => {
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: "Login Successful",
          showConfirmButton: false,
          timer: 1500,
        });
        navigate(location?.state || '/');
        reset();
      })
      .catch((error) => {
        setFirebaseError(error.message);
      });
  };

  //Demo Login
  const handleDemoLogin = () => {
    handleLogIn({ email: "badsha129@gmail.com", password: "Badsha1" });
  };

  // Forgot Password
  const handleForgotPassword = () => {
    const email = prompt("Enter your registered email for password reset:");
    if (!email) return;
    resetPassword(email)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Password Reset Email Sent",
          text: `Check your email: ${email}`,
          confirmButtonColor: "#3085d6",
        });
      })
      .catch((err) => {
        Swal.fire({
          icon: "error",
          title: "Error",
          text: err.message,
        });
      });
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <form onSubmit={handleSubmit(handleLogIn)} className="card-body">
        <h3 className="text-center font-bold text-3xl">Please Login</h3>

        <fieldset className="fieldset">
          {/* Email */}
          <label className="label">Email</label>
          <input
            type="email"
            {...register("email", { required: true })}
            className="input"
            placeholder="Email"
          />
          {errors.email?.type === "required" && <p className="text-red-500">Email is required</p>}

          {/* Password */}
          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className="input"
              placeholder="Password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className='btn btn-xs top-2 right-5 absolute'
            >
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>

          {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
          {errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>}

          {/* Firebase Error */}
          {firebaseError && <p className="text-red-500 font-semibold">{firebaseError}</p>}

          <div className="flex justify-between items-center mt-2">
            <button type="button" className="link link-hover text-sm" onClick={handleForgotPassword}>
              Forgot password?
            </button>
            <button type="button" className="btn btn-outline btn-sm" onClick={handleDemoLogin}>
              Demo Login
            </button>
          </div>

          <button className="btn btn-primary mt-4 w-full">Login</button>
        </fieldset>

        <p className="mt-2 text-center">
          New to Contest Hub?{" "}
          <Link state={location.state} className="text-green-400 underline text-lg" to="/register">
            Register
          </Link>
        </p>
      </form>

      {/* Google Social Login */}
      <SocialLogin />
    </div>
  );
};

export default Login;
