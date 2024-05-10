import React from "react";
import SideBar from "./Sidebar";
import DashboardCard from "./DashboardCard";

const Dashboard = () => {
  return (
    <div className="flex w-full gap-6">
      <div className="w-[17vw] bg-primary ">
        <SideBar />
      </div>
      <div className="w-[83vw]">
        <DashboardCard />
      </div>
    </div>
  );
};

export default Dashboard;
