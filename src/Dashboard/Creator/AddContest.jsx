import React, { useState } from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../Hooks/useAuth";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const AddContest = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  // navigate
  const navigate = useNavigate();

  const [deadline, setDeadline] = useState(null);
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  // handle add contest form
  const handleAddContest = (data) => {
    console.log("after add contest", data);

    if (!deadline) {
      Swal.fire({
        icon: "error",
        title: "Please select a deadline",
      });
      return;
    }

    const contestImage = data.contest_image[0];
    const formData = new FormData();
    formData.append("image", contestImage);

    const image_API_URL = `https://api.imgbb.com/1/upload?key=${
      import.meta.env.VITE_image_host
    }`;

    axios
      .post(image_API_URL, formData)
      .then((res) => {
        const contestImageURL = res.data.data.url;

        const contestData = {
          name: data.name,
          contest_image: contestImageURL,
          description: data.description,
          price: Number(data.price),
          prize_money: Number(data.prize_money),
          task_instruction: data.task_instruction,
          contest_type: data.contest_type,
          deadline: deadline,
          creator_name: user?.displayName,
          creator_photo: user?.photoURL,
        };

        axiosSecure
          .post("/contests", contestData)
          .then((res) => {
            if (res.data.insertedId) {
              navigate("/dashboard/my-created-contests");
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Contest added successfully",
                showConfirmButton: false,
                timer: 1500,
              });
              reset();
              setDeadline(null);
            }
          })
          .catch((error) => {
            console.log(error.message);
          });
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  
  return (
    <div className="flex justify-center items-center  min-h-screen my-5">
      <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl ">
        {/* form */}
        <form className="card-body" onSubmit={handleSubmit(handleAddContest)}>
          <h1 className="text-2xl text-primary font-bold text-center">
            Add Contest
          </h1>

          <fieldset className="fieldset">
            {/*Contest name field*/}
            <label className="label">Contest Name</label>
            <input
              type="text"
              {...register("name", { required: true })}
              className="input w-full"
              placeholder="Contest Name"
            />

            {errors.name?.type === "required" && (
              <p className="text-red-500">Name is required</p>
            )}

            {/*phot image  field*/}
            <label className="label">Contest Banner Image</label>
            <input
              type="file"
              {...register("contest_image", { required: true })}
              className="file-input w-full"
              placeholder="Contest Image"
            />

            {errors.contest_image?.type === "required" && (
              <p className="text-red-500">Contest Image is required</p>
            )}

            {/*Contest Description*/}
            <label className="label">Description</label>
            <input
              type="text"
              {...register("description", { required: true })}
              className="input w-full"
              placeholder="Description"
            />

            {errors.description?.type === "required" && (
              <p className="text-red-500">Description is required</p>
            )}
            {/*Contest Price*/}
            <label className="label">Price</label>
            <input
              type="number"
              {...register("price", { required: true })}
              className="input w-full"
              placeholder="Price"
            />

            {errors.price?.type === "required" && (
              <p className="text-red-500">Price is required</p>
            )}
            {/*Contest Prize Money*/}
            <label className="label">Prize Money</label>
            <input
              type="number"
              {...register("prize_money", { required: true })}
              className="input w-full"
              placeholder="Prize Money"
            />

            {errors.prize_money?.type === "required" && (
              <p className="text-red-500">Prize money is required</p>
            )}
            {/*Task Instruction*/}
            <label className="label">Task Instruction</label>
            <input
              type="text"
              {...register("task_instruction", { required: true })}
              className="input w-full"
              placeholder="Task Instruction"
            />

            {errors.task_instruction?.type === "required" && (
              <p className="text-red-500">Task Instruction is required</p>
            )}

            {/*Contest Type*/}
            <label className="label">Contest Type</label>
            <input
              type="text"
              {...register("contest_type", { required: true })}
              className="input w-full"
              placeholder="Contest Type"
            />

            {errors.contest_type?.type === "required" && (
              <p className="text-red-500">Contest Type is required</p>
            )}

            <label className="label">Deadline</label>
            <DatePicker
              selected={deadline}
              onChange={(date) => setDeadline(date)}
              className="input w-full"
              placeholderText="Select deadline"
              minDate={new Date()}
              dateFormat="dd/MM/yyyy"
              required
            />

            {/* Add Contest button*/}
            <button
              type="submit"
              className="btn btn-primary  hover:bg-green-700 text-white mt-4"
            >
              Add Contest
            </button>
          </fieldset>
        </form>
      </div>
    </div>
  );
};

export default AddContest;
