"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../../context/AuthContext";
import Image from "next/image";
import "./Header.css";

export default function Header() {
  const { user, logout } = useAuth();
  const router = useRouter();
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const menuRef = useRef(null);

  const handleLogout = () => {
    logout();
    router.push("/login");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (menuRef.current && !menuRef.current.contains(e.target)) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      {/* LEFT */}
      <div className="header-left">
        <Link href="/">
          <Image
            src="/logo.png"
            alt="Logo"
            width={50}
            height={50}
            priority
            className="header-logo cursor-pointer"
          />
        </Link>
      </div>

      {/* CENTER */}
      <nav>
        <ul className="nav-links">
          <li><Link href="/" className="nav-link">Home</Link></li>
          <li><Link href="/AboutUS" className="nav-link">About</Link></li>
          <li><Link href="/Contact" className="nav-link">Contact</Link></li>
        </ul>
      </nav>

      {/* RIGHT */}
      {user && (
        <div className="header-right" ref={menuRef}>
          <FiUser
            size={32}
            className="user-icon"
            onClick={() => setDropdownOpen((prev) => !prev)}
          />

          {dropdownOpen && (
            <div className="dropdown">
              <div
                className="dropdown-item"
                onClick={() => {
                  router.push("/cart");
                  setDropdownOpen(false);
                }}
              >
                View Cart
              </div>

              <div
                className="dropdown-item logout"
                onClick={handleLogout}
              >
                Logout
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
