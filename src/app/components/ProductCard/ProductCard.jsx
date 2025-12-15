"use client";

import Link from "next/link";
import { useState } from "react";
import api from "@/app/utils/baseUrl";
import { toast } from "react-toastify";
import { useAuth } from "@/app/context/AuthContext";
import "./ProductCard.css";

export default function ProductCard({ product, onDelete }) {
  const { user } = useAuth();

  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  // ✅ ADMIN ONLY DELETE
  const handleDelete = async () => {
    if (user?.role !== "admin") {
      return toast.error("Unauthorized action");
    }

    setLoading(true);
    try {
      await api.delete(`/admin/products/${product._id}`);
      toast.success(`Product "${product.title}" deleted successfully!`);
      onDelete?.();
    } catch (err) {
      console.error("DELETE product ERROR:", err);
      toast.error(err.response?.data?.message || "Failed to delete product!");
    } finally {
      setLoading(false);
      setShowConfirm(false);
    }
  };

  return (
    <div className="book-card">
      <img src={product.image} alt={product.title} className="book-img" />

      <h2>{product.title}</h2>
      <p>Genre: {product.category}</p>
      <p className="price">₹{product.price}</p>

      <div className="buttons">
        {/* ✅ VIEW FOR BOTH USER & ADMIN */}
        <Link href={`/Admin/${product._id}`}>
          <button className="view-details">View</button>
        </Link>

        {/* ✅ DELETE ONLY FOR ADMIN */}
        {user?.role === "admin" && (
          <button
            className="delete-btn"
            onClick={() => setShowConfirm(true)}
          >
            Delete
          </button>
        )}
      </div>

      {/* ✅ CONFIRM MODAL (ADMIN ONLY) */}
      {showConfirm && user?.role === "admin" && (
        <div className="modal-overlay">
          <div className="modal-box">
            <h3>Are you sure?</h3>
            <p>Do you really want to delete "{product.title}"?</p>

            <div className="modal-actions">
              <button
                className="btn btn-danger"
                onClick={handleDelete}
                disabled={loading}
              >
                {loading ? "Deleting..." : "Yes, Delete"}
              </button>

              <button
                className="btn btn-secondary"
                onClick={() => setShowConfirm(false)}
                disabled={loading}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
