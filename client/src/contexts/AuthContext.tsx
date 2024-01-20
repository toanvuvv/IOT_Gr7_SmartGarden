"use client";

import { createContext, useContext, useEffect, useState } from "react";

import { useRouter } from "next/navigation";
import { SignInDTO, SignUpDTO, UserType } from "@/utils/type";
import Cookies from "js-cookie";
export const AuthContext = createContext<{
  user: UserType | null;
  signIn: (signInDto: SignInDTO) => void;
  signUp: (signUpDto: SignUpDTO) => void;
  logout: () => void;
}>({
  user: null,
  signIn: () => {},
  signUp: () => {},
  logout: () => {},
});

export const AuthContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<UserType | null>(null);
  const router = useRouter();
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const signIn = async (signInDto: SignInDTO) => {
    const res = await signInRequest(signInDto);
    console.log("res::", res);
    setUser(res.payload);
    Cookies.set("uid", res.payload.id, { expires: 1 / 12 });
    Cookies.set("username", res.payload.username, { expires: 1 / 12 });
  };
  const logout = async () => {
    try {
      Cookies.remove("uid");
      Cookies.remove("username");
      setUser(null);
    } catch (error) {
      console.log(error);
    }
  };
  const signUp = async (signUpDto: SignUpDTO) => {
    await signUpRequest(signUpDto);
    router.push("/login");
  };

  useEffect(() => {
    const uid = Cookies.get("uid");
    const username = Cookies.get("username");
    console.log("uid::", uid);
    if (uid && username) {
      setUser({ id: uid, username });
    }
    setIsLoaded(true);
  }, []);
  return isLoaded ? (
    <AuthContext.Provider value={{ user, signIn, signUp, logout }}>
      {children}
    </AuthContext.Provider>
  ) : (
    ""
  );
};

const signInRequest = async (signInDto: SignInDTO) => {
  try {
    const res = await fetch("http://localhost:8080/login", {
      method: "POST",
      body: JSON.stringify(signInDto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res::", res);
    if (res.ok) {
      return await res.json();
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};

const signUpRequest = async (signUpDto: SignUpDTO) => {
  try {
    const res = await fetch("http://localhost:8080/register", {
      method: "POST",
      body: JSON.stringify(signUpDto),
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("res::", res);
    if (res.ok) {
      const data = await res.json();
      return data;
    } else {
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.log(error);
  }
};
export const UserAuth = () => useContext(AuthContext);
