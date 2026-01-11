import React, { useEffect, useState } from "react";
import { Link, useSearchParams } from "react-router";
import { useQuery } from "@tanstack/react-query";
import useAxios from "../../../Hooks/useAxios";
import Loading from "../../Loading/Loading";

const CategorySection = () => {
  const axiosInstance = useAxios();
  const [searchParams] = useSearchParams();
  const typeFromQuery = searchParams.get("type");

  const [activeType, setActiveType] = useState(typeFromQuery || "all");

  // Banner search effect
  useEffect(() => {
    if (typeFromQuery) {
      setActiveType(typeFromQuery);
    }
  }, [typeFromQuery]);

  // Load contest types for category buttons
  const { data: contestTypes = [], isLoading } = useQuery({
    queryKey: ["contest-types"],
    queryFn: async () => {
      const res = await axiosInstance.get("/contests/contest_type");
      return res.data;
    },
  });

  if (isLoading) return <Loading />;

  return (
    <section className="py-16">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-8">Contest Categories</h2>

        <div className="flex flex-wrap justify-center gap-3">
          {/* All button */}
          <Link to="/all-contests?type=all">
            <button
              onClick={() => setActiveType("all")}
              className={`btn btn-sm ${
                activeType === "all" ? "btn-primary" : "btn-outline"
              }`}
            >
              All
            </button>
          </Link>

          {/* Dynamic categories */}
          {contestTypes.map((type) => (
            <Link key={type} to={`/all-contests?type=${type}`}>
              <button
                onClick={() => setActiveType(type)}
                className={`btn btn-sm ${
                  activeType === type ? "btn-primary" : "btn-outline"
                }`}
              >
                {type}
              </button>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default CategorySection;
