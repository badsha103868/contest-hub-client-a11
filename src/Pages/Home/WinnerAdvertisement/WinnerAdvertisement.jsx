import { useQuery } from "@tanstack/react-query";
import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../Loading/Loading";

const WinnerAdvertisement = () => {
  const axiosInstance = useAxios();
  const [winners, setWinners] = useState([]);
  const containerRef = useRef(null);

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["winner-contests"],
    queryFn: async () => {
      const res = await axiosInstance.get("/contests?status=approved");
      return res.data;
    },
  });

  useEffect(() => {
    if (contests.length) {
      // Only take contests with winners
      const winnerContests = contests.filter((c) => c.winner);
      // Duplicate array for infinite loop effect
      setWinners([...winnerContests, ...winnerContests]);
    }
  }, [contests]);

  if (isLoading) return <Loading />;

  if (winners.length === 0)
    return (
      <section className="py-16 text-center text-base-content">
        <p>No winners yet!</p>
      </section>
    );

  return (
    <section className="py-16 text-base-content">
      <div className="max-w-7xl mx-auto px-4">
        <h2 className="text-4xl font-bold text-center mb-8">
          🏆 Our Recent Winners
        </h2>

        <div className="overflow-hidden relative p-2">
          <motion.div
            ref={containerRef}
            className="flex gap-6"
            animate={{ x: ["0%", "-50%"] }}
            transition={{
              x: {
                repeat: Infinity,
                repeatType: "loop",
                duration: 20, 
                ease: "linear",
              },
            }}
          >
            {winners.map((contest, index) => (
              <div
                key={index}
                className="min-w-[250px] bg-base-100 dark:bg-base-200 rounded-xl shadow-xl p-6 text-center flex-shrink-0"
              >
                <img
                  src={contest.winner.photo}
                  alt={contest.winner.name}
                  className="w-24 h-24 rounded-full mx-auto mb-4 border-4 border-indigo-500"
                />
                <h3 className="font-bold text-lg">{contest.winner.name}</h3>
                <p className="text-sm text-gray-500 dark:text-gray-300">
                  Winner of {contest.name}
                </p>
                <p className="mt-4 text-indigo-600 font-bold text-xl">
                  💰 ৳ {contest.prize_money}
                </p>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default WinnerAdvertisement;
