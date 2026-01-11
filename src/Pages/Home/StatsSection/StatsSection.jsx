import React from "react";

const stats = [
  { label: "Total Contests", value: 1200 },
  { label: "Total Winners", value: 500 },
  { label: "Participants", value: 15000 },
  { label: "Paid Contests", value: 800 },
];

const StatsSection = () => {
  return (
    <section className="py-16 bg-base-200 text-base-content">
      <div className="max-w-7xl mx-auto px-4 text-center">
        {/* Title */}
        <h2 className="text-4xl  font-bold mb-2">
          📊 Platform Overview
        </h2>
        <p className="text-lg mb-10 opacity-90">
          Check out our amazing growth and active community!
        </p>

        {/* Stats Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6">
          {stats.map((s, i) => (
            <div
              key={i}
              className="bg-base-100 dark:bg-base-300 rounded-xl shadow-lg p-6"
            >
              <h3 className="text-4xl font-bold">{s.value}</h3>
              <p className="mt-2 text-sm">{s.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
