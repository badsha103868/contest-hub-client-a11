import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";
import { useQuery } from "@tanstack/react-query";
import Loading from "../Loading/Loading";
import useRole from "../../Hooks/useRole";
import Swal from "sweetalert2";

const ContestDetails = () => {
  const { id } = useParams();
  // console.log(id)
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const { role, roleLoading } = useRole();

  const [timeLeft, setTimeLeft] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [taskLink, setTaskLink] = useState("");

  const { data: contest = [], isLoading } = useQuery({
    queryKey: ["contest", id],
    queryFn: async () => {
      const res = await axiosSecure.get(`/contests/${id}`);
      return res.data;
    },
  });

  // countdown timer
  useEffect(() => {
    if (!contest) return;

    const deadline = new Date(contest.deadline).getTime();
    const interval = setInterval(() => {
      const now = new Date().getTime();
      const distance = deadline - now;

      if (distance < 0) {
        setTimeLeft("Contest Ended");
        clearInterval(interval);
      } else {
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor(
          (distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)
        );
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        setTimeLeft(`${days}d ${hours}h ${minutes}m ${seconds}s`);
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [contest]);

  if (isLoading) return <Loading></Loading>;

  const isContestEnded = new Date(contest.deadline) < new Date();

  if (roleLoading) return null;

  // registerd user asa kina check
  const isRegistered = contest.registeredUsers?.includes(user.email);

  const handleRegisterClick = () => {
    if (role !== "user") {
      Swal.fire({
        icon: "warning",
        title: "Not Allowed ❌",
        text: "Only normal users can participate in contests.",
        confirmButtonColor: "#3085d6",
      });
      return;
    }

    handlePayment(contest);
  };

  // handlePayment
  const handlePayment = async (contest) => {
    const paymentInfo = {
      price: contest.price,
      contestId: contest._id,
      userEmail: user.email,
      contestName: contest.name,
    };
    const res = await axiosSecure.post(
      "/payment-checkout-session",
      paymentInfo
    );
    // console.log(res.data.url);
    window.location.assign(res.data.url);
  };

  // handle submit modal
  const handleSubmit = (contest) => {
    if (!taskLink.trim()) {
      Swal.fire({
        icon: "warning",
        title: "Empty Field",
        text: "Please provide your task info before submitting",
      });
      return;
    }

    const submissionData = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL,
      taskInfo: taskLink,
    };
    axiosSecure
      .post(`/contests/${contest._id}/submit-task`, submissionData)
      .then(() => {
        Swal.fire({
          icon: "success",
          title: "Task Submitted!",
          text: "Your task has been submitted successfully",
        });
        setTaskLink("")
        setShowModal(false)

      })
      .catch(error=>{
        console.log(error.message)
      });
  };
  return (
    <section className="max-w-4xl mx-auto my-16 px-4">
      {/* Contest Banner */}
      <div className="mb-8">
        <img
          src={contest.contest_image}
          alt={contest.name}
          className="w-full h-64 md:h-100 object-cover  rounded-lg shadow-lg"
        />
      </div>

      {/* Contest Info */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold mb-2">{contest.name}</h1>
        <p className="text-lg font-bold text-base-content/70 mb-2">
          Participants: 👥{" "}
          <span className="text-warning">{contest.participants}</span>
        </p>
        <p className="text-lg font-bold text-base-content/70 mb-2">
          Prize: <span className="text-primary">৳ {contest.prize_money}</span>
        </p>
        <p className="text-xl font-bold text-base-content/70 mb-2">
          Deadline: <span className="text-green-700">{timeLeft}</span>
        </p>
      </div>

      {/* Description & Task */}
      <div className="mb-6">
        <h2 className="font-semibold text-xl mb-2">Description</h2>
        <p className="mb-4">{contest.description}</p>
        <h2 className="font-semibold text-xl mb-2">Task Instructions</h2>
        <p>{contest.task_instruction}</p>
      </div>

      {/* Winner */}
      {contest.winner && (
        <div className="mb-6 flex items-center gap-4">
          <img
            src={contest.winner.photo}
            alt={contest.winner.name}
            className="w-12 h-12 rounded-full"
          />
          <p>Winner: {contest.winner.name}</p>
        </div>
      )}

      {/* Actions */}
      <div className="flex flex-col md:flex-row gap-4">
        <button
          disabled={isRegistered || isContestEnded}
          onClick={handleRegisterClick}
          className="btn btn-primary"
        >
          {isRegistered ? "Already Registered" : "Register / Pay"}
        </button>

        <button
          className="btn btn-secondary"
          disabled={!isRegistered || isContestEnded}
          onClick={() => setShowModal(true)}
        >
          Submit Task
        </button>
      </div>

      {/* Task Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-base-100 p-6 rounded-lg w-11/12 md:w-1/2">
            <h3 className="text-xl font-bold mb-4">Submit Task</h3>
            <textarea
              className="textarea w-full mb-4"
              rows={5}
              placeholder="Provide your task links or details..."
              value={taskLink}
              onChange={(e) => setTaskLink(e.target.value)}
            ></textarea>
            <div className="flex justify-end gap-3">
              <button
                className="btn btn-outline"
                onClick={() => setShowModal(false)}
              >
                Cancel
              </button>
              <button
                onClick={() => handleSubmit(contest)}
                className="btn btn-primary"
              >
                Submit
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default ContestDetails;
