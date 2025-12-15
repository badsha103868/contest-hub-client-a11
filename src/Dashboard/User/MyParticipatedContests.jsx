import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../../Pages/Loading/Loading";

const MyParticipatedContests = () => {
  const axiosSecure = useAxiosSecure();

  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["my-participated-contests"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-participated-contests");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">My Participated Contests</h2>

      {contests.map(contest => (
        <div key={contest._id} className="border p-4 mb-4 rounded">
          <h3 className="font-bold">{contest.name}</h3>
          <p>Deadline: {new Date(contest.deadline).toLocaleDateString()}</p>
          <p className="text-green-600 font-semibold">Payment: Paid</p>
        </div>
      ))}
    </section>
  );
};

export default MyParticipatedContests;
