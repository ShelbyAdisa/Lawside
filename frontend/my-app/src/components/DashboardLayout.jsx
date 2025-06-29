import React from "react";
import Navbar from "../pages/Navbar"; 

const DashboardLayout = ({ children }) => {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar appears once here */}
      <Navbar />

      {/* Main content area */}
      <main className="flex-1 bg-gray-100 p-6">
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
