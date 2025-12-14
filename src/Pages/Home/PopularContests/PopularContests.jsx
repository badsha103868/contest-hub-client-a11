import { useQuery } from "@tanstack/react-query";
import { Link, } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";


const PopularContests = () => {
  const axiosSecure = useAxiosSecure();
  // const { user } = useAuth();
  // const navigate = useNavigate();

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
    <section className="my-20 px-4 max-w-7xl mx-auto">
      <h2 className="text-4xl font-bold text-center mb-12">
        🔥 Popular Contests
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {popularContests.slice(0, 6).map((contest) => (
          <div
            key={contest._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
          >
            <figure >
              <img
                src={contest.contest_image}
                alt={contest.name}
                className="h-52 w-full object-cover"
              />
           
            </figure>

            <div className="card-body">
              <h3 className="card-title text-lg">{contest.name}</h3>

              <p className="text-sm text-base-content/70">
                {contest.description?.slice(0, 80)}...
              </p>
               

              <div className="flex justify-between items-center mt-3">

                <span className="badge badge-secondary font-semibold">
              Total Participants:  👥 {contest.participants}
              </span>

                <div className="card-actions mt-3">
                  <Link
                    to={`/contestDetails/${contest._id}`}
                    className="btn btn-primary w-full"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Show all */}
      <div className="text-center mt-12">
        <Link to="/all-contests">
          <button className="btn btn-wide btn-secondary">
            Show All Contests
          </button>
        </Link>
      </div>
    </section>
  );
};

export default PopularContests;
