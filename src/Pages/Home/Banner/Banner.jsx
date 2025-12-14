import React, { useState } from 'react';
import { useNavigate } from 'react-router';

const Banner = () => {
  //  search state
  const [search, setSearch]= useState("");
  const navigate = useNavigate()
   
  const handleSearch=(e)=>{
    e.preventDefault();
    if(!search.trim())
      return;
    navigate(`/all-contests?type=${search}`)
  }


  return (
   <div className="hero min-h-[50vh] bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white">
      <div className="hero-overlay bg-black/30"></div>

      <div className="hero-content text-center">
        <div className="max-w-2xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            Discover Creative Contests & Win Big
          </h1>

          <p className="mb-8 text-lg opacity-90">
            Search contests by category like Image Design, Article Writing, Video Editing & more
          </p>

          {/* 🔍 Search Bar */}
          <form
            onSubmit={handleSearch}
            className="flex flex-col md:flex-row gap-3"
          >
            <input
              type="text"
              placeholder="Search by contest type..."
              className="input input-bordered w-full text-primary"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

            <button
              type="submit"
              className="btn btn-primary px-8 text-white"
            >
              Search
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Banner;