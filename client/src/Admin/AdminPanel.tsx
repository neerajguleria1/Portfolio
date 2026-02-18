import { useEffect, useState } from "react";
import { useRouter } from "../router";
import AdminSidebar from "./AdminSidebar";
import {
  BarChart, Bar, LineChart, Line,
  XAxis, YAxis, Tooltip, ResponsiveContainer
} from "recharts";

export default function AdminPanel() {
  const { navigate } = useRouter();
  const [open, setOpen] = useState(false); 

  useEffect(() => {
    const isAdmin = localStorage.getItem("isAdmin");
    if (!isAdmin) navigate("/admin/login");
  }, []);

  const data = [
    { month: "Jan", value: 6000 },
    { month: "Feb", value: 3400 },
    { month: "Mar", value: 5200 },
    { month: "Apr", value: 3900 },
    { month: "May", value: 4000 },
    { month: "Jun", value: 1200 },
    { month: "Jul", value: 5000 },
    { month: "Aug", value: 2100 },
    { month: "Sep", value: 4300 },
    { month: "Oct", value: 3100 },
    { month: "Nov", value: 4500 },
    { month: "Dec", value: 3100 },
  ];

  const categories = [
    { name: "Tech", count: 30 },
    { name: "Travel", count: 18 },
    { name: "Food", count: 22 },
    { name: "Business", count: 15 },
    { name: "Lifestyle", count: 12 },
    { name: "Education", count: 10 },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ✅ Sidebar */}
      <AdminSidebar open={open} setOpen={setOpen} />

      {/* ✅ Main Content */}
      <div className="flex-1 p-4 md:p-6 md:ml-64 mt-12 md:mt-0">

        <h1 className="text-2xl font-bold mb-6">Admin Dashboard</h1>

        {/* ✅ Top Stats */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
          <div className="p-4 bg-white rounded shadow text-center"> 
            <p className="font-bold text-lg">120</p>
            <p className="text-sm text-gray-500">Total Posts</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center">
            <p className="font-bold text-lg">450</p>
            <p className="text-sm text-gray-500">Total Users</p>
          </div>
          <div className="p-4 bg-white rounded shadow text-center col-span-2 md:col-span-1">
            <p className="font-bold text-lg">1,234</p>
            <p className="text-sm text-gray-500">Comments</p>
          </div>
        </div>

        {/* ✅ Categories Section */}
        <div className="bg-white p-4 rounded shadow mb-6">
          <h2 className="text-lg font-semibold mb-3">All Categories</h2>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {categories.map((c, idx) => (
              <div 
                key={idx} 
                className="bg-blue-50 hover:bg-blue-100 p-3 rounded text-center cursor-pointer transition"
              >
                <p className="font-semibold text-blue-700">{c.name}</p>
                <p className="text-sm text-gray-600">{c.count} Posts</p>
              </div>
            ))}
          </div>
        </div>

        {/* ✅ Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="p-4 bg-white rounded shadow">
            <h2 className="font-bold mb-2">Monthly Overview</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#3b5fd3" />
              </BarChart>
            </ResponsiveContainer>
          </div>

          <div className="p-4 bg-white rounded shadow">
            <h2 className="font-bold mb-2">Growth Trend</h2>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={data}>
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line dataKey="value" stroke="#3b5fd3" strokeWidth={3} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}
