// // src/pages/Dashboard.jsx
// import React, { useContext } from "react";
// import DashboardLayout from "../components/DashboardLayout";
// import { UserContext } from "../context/UserContext";

// const Dashboard = () => {
//   const { user, loading } = useContext(UserContext);

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

//       {user.is_lawyer && (
//         <section className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-bold mb-2 text-blue-700">Your Appointments</h3>
//           <p className="text-gray-700">Manage your upcoming consultations here.</p>
//           {/* Add appointment list or calendar UI here */}
//         </section>
//       )}

//       {user.is_client && (
//         <section className="bg-white p-4 rounded shadow">
//           <h3 className="text-lg font-bold mb-2 text-green-700">Find a Lawyer</h3>
//           <p className="text-gray-700">Start booking a consultation with available lawyers.</p>
//           {/* Add booking/search UI here */}
//         </section>
//       )}
//     </DashboardLayout>
//   );
// };

// export default Dashboard;
// src/pages/Dashboard.jsx
import React, { useContext } from "react";
import DashboardLayout from "../components/DashboardLayout";
import { UserContext } from "../context/UserContext";

const Dashboard = () => {
  const { user, loading } = useContext(UserContext);
  console.log("User object from context:", user);


  if (loading) {
    return (
      <DashboardLayout>
        <p className="text-gray-600">Loading...</p>
      </DashboardLayout>
    );
  }

  if (!user) {
    return (
      <DashboardLayout>
        <p className="text-red-500">You are not logged in.</p>
      </DashboardLayout>
    );
  }

  return (
    <DashboardLayout>
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">
        Welcome, <span className="text-blue-600">{user.email}</span>
      </h2>

      {user.user_type === "lawyer" && (
        <section className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-bold mb-2 text-blue-700">Your Appointments</h3>
          <p className="text-gray-700">Manage your upcoming consultations here.</p>
          {/* TODO: Add appointment list or calendar UI here */}
        </section>
      )}

      {user.user_type === "client" && (
        <section className="bg-white p-4 rounded shadow mb-6">
          <h3 className="text-lg font-bold mb-2 text-green-700">Find a Lawyer</h3>
          <p className="text-gray-700">Start booking a consultation with available lawyers.</p>
          {/* TODO: Add booking/search UI here */}
        </section>
      )}
    </DashboardLayout>
  );
};

export default Dashboard;
