"use client";

import Link from "next/link";
import { useState } from "react";
import api, { IMAGE_BASE_URL } from "@/app/utils/baseUrl";
import { toast } from "react-toastify";
import "./ProductCard.css";

export default function ProductCard({ product, onDelete }) {
  
  const [loading, setLoading] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const handleDelete = async () => {
    setLoading(true);
    try {
      await api.delete(`/admin/products/${product._id}`);
      toast.success(`product "${product.title}" deleted successfully!`);
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
        <Link href={`/Admin/${product._id}`}>
          <button className="view-details">View</button>
        </Link>


        <button className="delete-btn" onClick={() => setShowConfirm(true)}>
          Delete
        </button>
      </div>

      {/* Confirmation Modal */}
      {showConfirm && (
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
