import React from "react";
import { Link } from "react-router";

const CTASection = () => {
  return (
    <section className="py-16  ">
      <div className="max-w-5xl mx-auto px-4 text-center">
        <h2 className="text-4xl md:text-5xl font-bold mb-6">
          🚀 Ready to Showcase Your Talent?
        </h2>
        <p className="text-lg md:text-xl mb-8 opacity-90">
          Join ContestHub today and start participating in exciting contests, win rewards, and grow your portfolio!
        </p>
        <div className="flex flex-col md:flex-row justify-center gap-4">
          <Link to="/register">
            <button className="btn btn-primary px-8 py-3 text-lg font-semibold">
              Join Now
            </button>
          </Link>
          <Link to="/all-contests">
            <button className="btn btn-secondary  px-8 py-3 text-lg font-semibold">
              Explore Contests
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CTASection;
