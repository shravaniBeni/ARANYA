"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { CheckCircle, FileText, AlertTriangle, Mic, Leaf } from "lucide-react";

const sentimentData = [
  { name: "Positive", value: 45.2, color: "#22c55e" },
  { name: "Neutral", value: 32.8, color: "#facc15" },
  { name: "Negative", value: 22.0, color: "#ef4444" },
];

const activities = [
  {
    id: 1,
    icon: <CheckCircle className="w-5 h-5 text-green-500" />,
    title: "Claim approved in Village A",
    desc: "Forest officer verified 2.5 hectare claim",
    time: "2 minutes ago",
  },
  {
    id: 2,
    icon: <FileText className="w-5 h-5 text-blue-500" />,
    title: "New claim submitted",
    desc: "Farmer Raj Kumar - 1.8 hectares in Village B",
    time: "15 minutes ago",
  },
  {
    id: 3,
    icon: <AlertTriangle className="w-5 h-5 text-yellow-500" />,
    title: "Payment complaint registered",
    desc: "Village C - Delayed compensation payment",
    time: "1 hour ago",
  },
  {
    id: 4,
    icon: <Mic className="w-5 h-5 text-purple-500" />,
    title: "Voice feedback received",
    desc: "Audio complaint about scheme awareness",
    time: "2 hours ago",
  },
  {
    id: 5,
    icon: <Leaf className="w-5 h-5 text-green-600" />,
    title: "Scheme enrollment completed",
    desc: "25 farmers enrolled in Village A conservation program",
    time: "3 hours ago",
  },
];

export default function Analytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left side main content */}
      <div className="lg:col-span-2 space-y-6">
        {/* Top 3 analytics cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Total Claims */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500">Total Claims</h2>
            <p className="text-2xl font-bold">1,247</p>
            <p className="text-sm text-green-500">↑ 12% from last month</p>
          </div>
          {/* Approval Rate */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500">Approval Rate</h2>
            <p className="text-2xl font-bold">67.8%</p>
            <p className="text-sm text-red-500">↓ 3% from last month</p>
          </div>
          {/* Schemes Linked */}
          <div className="bg-white shadow rounded-lg p-4">
            <h2 className="text-sm font-medium text-gray-500">Schemes Linked</h2>
            <p className="text-2xl font-bold">18</p>
            <p className="text-sm text-green-500">+2 new schemes</p>
          </div>
        </div>

        {/* Recent Activity Feed */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
          <ul className="space-y-4">
            {activities.map((activity) => (
              <li key={activity.id} className="flex items-start gap-3">
                <div className="flex-shrink-0">{activity.icon}</div>
                <div>
                  <p className="text-sm font-medium text-gray-900">
                    {activity.title}
                  </p>
                  <p className="text-sm text-gray-500">{activity.desc}</p>
                  <span className="text-xs text-gray-400">{activity.time}</span>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Right sidebar */}
      <div className="space-y-6">
        {/* Voice Feedback Alerts */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold">Voice Feedback Alerts</h2>
          <p className="text-sm text-gray-500 mb-3">
            Pending complaints and feedback
          </p>
          <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-red-700 font-medium">Payment Delays</p>
            <p className="text-sm text-gray-600">
              15 complaints from Village X
            </p>
            <div className="flex gap-2 mt-2">
              <button className="px-3 py-1 bg-red-500 text-white rounded-md text-sm">
                Assign
              </button>
              <button className="px-3 py-1 bg-gray-700 text-white rounded-md text-sm">
                Resolve
              </button>
            </div>
            <span className="text-xs text-gray-400 block mt-1">
              2 hours ago
            </span>
          </div>
        </div>

        {/* Sentiment Analysis */}
        <div className="bg-white shadow rounded-lg p-4">
          <h2 className="text-lg font-semibold mb-4">Sentiment Analysis</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sentimentData}
                dataKey="value"
                nameKey="name"
                outerRadius={80}
              >
                {sentimentData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-around mt-4 text-sm">
            <span className="text-green-500">Positive</span>
            <span className="text-yellow-500">Neutral</span>
            <span className="text-red-500">Negative</span>
          </div>
        </div>
      </div>
    </div>
  );
}