"use client";

export default function VoiceFeedback() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Complaint Distribution */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Complaint Distribution Map</h2>
        <div className="w-full h-72 bg-gray-200 flex items-center justify-center rounded-md">
          Map Component (Placeholder)
        </div>
      </div>

      {/* Recent Feedback */}
      <div className="bg-white shadow rounded-lg p-4">
        <h2 className="text-lg font-semibold mb-4">Recent Feedback</h2>
        <ul className="space-y-3 text-sm">
          <li className="text-red-500">"Subsidy amount not received for 3 months" - Rajesh Kumar</li>
          <li className="text-green-500">"Very helpful staff, quick resolution" - Priya Sharma</li>
          <li className="text-yellow-500">"Application process is confusing" - Amit Patel</li>
        </ul>
      </div>
    </div>
  );
}
