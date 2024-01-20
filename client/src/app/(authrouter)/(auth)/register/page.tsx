"use client";
import { AuthContext } from "@/contexts/AuthContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { Button, IconButton, InputAdornment, TextField } from "@mui/material";
import Link from "next/link";
import React, { useContext, useState } from "react";

function Register() {
  const { signUp } = useContext(AuthContext);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullname, setFullname] = useState("");
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  return (
    <div className="p-12 bg-white rounded shadow-xl w-1/3 bg-opacity-85">
      <h1 className="text-3xl font-bold mb-4">Register</h1>
      <TextField
        className="w-full mb-5"
        label="Email"
        variant="outlined"
        onChange={(e) => setEmail(e.target.value)}
      />
      <TextField
        className="w-full mb-5"
        label="Fullname"
        variant="outlined"
        onChange={(e) => setFullname(e.target.value)}
      />
      <TextField
        className="w-full mb-5 "
        label="Password"
        variant="outlined"
        type={showPassword ? "text" : "password"}
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
        className="w-full p-2 text-black  bg-white hover:text-white hover:bg-green-500"
        variant="contained"
        color="primary"
        onClick={() => {
          console.log({
            gmail: email,
            password: password,
            username: fullname,
          });
          signUp({
            gmail: email,
            password: password,
            username: fullname,
          });
        }}
      >
        Register
      </Button>
      <Link
        href="login"
        className="mt-4 inline-block text-base text-black align-baseline hover:text-green-800 w-full text-center"
      >
        Have already an account?
      </Link>
    </div>
  );
}

export default Register;
