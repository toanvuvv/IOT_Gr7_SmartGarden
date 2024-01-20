"use client";
import React, { useContext } from "react";
import { AuthContext } from "@/contexts/AuthContext";
function Dashboard() {
  const { user } = useContext(AuthContext);
  return (
    <div>
      <h1>Username: {user?.username}</h1>
      <h2>Id: {user?.id}</h2>
    </div>
  );
}

export default Dashboard;



