import React from "react";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const MyCreatedContests = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  // Load creator's contests
  const { data: contests = [], refetch } = useQuery({
    queryKey: ["my-contests", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests?email=${user.email}`);
      return res.data;
    },
  });

  // Delete contest
  const handleDelete = (id, status) => {
    if (status !== "pending") {
      Swal.fire("Oops!", "You can only delete pending contests.", "warning");
      return;
    }

    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure
          .delete(`/contests/${id}`)
          .then((res) => {
            if (res.data.deletedCount) {
              refetch();
              Swal.fire({
                title: "Deleted!",
                text: "Your contest  has been deleted.",
                icon: "success",
              });
            }
          })
          .catch((err) => console.log(err.message));
      }
    });
  };

  // Navigate to edit page
  const handleEdit = (contest) => {
    if (contest.status !== "pending") {
      Swal.fire("Oops!", "You can only edit pending contests.", "warning");
      return;
    }
  navigate(`/dashboard/edit-contest/${contest._id}`, { state: { contest } });

  };

  // Navigate to submissions page
  const handleSeeSubmissions = (id) => {
    navigate(`/dashboard/submissions/${id}`);
  };

  return (
    <div className="p-5">
      <h2 className="text-5xl text-primary">
        My Created Contests ({contests.length})
      </h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr>
              <th>Sl No</th>
              <th>Contest Name</th>
              <th>Contest Type</th>
              <th>Status</th>
              <th>Edit</th>
              <th>Delete</th>
              <th>Submissions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <td>{index + 1}</td>
                <td>{contest.name}</td>
                <td>{contest.contest_type}</td>
                <td>
                  <span
                    className={`${
                      contest.status === "pending"
                        ? "text-yellow-500"
                        : contest.status === "approved"
                        ? "text-green-500"
                        : "text-red-500"
                    } font-bold`}
                  >
                    {contest.status}
                  </span>
                </td>
                <td>
                  <button
                    className={`btn btn-sm btn-primary ${
                      contest.status !== "pending" ? "btn-disabled" : ""
                    }`}
                    onClick={() => handleEdit(contest)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    className={`btn btn-sm btn-accent text-white ${
                      contest.status !== "pending" ? "btn-disabled" : ""
                    }`}
                    onClick={() => handleDelete(contest._id, contest.status)}
                  >
                    Delete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-sm btn-secondary"
                    onClick={() => handleSeeSubmissions(contest._id)}
                  >
                    See Submissions
                  </button>
                </td>
              </tr>
            ))}
            {contests.length === 0 && (
              <tr>
                <td colSpan="6" className="text-center">
                  No contests found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyCreatedContests;
