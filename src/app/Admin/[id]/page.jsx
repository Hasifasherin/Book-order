"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { IMAGE_BASE_URL } from "@/app/utils/baseUrl";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import styles from "./details.module.css";

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      try {
        const res = await api.get(`/admin/products/${id}`);
        setBook(res.data.product);
      } catch (err) {
        console.error("Failed to load book:", err);
        alert("Failed to load book.");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!book) return <div className={styles.loading}>Book not found</div>;

  return (
    <>
      <Header />
      <main className={styles.bookDetailsContainer}>
        <button className={styles.backBtn} onClick={() => router.push("/")}>
          ← Back
        </button>

        <div className={styles.bookDetailsContent}>
          <div className={styles.bookImage}>
            <img src={IMAGE_BASE_URL + book.image} alt={book.title} />
          </div>

          <div className={styles.bookInfo}>
            <h1 className={styles.bookTitle}>{book.title}</h1>
            <p className={styles.bookCategory}><strong>Category:</strong> {book.category}</p>
            <p className={styles.bookPrice}><strong>Price:</strong> ₹{book.price}</p>
            <p className={styles.bookDescription}>{book.description}</p>

            <button
              className={styles.editBtn}
              onClick={() => router.push(`/Admin/${id}/edit`)}
            >
              Edit Book
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
