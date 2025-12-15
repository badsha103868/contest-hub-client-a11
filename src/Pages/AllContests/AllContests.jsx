import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import Loading from "../Loading/Loading";

const AllContests = () => {
  const [searchParams] = useSearchParams();
  const typeFromQuery = searchParams.get("type");
  const axiosSecure = useAxiosSecure();
  const [activeType, setActiveType] = useState(typeFromQuery || "all");

  // useEffect ar maddome handle banner search
  useEffect(() => {
    if (typeFromQuery) {
      setActiveType(typeFromQuery);
    }
  }, [typeFromQuery]);

  // 🔹 load contest types for tabs
  const { data: contestTypes = [] } = useQuery({
    queryKey: ["contest-types"],
    queryFn: async () => {
      const res = await axiosSecure.get("/contests/contest_type");
      return res.data;
    },
  });

  // 🔹 load contests based on active tab
  const { data: contests = [], isLoading } = useQuery({
    queryKey: ["all-contests", activeType],
    queryFn: async () => {
      const url =
        activeType === "all"
          ? "/contests?status=approved"
          : `/contests?status=approved&type=${encodeURIComponent(activeType)}`;
      const res = await axiosSecure.get(url);
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-4xl font-bold text-center mb-10">🎯 All Contests</h2>

      {/*  Tabs */}
      <div className="flex flex-wrap justify-center gap-3 mb-10">
        <button
          onClick={() => setActiveType("all")}
          className={`btn btn-sm ${
            activeType === "all" ? "btn-primary" : "btn-outline"
          }`}
        >
          All
        </button>

        {contestTypes.map((type) => (
          <button
            key={type}
            onClick={() => setActiveType(type)}
            className={`btn btn-sm ${
              activeType === type ? "btn-primary" : "btn-outline"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/* 🧱 Contest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="card bg-base-100 border border-base-300 shadow-md hover:shadow-xl transition-all duration-300"
          >
            <figure>
              <img
                src={contest.contest_image}
                alt={contest.name}
                className="h-52 w-full object-cover"
              />
            </figure>

            <div className="card-body">
              <h3 className="card-title text-lg">{contest.name}</h3>

              <p className="text-sm text-base-content/70">
                {contest.description?.slice(0, 90)}...
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="badge badge-secondary">
                  👥 {contest.participants} Joined
                </span>
              </div>

              <div className="card-actions mt-4">
                <Link
                  to={`/contestDetails/${contest._id}`}
                  className="btn btn-primary btn-sm w-full"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ❌ No contests */}
      {contests.length === 0 && (
        <p className="text-center mt-10 text-gray-500">
          No contests found for this category.
        </p>
      )}
    </section>
  );
};

export default AllContests;
