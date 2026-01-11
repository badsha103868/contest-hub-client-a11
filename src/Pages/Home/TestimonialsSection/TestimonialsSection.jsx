import React from "react";

const testimonials = [
  { name: "Alice", text: "Won my first contest here! Highly recommend." },
  { name: "Bob", text: "Amazing platform for creators of all kinds." },
  { name: "Charlie", text: "I improved my skills and portfolio here!" },
];

const TestimonialsSection = () => {
  return (
    <section className="py-16 bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-8 ">
          💬 What Our Users Say
        </h2>
        <p className="text-lg mb-10 opacity-90">
          Hear from creators and participants who trusted ContestHub.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((t, i) => (
            <div
              key={i}
              className="bg-base-100 dark:bg-base-300 rounded-xl shadow-lg p-6 hover:shadow-2xl transition-all duration-300"
            >
              <p className="mb-4">"{t.text}"</p>
              <h4 className="font-bold text-lg">{t.name}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
