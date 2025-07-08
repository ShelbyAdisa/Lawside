import React, { useContext } from "react";
import DashboardLayout from "../components/DashboardLayout";
import ClientDashboard from "../components/ClientDashboard";
import LawyerDashboard from "../components/LawyerDashboard";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user } = useContext(UserContext);
  console.log("🔍 user from context:", user);

  if (!user) {
    return (
      <DashboardLayout>
        <p className="text-gray-600">Loading...</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      {user.role === "lawyer" ? (
        <LawyerDashboard />
      ) : (
        <ClientDashboard />
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
