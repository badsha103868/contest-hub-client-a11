import React, { useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";
import Loading from "../../Pages/Loading/Loading";

const ManageContests = () => {
  const axiosSecure = useAxiosSecure();
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  // fetch contests page-wise from backend
  const { data, refetch, isLoading } = useQuery({
    queryKey: ["manage-contests", currentPage],
    queryFn: async () => {
      const res = await axiosSecure.get(
        `/contests?page=${currentPage}&limit=${itemsPerPage}`
      );
      return res.data;
    },
    keepPreviousData: true,
  });

  const contests = data?.contests || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / itemsPerPage);

  // update status
  const updateContestStatus = (contest, newStatus) => {
    const updateInfo = { status: newStatus };
    Swal.fire({
      title: "Are you sure?",
      text: `${contest.status} will be changed to ${newStatus}!`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Confirm and Continue!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.patch(`/contests/${contest._id}`, updateInfo).then((res) => {
          if (res.data.modifiedCount) {
            refetch();
            Swal.fire({
              position: "top-end",
              icon: "success",
              title: `${contest.status} marked ${newStatus}`,
              showConfirmButton: false,
              timer: 2000,
            });
          }
        });
      }
    });
  };

  // handle approve / reject
  const handleApproval = (contest) => updateContestStatus(contest, "approved");
  const handleRejection = (contest) => updateContestStatus(contest, "rejected");

  // handle delete
  const handleDelete = (id) => {
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
        axiosSecure.delete(`/contests/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Contest request has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      <h3 className="text-5xl text-primary mb-4">
        Manage Contest: {total}
      </h3>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="font-semibold text-lg text-green-500">
              <th>Sl No</th>
              <th>Name</th>
              <th>Creator Email</th>
              <th>Contest Type</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {contests.map((contest, index) => (
              <tr key={contest._id}>
                <th>{(currentPage - 1) * itemsPerPage + index + 1}</th>
                <td>{contest.name}</td>
                <td>{contest.creator_email}</td>
                <td>{contest.contest_type}</td>
                <td>
                  <p
                    className={`font-bold ${
                      contest.status === "approved"
                        ? "text-green-500"
                        : contest.status === "pending"
                        ? "text-yellow-500"
                        : "text-red-500"
                    }`}
                  >
                    {contest.status}
                  </p>
                </td>
                <td className="space-x-2">
                  <button
                    onClick={() => handleApproval(contest)}
                    className="p-2 btn btn-primary text-black"
                  >
                    <FaCheckCircle />
                  </button>
                  <button
                    onClick={() => handleRejection(contest)}
                    className="p-2 btn text-black"
                  >
                    <FaTimesCircle />
                  </button>
                  <button
                    onClick={() => handleDelete(contest._id)}
                    className="p-2 btn text-black"
                  >
                    <FaTrashCan />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-4 space-x-2">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="btn btn-sm"
        >
          Previous
        </button>

        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx + 1)}
            className={`btn btn-sm ${
              currentPage === idx + 1 ? "btn-primary text-white" : ""
            }`}
          >
            {idx + 1}
          </button>
        ))}

        <button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
          className="btn btn-sm"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default ManageContests;
