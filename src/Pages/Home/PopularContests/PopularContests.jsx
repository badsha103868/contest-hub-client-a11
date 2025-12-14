import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { Link } from "react-router";


const PopularContests = () => {
  const axiosSecure = useAxiosSecure();

const { data: popularContests = [] } = useQuery({
  queryKey: ["popular-contests"],
  queryFn: async () => {
    const res = await axiosSecure.get(
      "/contests?status=approved&sort=popular"
    );
    return res.data;
  },
});


  

  return (
    <div className="my-16 px-4 max-w-7xl mx-auto">
      <h2 className="text-3xl font-bold text-center mb-10">
        Popular Contests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {popularContests.map((contest) => (
          <div
            key={contest._id}
            className="card bg-base-100 shadow-xl"
          >
            <figure>
              <img
                src={contest.contest_image}
                alt={contest.name}
                className="h-48 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title">{contest.name}</h3>

              <p className="text-sm text-gray-500">
                Deadline:{" "}
                {new Date(contest.deadline).toLocaleDateString()}
              </p>

              <p className="font-semibold">
                Prize: ৳ {contest.prize_money}
              </p>

              <p className="text-sm">
                Participants: {contest.participants}
              </p>

              <div className="card-actions justify-end">
                <Link to={`/contest/${contest._id}`}>
                  <button className="btn btn-secondary btn-sm">
                    View Details
                  </button>
                </Link>
              </div>
            </div>
          </div>
        ))}

        {popularContests.length === 0 && (
          <p className="text-center col-span-full">
            No popular contests available.
          </p>
        )}
      </div>
    </div>
  );
};

export default PopularContests;
