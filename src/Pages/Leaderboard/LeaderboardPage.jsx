import React from "react";
import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import Loading from "../Loading/Loading";
import useAxios from "../../Hooks/useAxios";


const Leaderboard = () => {
  const axiosInstance = useAxios()
  const { data: users = [], isLoading } = useQuery({
    queryKey: ["leaderboard"],
    queryFn: async () => {
      const res = await axiosInstance.get("/leaderboard");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Leaderboard</h2>
      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border p-2">Rank</th>
            <th className="border p-2">Name</th>
            <th className="border p-2">Photo</th>
            <th className="border p-2">Wins</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user._id}>
              <td className="border p-2">{index + 1}</td>
              <td className="border p-2">{user.name}</td>
              <td className="border p-2">
                <img src={user.photo} alt={user.name} className="w-10 h-10 rounded-full"/>
              </td>
              <td className="border p-2">{user.wins}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
};

export default Leaderboard;
