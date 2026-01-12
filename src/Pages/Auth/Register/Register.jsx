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
  const { register, handleSubmit, formState: { errors } } = useForm();
  const location = useLocation();
  const navigate = useNavigate();
  const { registerUser, updateUserProfile } = useAuth();
  const axiosSecure = useAxiosSecure();

  const handleRegistration = (data) => {
    setFirebaseError('');
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then(result => {
        const formData = new FormData();
        formData.append('image', profileImg);

        const image_API_URL =`https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`;

        axios.post(image_API_URL, formData)
          .then(res => {
            const photoURL = res.data.data.url;
            const userInfo = {
              email: data.email,
              displayName: data.name,
              photoURL
            };

            axiosSecure.post('/users', userInfo).then((res) => {
              if (res.data.insertedId) console.log("User created in DB");
            });

            const updateProfile = { displayName: data.name, photoURL };
            updateUserProfile(updateProfile)
              .then(() => {
                Swal.fire({
                  position: "top-end",
                  icon: "success",
                  title: "Registration Successful",
                  showConfirmButton: false,
                  timer: 1500,
                });
                navigate(location?.state || "/");
              })
              .catch(error => setFirebaseError(error.message));
          });
      })
      .catch(error => setFirebaseError(error.message));
  };

  return (
    <div className="card bg-base-100 mx-auto w-full max-w-sm shrink-0 shadow-2xl">
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <h3 className="text-center font-bold text-3xl">Welcome to Contest Hub</h3>
        <p className="mt-3 font-bold text-lg">Please register</p>

        <fieldset className="fieldset">
          <label className="label">Name</label>
          <input type="text" {...register("name", { required: true })} className="input w-full" placeholder="Your name"/>
          {errors.name && <p className="text-red-500">Name is required</p>}

          <label className="label">Photo</label>
          <input type="file" {...register("photo", { required: true })} className="file-input w-full"/>
          {errors.photo && <p className="text-red-500">Photo is required</p>}

          <label className="label">Email</label>
          <input type="email" {...register("email", { required: true })} className="input w-full" placeholder="Email"/>
          {errors.email && <p className="text-red-500">Email is required</p>}

          <label className="label">Password</label>
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              {...register("password", { required: true, minLength: 6 })}
              className="input w-full"
              placeholder="Password"
            />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="btn btn-xs absolute top-2 right-5">
              {showPassword ? <FaEye /> : <FaEyeSlash />}
            </button>
          </div>
          {errors.password?.type === "required" && <p className="text-red-500">Password is required</p>}
          {errors.password?.type === "minLength" && <p className="text-red-500">Password must be 6 characters or longer</p>}
          {firebaseError && <p className="text-red-500 font-semibold">{firebaseError}</p>}

          <button className="btn btn-secondary mt-4 w-full">Register</button>
        </fieldset>

        <p className="mt-2 text-center">
          Already Have An Account?
          <Link state={location.state} className="text-blue-400 underline text-lg" to="/login">Login</Link>
        </p>
      </form>

      {/* Social login (Google) */}
      <SocialLogin />
    </div>
  );
};

export default Register;
