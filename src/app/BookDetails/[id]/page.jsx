"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { IMAGE_BASE_URL } from "@/app/utils/baseUrl";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";

export default function BookDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  // Fetch book by ID
  const fetchBook = async () => {
    try {
      const res = await api.get(`/admin/product/${id}`);
      setBook(res.data);
    } catch (err) {
      console.error("Failed to fetch book details:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchBook();
  }, []);

  const handleDelete = async () => {
    try {
      await api.delete(`/admin/delete-product/${id}`);
      alert("Book deleted!");
      router.push("/"); // Go back home
    } catch (err) {
      console.error(err);
      alert("Failed to delete book!");
    }
  };

  if (loading) return <div>Loading...</div>;
  if (!book) return <div>Book not found</div>;

  return (
    <>
      <Header />

      <main style={{ padding: "20px", minHeight: "70vh" }}>
        <button
          onClick={() => router.push("/")}
          style={{
            padding: "8px 18px",
            backgroundColor: "#1e40af",
            color: "white",
            borderRadius: "4px",
            marginBottom: "20px",
          }}
        >
          ← Back
        </button>

        <div
          style={{
            display: "flex",
            gap: "30px",
            alignItems: "flex-start",
            flexWrap: "wrap",
          }}
        >
          {/* LEFT: IMAGE */}
          <img
            src={IMAGE_BASE_URL + book.image}
            alt={book.title}
            style={{
              width: "300px",
              height: "400px",
              objectFit: "cover",
              borderRadius: "8px",
            }}
          />

          {/* RIGHT: DETAILS */}
          <div>
            <h1 style={{ fontSize: "28px", fontWeight: "bold" }}>
              {book.title}
            </h1>

            <p><strong>Category:</strong> {book.category}</p>
            <p><strong>Price:</strong> ₹{book.price}</p>
            <p><strong>Description:</strong></p>
            <p style={{ maxWidth: "500px" }}>{book.description}</p>

            <br />

            <div style={{ display: "flex", gap: "10px" }}>
              <button
                onClick={() => router.push(`/EditProduct/${book._id}`)}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "#2563eb",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Edit
              </button>

              <button
                onClick={handleDelete}
                style={{
                  padding: "10px 20px",
                  backgroundColor: "red",
                  color: "white",
                  borderRadius: "4px",
                }}
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
