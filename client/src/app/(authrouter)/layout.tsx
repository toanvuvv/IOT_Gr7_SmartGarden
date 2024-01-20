"use client";
import { AuthContext, AuthContextProvider } from "@/contexts/AuthContext";
import { useRouter, usePathname } from "next/navigation";
import React, { useContext, useEffect } from "react";
function AuthRouterLayout({ children }: { children: React.ReactNode }) {
  const { user } = useContext(AuthContext);
  const pathname = usePathname();
  const router = useRouter();
  useEffect(() => {
    if (user && user.id) {
      if (pathname === "/login") {
        router.push("/dashboard");
      }
    } else {
      router.push("/login");
    }
  }, [user]);
  console.log("user::", user);
  return <div>{children}</div>;
}

export default AuthRouterLayout;
