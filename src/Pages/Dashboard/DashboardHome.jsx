import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useRole from "../../Hooks/useRole";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  PieChart,
  Pie,
  Cell,
  ResponsiveContainer,
} from "recharts";

const DashboardHome = () => {
  const axiosSecure = useAxiosSecure();
  const { role, roleLoading } = useRole();
  const [overview, setOverview] = useState({});

  // fetch profile/dashboard data
  const { data: profileData } = useQuery({
    queryKey: ["my-profile"],
    queryFn: async () => {
      const res = await axiosSecure.get("/my-profile");
      return res.data;
    },
    enabled: !roleLoading,
  });

  // Admin specific overview
  const { data: adminData } = useQuery({
    queryKey: ["admin-overview"],
    queryFn: async () => {
      if (role !== "admin") return {};
      const usersRes = await axiosSecure.get("/users");
      const contestsRes = await axiosSecure.get("/contests");
      return {
        totalUsers: usersRes.data.length || 0,
        totalContests: contestsRes.data.contests?.length || 0,
      };
    },
    enabled: role === "admin",
  });

  useEffect(() => {
    if (profileData) setOverview(profileData);
  }, [profileData]);

  if (roleLoading) return <div>Loading...</div>;

  // Chart data for all roles
  let chartData = [];
  if (role === "user") {
    chartData = [
      { name: "Participated", value: overview.participated || 0 },
      { name: "Wins", value: overview.wins || 0 },
    ];
  } else if (role === "creator") {
    chartData = [
      { name: "Approved", value: overview.approvedContests || 0 },
      { name: "Rejected", value: overview.rejectedContests || 0 },
    ];
  } else if (role === "admin") {
    chartData = [
      { name: "Total Users", value: adminData?.totalUsers || 0 },
      { name: "Total Contests", value: adminData?.totalContests || 0 },
    ];
  }

  return (
    <div className="p-4">
      <h2 className="text-xl font-bold mb-4">
        Dashboard Overview ({role?.toUpperCase()})
      </h2>

      {/* Overview Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {role === "user" && (
          <>
            <div className="card bg-base-200 p-4 text-center">
              Participated: {overview.participated || 0}
            </div>
            <div className="card bg-base-200 p-4 text-center">
              Wins: {overview.wins || 0}
            </div>
            <div className="card bg-base-200 p-4 text-center">
              Win %: {overview.winPercentage || 0}%
            </div>
          </>
        )}

        {role === "creator" && (
          <>
            <div className="card bg-base-200 p-4 text-center">
              Created: {overview.createdContests || 0}
            </div>
            <div className="card bg-base-200 p-4 text-center">
              Approved: {overview.approvedContests || 0}
            </div>
            <div className="card bg-base-200 p-4 text-center">
              Rejected: {overview.rejectedContests || 0}
            </div>
            <div className="card bg-base-200 p-4 text-center">
              Wins: {overview.wins || 0}
            </div>
          </>
        )}

        {role === "admin" && (
          <>
            <div className="card bg-base-200 p-4 text-center">
              Total Users: {adminData?.totalUsers || 0}
            </div>
            <div className="card bg-base-200 p-4 text-center">
              Total Contests: {adminData?.totalContests || 0}
            </div>
          </>
        )}
      </div>

      {/* Charts */}
      <h2 className="text-xl font-bold mb-4">Charts</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>

        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
            >
              {chartData.map((entry, index) => (
                <Cell
                  key={`cell-${index}`}
                  fill={index % 2 === 0 ? "#8884d8" : "#82ca9d"}
                />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardHome;
