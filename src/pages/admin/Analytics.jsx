import StudentLayout from "../../components/layouts/StudentLayout";

import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";

function Analytics() {
  const data = [
    {
      name: "Bus-1",
      students: 45,
    },
    {
      name: "Bus-2",
      students: 38,
    },
    {
      name: "Bus-3",
      students: 50,
    },
    {
      name: "Bus-4",
      students: 30,
    },
  ];

  return (
    <StudentLayout>
      <h1>📊 Analytics Dashboard</h1>

      <BarChart width={700} height={400} data={data}>
        <CartesianGrid strokeDasharray="3 3" />

        <XAxis dataKey="name" />

        <YAxis />

        <Tooltip />

        <Bar dataKey="students" fill="#2563EB" />
      </BarChart>
    </StudentLayout>
  );
}

export default Analytics;
