import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";

const MyWinningContests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contests = [] } = useQuery({
    queryKey: ["my-winning-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-winning-contests");
      return res.data;
    },
  });

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">🏆 My Winning Contests</h2>

      {contests.length === 0 && <p>No wins yet.</p>}

      {contests.map((contest) => (
        <div key={contest._id} className="border p-4 mb-4 rounded">
          <h3 className="font-bold">{contest.name}</h3>
          <p className="text-green-">Prize: ৳ <span className="text-green-500 font-bold">{contest.prize_money}</span></p>
        </div>
      ))}
    </section>
  );
};

export default MyWinningContests;
