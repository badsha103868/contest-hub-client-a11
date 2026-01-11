import React, { useState } from "react";
import { useNavigate } from "react-router";
import { FaArrowDown } from "react-icons/fa";

const Banner = () => {
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    if (!search.trim()) return;
    navigate(`/all-contests?type=${search}`);
  };

  return (
    <section className="relative hero min-h-[65vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-base-content">
      {/* overlay */}
      <div className="hero-overlay bg-black/40"></div>

      {/* content */}
      <div className="hero-content text-center">
        <div className="max-w-2xl animate-fadeIn">
          <h1 className="text-3xl md:text-5xl font-bold mb-6 leading-tight">
            Discover Creative Contests <br /> & Win Big
          </h1>

          <p className="mb-8 text-lg md:text-xl opacity-90">
            Explore contests like Image Design, Article Writing, Video Editing
            and showcase your talent.
          </p>

          {/* Search */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3 justify-center"
          >
            <input
              type="text"
              placeholder="Search by contest type..."
              className="input input-bordered w-full md:w-80 text-primary font-semibold"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary px-8 text-white hover:scale-105 transition-transform"
            >
              Search Contests
            </button>
          </form>
        </div>
      </div>

      {/* scroll indicator */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 animate-bounce">
        <FaArrowDown className="text-2xl opacity-80" />
      </div>
    </section>
  );
};

export default Banner;
