import { useQuery } from "@tanstack/react-query";

import { motion, useAnimation } from "framer-motion";
import { useEffect } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import Loading from "../../Loading/Loading";

const WinnerAdvertisement = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading} = useQuery({
    queryKey: ["winner-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests?status=approved");
      return res.data;
    },
  });

  const winners = contests.filter(c => c.winner);
  const controls = useAnimation();

  useEffect(() => {
    const slideLoop = async () => {
      while (true) {
        await controls.start({ x: -300, transition: { duration: 3, ease: "linear" } });
        await controls.start({ x: 0, transition: { duration: 0 } });
      }
    };
    slideLoop();
  }, [controls]);
    if (isLoading) return <Loading />;
  return (
    <section className="bg-gradient-to-r from-indigo-600 to-purple-600 py-16 text-white">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-6">
          🏆 Our Recent Winners
        </h2>

        <div className="overflow-hidden">
          <motion.div
            className="flex gap-6 cursor-grab"
            drag="x"
            dragConstraints={{ left: -winners.length * 280, right: 0 }}
            animate={controls}
          >
            {winners.map((contest) => (
              <motion.div
                key={contest._id}
                className="min-w-[250px] bg-white rounded-xl shadow-lg p-6 text-center"
                whileHover={{ scale: 1.05, y: -5 }}
              >
                <img
                  src={contest.winner.photo}
                  alt={contest.winner.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500"
                />
                <h3 className="font-bold text-lg">{contest.winner.name}</h3>
                <p className="text-sm text-gray-500">
                  Winner of {contest.name}
                </p>
                <p className="mt-4 text-indigo-600 font-bold text-xl">
                  💰 ৳ {contest.prize_money}
                </p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;
