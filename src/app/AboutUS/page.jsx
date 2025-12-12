"use client";

import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import "./About.css";

export default function AboutUs() {
  return (
    <>
      <Header />

      <div className="about-container">

        <h1 className="about-title">About Us</h1>

        <p className="about-text">
          Welcome to <strong>Cart-in!</strong> We are an online store offering
          high-quality products at affordable prices. Our mission is to provide
          the best shopping experience with trusted service, fast delivery, and
          secure payment options.
        </p>

        <h2 className="about-subtitle">Why Choose Us?</h2>

        <ul className="about-list">
          <li>✔ 100% quality products</li>
          <li>✔ Safe & secure checkout</li>
          <li>✔ Fast delivery</li>
          <li>✔ Easy returns</li>
          <li>✔ Friendly customer support</li>
        </ul>

      </div>

      <Footer />
    </>
  );
}
