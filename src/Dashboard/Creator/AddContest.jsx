import React from "react";
import { useForm } from "react-hook-form";

const AddContest = () => {
  // hook form
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();


  // handle add contest form 
  const handleAddContest = ( data )=>{
       console.log('after add contest', data)
  }

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
            <label className="label">Image</label>
            <input
              type="file"
              {...register("image", { required: true })}
              className="file-input w-full"
              placeholder="Contest Image"
            />

            {errors.photo?.type === "required" && (
              <p className="text-red-500">Photo is required</p>
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

            {/*login  button */}
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
