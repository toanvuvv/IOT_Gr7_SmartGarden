"use client";
import React, { useEffect, useState } from "react";

function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen py-2 bg-cover bg-center "
      style={{
        backgroundImage:
          "url('https://3.bp.blogspot.com/-v9pBvKdIYSM/U3wtnZuBaBI/AAAAAAAAQKs/brU9EkDmcz0/s1600/t%C3%A1t+n%C6%B0%E1%BB%9Bc.jpg')",
      }}
    >
      {children}
    </div>
  );
}

export default AuthLayout;
