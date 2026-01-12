import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../Pages/Loading/Loading";
import Swal from "sweetalert2";

const Submissions = () => {
  const { id } = useParams();
  const axiosSecure = useAxiosSecure();

  const { data = {}, isLoading,refetch  } = useQuery({
    queryKey: ["contest-submissions", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}/submissions`);
      return res.data;
    },
  });

  const submissions = data.submissions || [];
  const winner = data.winner;

  //  handle declare winner
  const handleDeclareWinner = (sub) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Do you want to declare ${sub.name} the winner of this contest`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Conform and Continue!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .patch(`/contests/${id}/declare-winner`, { winnerEmail: sub.email })
          .then((res) => {
            if (res.data.result.modifiedCount) {
              Swal.fire({
                position: "top-end",
                icon: "success",
                title: `${sub.name} marked as winner for this contest`,
                showConfirmButton: false,
                timer: 2000,
              });
              refetch()
            }
          });
      }
    });
  };
  if (isLoading) return <Loading></Loading>;
  return (
    <section className="max-w-6xl mx-auto my-10 px-4">
      <h2 className="text-3xl font-bold mb-6">Submitted Tasks</h2>

      {submissions.length === 0 && (
        <p className="text-gray-500">No submissions yet.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {submissions.map((sub) => (
          <div
            key={sub.email}
            className="border p-4 rounded-lg shadow hover:shadow-lg transition"
          >
            <h3 className="font-bold">{sub.name}</h3>
            <p className="text-sm text-gray-600">{sub.email}</p>
            <p className="mt-2">{sub.taskInfo}</p>
            <p className="text-xs text-gray-400 mt-1">
              Submitted: {new Date(sub.createdAt).toLocaleString()}
            </p>

            <button
              disabled={winner || new Date() < new Date(data.deadline)}
              className="btn btn-primary btn-sm mt-4"
              onClick={() => handleDeclareWinner(sub)}
            >
              {winner
                ? "Winner Declared"
                : new Date() < new Date(data.deadline)
                ? "Declare After Deadline"
                : "Declare Winner"}
            </button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Submissions;
