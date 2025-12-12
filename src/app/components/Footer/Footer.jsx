"use client";

import { FaFacebookF, FaTwitter, FaInstagram, FaYoutube } from "react-icons/fa";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      {/* Logo is optional, remove if none */}
      {/* <img src={logo} alt="Logo" className="footer-logo" /> */}

      <ul className="footer-links">
        <li><a href="/" className="footer-link">Home</a></li>
        <li><a href="/AboutUs" className="footer-link">About Us</a></li>
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
