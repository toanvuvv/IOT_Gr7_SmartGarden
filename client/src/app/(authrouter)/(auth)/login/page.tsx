"use client";

import { AuthContext } from "@/contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useContext, useEffect, useState } from "react";
// import { UserAuth } from "@/contexts/AuthContext";
function Login() {
  const router = useRouter();
  const { signIn, user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  useEffect(() => {
    if (user && user.id) {
      router.push("/dashboard");
    }
  }, [user]);
  return (
    <div className="p-12 bg-white rounded shadow-xl w-1/3 bg-opacity-85">
      <h1 className="text-3xl font-bold mb-4">Login</h1>
      <TextField
        className="w-full"
        label="Email"
        variant="outlined"
        style={{
          marginBottom: "1rem",
        }}
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="w-full"
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
        style={{
          marginBottom: "1rem",
        }}
        onChange={(e) => setPassword(e.target.value)}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton edge="end" onClick={handleClickShowPassword}>
                {showPassword ? <Visibility /> : <VisibilityOff />}
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
      <Button
        className="w-full"
        variant="contained"
        color="primary"
        style={{
          marginBottom: "0.5rem",
          color: "black",
          backgroundColor: "white",
          padding: "0.5rem",
        }}
        onClick={() => {
          signIn({
            gmail: email,
            password: password,
          });
        }}
      >
        Login
      </Button>
      <Link
        href="register"
        className="mt-4 inline-block text-base text-black align-baseline hover:text-green-800 w-full text-center"
      >
        Don't have an account?
      </Link>
    </div>
  );
}

export default Login;

const GoogleIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    x="0px"
    y="0px"
    width="30"
    height="30"
    viewBox="0 0 48 48"
  >
    <path
      fill="#FFC107"
      d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
    <path
      fill="#FF3D00"
      d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"
    ></path>
    <path
      fill="#4CAF50"
      d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"
    ></path>
    <path
      fill="#1976D2"
      d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"
    ></path>
  </svg>
);
