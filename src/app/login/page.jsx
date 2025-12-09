"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useAuth } from "../context/AuthContext"
import { toast } from "react-toastify";
import "./login.css";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(username, password);
    if (success) router.push("/"); 
    else toast.error("Login failed");
  };

  return (
    <div className="container">
      <div className="box">
        <h2 className="title">Login</h2>
        <form onSubmit={handleSubmit} className="form">
          <input type="text" placeholder="Enter Username" value={username} onChange={(e) => setUsername(e.target.value)} className="input" />
          <input type="password" placeholder="Enter Password" value={password} onChange={(e) => setPassword(e.target.value)} className="input" />
          <button type="submit" className="button">Login</button>
        </form>
        <Link href="/signup" className="link">Don't have an account? Create new</Link>
      </div>
    </div>
  );
}
