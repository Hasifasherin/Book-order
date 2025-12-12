"use client";

import Link from "next/link";
import { useAuth } from "../../context/AuthContext"; // adjust path
import { useRouter } from "next/navigation";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const handleLogout = () => {
    logout();
    router.push("/login"); // redirect to login page after logout
  };

  return (
    <header className="p-8 bg-green-300 text-black flex justify-between items-center">
      <h1 className="font-bold text-xl">Cart-in</h1>
      <nav className="flex items-center ">
        <Link href="/" className="mr-4">Home</Link>
        <Link href="/AboutUS" className="mr-4">About us</Link>
        <Link href="/Contact" className="mr-4">Contact us</Link>
        {user && (
          <button
            onClick={handleLogout}
            className="ml-4 bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
