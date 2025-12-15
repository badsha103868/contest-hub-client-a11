import React, { useEffect } from "react";


import Swal from "sweetalert2";
import { useNavigate, useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");

  // const axiosSecure = useAxiosSecure();
  const axiosInstance = useAxios()
  const navigate = useNavigate();

  useEffect(() => {
    if (!sessionId) return;

    axiosInstance
      .post("/payments/confirm", { sessionId })
      .then((res) => {
        Swal.fire({
          icon: "success",
          title: "Payment Successful 🎉",
          text: "You are now registered for the contest!",
        }).then(() => {
          navigate(`/contestDetails/${res.data.contestId}`);
        }); 
      })
      .catch((err) => {
        console.error("Payment confirm error:", err);
      });
  }, [sessionId, axiosInstance, navigate]);

  return <p className="text-center mt-20">Processing payment...</p>;
};

export default PaymentSuccess;
