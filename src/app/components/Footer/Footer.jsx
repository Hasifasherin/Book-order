"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";
import Image from "next/image";
import Link from "next/link";



export default function Footer() {
  return (
    <footer className="footer">
      {/* Logo is optional, remove if none */}
      <div className="footer-center">
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

      <ul className="footer-links">
        <li><a href="/" className="footer-link">Home</a></li>
        <li><a href="/AboutUS" className="footer-link">About Us</a></li>
        <li><a href="/Contact" className="footer-link">Contact Us</a></li>
      </ul>

      <div className="footer-social">
        <FaFacebookF className="social-icon" />
        <FaTwitter className="social-icon" />
        <FaInstagram className="social-icon" />
        <FaYoutube className="social-icon" />
      </div>

      <p className="footer-copy">© 2025 MyApp. All Rights Reserved.</p>
    </footer>
  );
}
