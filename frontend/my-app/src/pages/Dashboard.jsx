// import React, { useContext } from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import { UserContext } from "../context/UserContext";
// import ClientDashboard from "../components/ClientDashboard";
// import LawyerDashboard from "../components/LawyerDashboard";

// const Dashboard = () => {
//   const { user, loading } = useContext(UserContext);
//   console.log("User object from context:", user);

//   if (loading) {
//     return (
//       <DashboardLayout>
//         <p className="text-gray-600">Loading...</p>
//       </DashboardLayout>
//     );
//   }

//   if (!user) {
//     return (
//       <DashboardLayout>
//         <p className="text-red-500">You are not logged in.</p>
//       </DashboardLayout>
//     );
//   }

//   return (
//     <DashboardLayout>
//       <h2 className="text-2xl font-semibold text-gray-800 mb-4">
//         Welcome, <span className="text-blue-600">{user.email}</span>
//       </h2>

//       {user.user_type === "lawyer" && <LawyerDashboard />}
//       {user.user_type === "client" && <ClientDashboard />}
//     </DashboardLayout>
//   );
// };

// export default Dashboard;

import React from "react";
import DashboardLayout from "../components/DashboardLayout";
import ClientDashboard from "../components/ClientDashboard";

const Dashboard = () => {
  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome, <span className="text-blue-600">demo-client@example.com</span>
      </h2>
      <ClientDashboard />
    </DashboardLayout>
  );
};

export default Dashboard;
