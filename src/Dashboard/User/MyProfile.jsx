import { useForm } from "react-hook-form";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

import Swal from "sweetalert2";
import axios from "axios";
import { PieChart, Pie, Cell, Tooltip } from "recharts";
import Loading from "../../Pages/Loading/Loading";

const MyProfile = () => {
  const axiosSecure = useAxiosSecure();
  const {  updateUserProfile } = useAuth();
  const queryClient = useQueryClient();

  //  get profile + stats
  const { data, isLoading } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-profile");
      return res.data;
    },
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  if (isLoading) return <Loading />;

  const { user: profile, participated, wins, winPercentage } = data;

  // chart data
  const chartData = [
    { name: "Won", value: wins },
    { name: "Lost", value: participated - wins },
  ];

  //  submit profile update
  const onSubmit = async (formData) => {
    let photoURL = profile.photoURL;

    // upload new photo if selected
    if (formData.photo?.length) {
      const imgData = new FormData();
      imgData.append("image", formData.photo[0]);

      const imgRes = await axios.post(
        `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host}`,
        imgData
      );
      photoURL = imgRes.data.data.url;
    }

    const updateInfo = {
      displayName: formData.displayName,
      photoURL,
      bio: formData.bio,
    };

    // update db
    await axiosSecure.patch("/my-profile", updateInfo);

    // update firebase profile
    await updateUserProfile({
      displayName: formData.displayName,
      photoURL,
    });

    Swal.fire({
      icon: "success",
      title: "Profile updated successfully",
      timer: 1500,
      showConfirmButton: false,
    });

    queryClient.invalidateQueries(["my-profile"]);
    reset();
  };

  return (
    <div className="max-w-6xl mx-auto p-6 grid md:grid-cols-2 gap-8">
      {/* LEFT SIDE */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <img
          src={profile.photoURL}
          alt="profile"
          className="w-32 h-32 rounded-full mx-auto mb-4"
        />
        <h2 className="text-xl font-bold text-center">
          {profile.displayName}
        </h2>
        <p className="text-center text-gray-500">{profile.email}</p>

        <div className="mt-6 text-center">
          <p>Participated: {participated}</p>
          <p>Wins: {wins}</p>
          <p className="text-lg font-bold text-green-600">
            Win Percentage: {winPercentage}%
          </p>
        </div>

        <div className="flex justify-center mt-6">
          <PieChart width={250} height={250}>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={90}
              dataKey="value"
            >
              <Cell fill="#22c55e" />
              <Cell fill="#e5e7eb" />
            </Pie>
            <Tooltip />
          </PieChart>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-base-100 shadow rounded-xl p-6">
        <h3 className="text-xl font-bold mb-4">Update Profile</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <input
            defaultValue={profile.displayName}
            {...register("displayName", { required: true })}
            className="input input-bordered w-full"
            placeholder="Name"
          />
          {errors.displayName && (
            <p className="text-red-500">Name required</p>
          )}

          <input
            type="file"
            {...register("photo")}
            className="file-input w-full"
          />

          <textarea
            defaultValue={profile.bio}
            {...register("bio")}
            className="textarea textarea-bordered w-full"
            placeholder="Bio / Address"
          />

          <button className="btn btn-primary w-full">
            Update Profile
          </button>
        </form>
      </div>
    </div>
  );
};

export default MyProfile;
