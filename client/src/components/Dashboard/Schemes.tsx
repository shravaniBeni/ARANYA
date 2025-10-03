"use client";

export default function Schemes() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Schemes Overview</h2>
      <p className="text-gray-600 text-sm">
        View and manage all government schemes data here.
      </p>

      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold">Agriculture Subsidy</h3>
          <p className="text-sm text-gray-600">Active: 2300</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold">Health Insurance</h3>
          <p className="text-sm text-gray-600">Active: 1200</p>
        </div>
        <div className="p-4 border rounded-lg bg-gray-50">
          <h3 className="font-semibold">Education Support</h3>
          <p className="text-sm text-gray-600">Active: 1800</p>
        </div>
      </div>
    </div>
  );
}
