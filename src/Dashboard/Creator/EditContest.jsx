import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Swal from "sweetalert2";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const EditContest = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const axiosSecure = useAxiosSecure();

  // route state theka contest data
  const { contest } = location.state || {};

  const [deadline, setDeadline] = useState(
    contest?.deadline ? new Date(contest.deadline) : null
  );

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleUpdateContest = (data) => {
    const updatedContest ={
      ...data,deadline
    }
    axiosSecure
      .patch(`/contests/${contest._id}`, updatedContest)
      .then((res) => {
        if (res.data.modifiedCount) {
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: "Contest updated successfully",
            showConfirmButton: false,
            timer: 1500,
          });
          navigate("/dashboard/my-created-contests");
        }
      })
      .catch((error) => {
        console.log(error.message);
      });
  };

  return (
    <div className="flex justify-center items-center min-h-screen my-5">
      <div className="card bg-base-100 w-full max-w-lg shadow-2xl">
        <form
          className="card-body"
          onSubmit={handleSubmit(handleUpdateContest)}
        >
          <h1 className="text-2xl font-bold text-center text-primary mb-4">
            Edit Contest
          </h1>

          <label className="label">Contest Name</label>
          <input
            type="text"
            {...register("name", { required: true })}
            className="input w-full"
            defaultValue={contest.name}
          />
          {errors.name && <p className="text-red-500">Name is required</p>}

          <label className="label">Description</label>
          <input
            type="text"
            {...register("description", { required: true })}
            className="input w-full"
            defaultValue={contest.description}
          />
          {errors.description && (
            <p className="text-red-500">Description is required</p>
          )}

          <label className="label">Price</label>
          <input
            type="number"
            {...register("price", { required: true })}
            className="input w-full"
            defaultValue={contest.price}
          />
          {errors.price && <p className="text-red-500">Price is required</p>}

          <label className="label">Prize Money</label>
          <input
            type="number"
            {...register("prize_money", { required: true })}
            className="input w-full"
            defaultValue={contest.prize_money}
          />
          {errors.prize_money && (
            <p className="text-red-500">Prize money is required</p>
          )}

          <label className="label">Task Instruction</label>
          <input
            type="text"
            {...register("task_instruction", { required: true })}
            className="input w-full"
            defaultValue={contest.task_instruction}
          />
          {errors.task_instruction && (
            <p className="text-red-500">Task instruction is required</p>
          )}

          <label className="label">Contest Type</label>
          <input
            type="text"
            {...register("contest_type", { required: true })}
            className="input w-full"
            defaultValue={contest.contest_type}
          />
          {errors.contest_type && (
            <p className="text-red-500">Contest type is required</p>
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

          <button
            type="submit"
            className="btn btn-primary mt-4 hover:bg-green-700 text-white w-full"
          >
            Update Contest
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditContest;
