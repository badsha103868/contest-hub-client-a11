import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { Link, useSearchParams } from "react-router";
import useAxios from "../../Hooks/useAxios";

const AllContests = () => {
  const axiosInstance = useAxios();
  const [searchParams] = useSearchParams();
  const typeFromQuery = searchParams.get("type");

  //  type tab state
  const [activeType, setActiveType] = useState(typeFromQuery || "all");

  //  input typing state
  const [searchInput, setSearchInput] = useState("");
  const [maxPrizeInput, setMaxPrizeInput] = useState("");

  //  applied filter state (query trigger)
  const [searchText, setSearchText] = useState("");
  const [maxPrize, setMaxPrize] = useState("");

  //  sort & pagination
  const [sort, setSort] = useState("");
  const [page, setPage] = useState(1);
  const limit = 8;

  // banner / category search sync
  useEffect(() => {
    if (typeFromQuery) {
      setActiveType(typeFromQuery);
      setPage(1);
    }
  }, [typeFromQuery]);

  // contest types for tabs
  const { data: contestTypes = [] } = useQuery({
    queryKey: ["contest-types"],
    queryFn: async () => {
      const res = await axiosInstance.get("/contests/contest_type");
      return res.data;
    },
  });

  //  load contests
  const { data, isLoading } = useQuery({
    queryKey: ["all-contests", activeType, searchText, maxPrize, sort, page],
    queryFn: async () => {
      const params = new URLSearchParams({
        status: "approved",
        page,
        limit,
      });

      if (activeType !== "all") params.append("type", activeType);
      if (searchText) params.append("search", searchText);
      if (maxPrize) params.append("maxPrize", maxPrize);
      if (sort) params.append("sort", sort);

      const res = await axiosInstance.get(`/contests?${params.toString()}`);
      return res.data;
    },
    keepPreviousData: true,
  });

  const contests = data?.contests || [];
  const total = data?.total || 0;
  const totalPages = Math.ceil(total / limit);

  //  Skeleton
  if (isLoading) {
    return (
      <section className="my-20 px-4 max-w-7xl mx-auto">
        <h2 className="text-4xl font-bold text-center mb-12">
          🔥 Popular Contests
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="animate-pulse card bg-base-100 shadow-md border border-base-300 flex flex-col"
            >
              <div className="h-52 w-full bg-gray-300 rounded-t-xl" />
              <div className="card-body p-4 space-y-3">
                <div className="h-5 bg-gray-300 rounded w-3/4" />
                <div className="h-4 bg-gray-300 rounded w-full" />
                <div className="h-4 bg-gray-300 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="max-w-7xl mx-auto px-4 my-16">
      <h2 className="text-4xl font-bold text-center mb-10">🎯 All Contests</h2>

      {/*  Type Tabs  */}
      <div className="flex flex-wrap justify-center gap-3 mb-8">
        <button
          onClick={() => {
            setActiveType("all");
            setSearchText("");
            setMaxPrize("");
            setSearchInput("");
            setMaxPrizeInput("");
            setPage(1);
          }}
          className={`btn btn-sm ${
            activeType === "all" ? "btn-primary" : "btn-outline"
          }`}
        >
          All
        </button>

        {contestTypes.map((type) => (
          <button
            key={type}
            onClick={() => {
              setActiveType(type);
              setSearchText("");
              setMaxPrize("");
              setSearchInput("");
              setMaxPrizeInput("");
              setPage(1);
            }}
            className={`btn btn-sm ${
              activeType === type ? "btn-primary" : "btn-outline"
            }`}
          >
            {type}
          </button>
        ))}
      </div>

      {/*  Search + Filter  */}
      <div className="flex flex-wrap justify-center gap-4 mb-10">
        <input
          type="text"
          placeholder="Search by contest name..."
          className="input input-bordered w-72"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Prize"
          className="input input-bordered w-40"
          value={maxPrizeInput}
          onChange={(e) => setMaxPrizeInput(e.target.value)}
        />

        <button
          className="btn btn-primary"
          onClick={() => {
            setSearchText(searchInput);
            setMaxPrize(maxPrizeInput);
            setPage(1);
          }}
        >
          Search
        </button>

        <select
          className="select select-bordered"
          onChange={(e) => {
            setSort(e.target.value);
            setPage(1);
          }}
          value={sort}
        >
          <option value="">Sort By</option>
          <option value="popular">Most Popular</option>
          <option value="latest">Latest</option>
          <option value="prize">Highest Prize</option>
        </select>
      </div>

      {/*  Contest Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
        {contests.map((contest) => (
          <div
            key={contest._id}
            className="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 border border-base-300"
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
                {contest.description?.slice(0, 80)}...
              </p>

              <div className="flex justify-between items-center mt-3">
                <span className="badge badge-secondary text-xs">
                  👥 {contest.participants} Joined
                </span>
                {contest.prize_money && (
                  <span className="badge badge-accent text-xs">
                    💰 ৳ {contest.prize_money}
                  </span>
                )}
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

      {/*  Pagination */}
      <div className="flex justify-center mt-10 gap-3">
        <button
          className="btn btn-sm"
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
        >
          Prev
        </button>

        <span className="px-4 py-2 font-semibold">
          Page {page} / {totalPages || 1}
        </span>

        <button
          className="btn btn-sm"
          disabled={page === totalPages}
          onClick={() => setPage((p) => p + 1)}
        >
          Next
        </button>
      </div>

      {contests.length === 0 && (
        <p className="text-center mt-10 text-gray-500">No contests found.</p>
      )}
    </section>
  );
};

export default AllContests;
