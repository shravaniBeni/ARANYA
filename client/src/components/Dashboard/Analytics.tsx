"use client";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

const data = [
  { name: "Positive", value: 45.2, color: "#22c55e" },
  { name: "Neutral", value: 32.8, color: "#facc15" },
  { name: "Negative", value: 22.0, color: "#ef4444" },
];

export default function Analytics() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Sentiment Analysis */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Sentiment Analysis</h2>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie data={data} dataKey="value" nameKey="name" outerRadius={80}>
              {data.map((entry, index) => (
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

      {/* Top Issues */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Top Issues</h2>
        <ul className="space-y-3 text-sm">
          <li className="flex justify-between">
            <span>Subsidy Delay</span>
            <span className="text-red-500">Pending</span>
          </li>
          <li className="flex justify-between">
            <span>Document Verification</span>
            <span className="text-green-500">Resolved</span>
          </li>
          <li className="flex justify-between">
            <span>Application Status</span>
            <span className="text-yellow-500">In Progress</span>
          </li>
          <li className="flex justify-between">
            <span>Payment Issues</span>
            <span className="text-red-500">Pending</span>
          </li>
        </ul>
      </div>

      {/* Feedback Keywords */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Feedback Keywords</h2>
        <div className="text-gray-500 text-sm">Coming soon...</div>
      </div>
    </div>
  );
}
