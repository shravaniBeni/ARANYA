"use client";

export default function Claims() {
  return (
    <div className="bg-white shadow rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Claims Overview</h2>

      <table className="w-full border text-sm">
        <thead className="bg-gray-100">
          <tr>
            <th className="text-left p-2 border">Claim ID</th>
            <th className="text-left p-2 border">User</th>
            <th className="text-left p-2 border">Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="p-2 border">CLM-001</td>
            <td className="p-2 border">Rajesh Kumar</td>
            <td className="p-2 border text-yellow-500">Pending</td>
          </tr>
          <tr>
            <td className="p-2 border">CLM-002</td>
            <td className="p-2 border">Priya Sharma</td>
            <td className="p-2 border text-green-500">Approved</td>
          </tr>
          <tr>
            <td className="p-2 border">CLM-003</td>
            <td className="p-2 border">Amit Patel</td>
            <td className="p-2 border text-red-500">Rejected</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
