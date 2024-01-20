"use client";

import { DbCards } from "@/components/dashboard/Cards";
import { LineCharts } from "@/components/dashboard/LineCharts";

function Dashboard() {
  return (
    <div className="flex flex-col space-y-8 items-center">
      <DbCards />
      <LineCharts />
    </div>
  );
}

export default Dashboard;
