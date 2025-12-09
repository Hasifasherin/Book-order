import React from "react";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";

export default function AboutUs() {
  return (
    <>
    <Header />
    <div className="max-w-4xl mx-auto p-6 leading-relaxed text-zinc-800 dark:text-white">
      
      <section className="mb-10">
        <h1 className="text-3xl font-bold mb-3">About Us – BookOrder App</h1>
        <p>
          Welcome to <strong>BookOrder</strong>, your all-in-one online platform
          for buying, managing, and discovering books with ease.
        </p>
        <br />
        <p>
          At BookOrder, we believe that reading should be simple, accessible, and
          enjoyable for everyone. Our mission is to build a user-friendly space
          where students, teachers, book lovers, and lifelong learners can
          explore and order books effortlessly — anytime, anywhere.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">⭐ Our Vision</h2>
        <p>
          To make books available to every reader, by offering a seamless and
          hassle-free ordering experience.
        </p>
      </section>

      <section className="mb-10">
        <h2 className="text-2xl font-semibold mb-2">⭐ What We Do</h2>
        <ul className="list-disc ml-6 space-y-1">
          <li>Provide a clean and easy app to browse books</li>
          <li>Offer fast and secure ordering</li>
          <li>Give real-time order tracking</li>
          <li>Deliver personalized book recommendations</li>
          <li>Ensure smooth and safe payments</li>
        </ul>
      </section>

    </div>
    <Footer />
    </>
  );
}
