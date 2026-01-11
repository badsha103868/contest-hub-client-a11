import React from "react";
import { Link } from "react-router";

const blogs = [
  { title: "5 Tips to Win Design Contests", link: "#" },
  { title: "Top 10 Video Editing Tricks", link: "#" },
  { title: "How to Write Winning Articles", link: "#" },
];

const BlogSection = () => {
  return (
    <section className="py-16 bg-base-100 text-base-content">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-4xl font-bold mb-12">📝 Latest Blogs</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {blogs.map((b, i) => (
            <Link
              key={i}
              to={b.link}
              className="bg-base-200 rounded-xl shadow-lg p-6 hover:shadow-2xl transition duration-300"
            >
              <h3 className="font-bold text-xl mb-2">{b.title}</h3>
              <p className="text-base-content/70">Read tips, tricks & guides to win contests easily.</p>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BlogSection;
