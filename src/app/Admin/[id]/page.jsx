"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/utils/baseUrl";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { useCart } from "@/app/context/CartContext";
import { useAuth } from "@/app/context/AuthContext";
import styles from "./details.module.css";
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();

  const { user, loading: authLoading } = useAuth();
  const { addToCart } = useCart();

  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  // 🔐 ROLE GUARD (block non-admin from admin-only actions)
  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [user, authLoading, router]);

  // 🔁 FETCH PRODUCT BASED ON ROLE
  useEffect(() => {
    if (!id || !user) return;

    const fetchProduct = async () => {
      try {
        const res =
          user.role === "admin"
            ? await api.get(`/admin/products/${id}`)
            : await api.get(`/products/${id}`);

        setProduct(res.data.product || res.data);
      } catch (err) {
        console.error("Failed to load product:", err);
        toast.error("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id, user]);

  if (loading || authLoading) {
    return <div className={styles.loading}>Loading...</div>;
  }

  if (!product) {
    return <div className={styles.loading}>Product not found</div>;
  }

  return (
    <>
      <Header />

      <main className={styles.productDetailsContainer}>
        <button className={styles.backBtn} onClick={() => router.push("/")}>
          ← Back
        </button>

        <div className={styles.productDetailsContent}>
          <div className={styles.productImage}>
            <img src={product.image} alt={product.title} />
          </div>

          <div className={styles.productInfo}>
            <h1 className={styles.productTitle}>{product.title}</h1>

            <p className={styles.productCategory}>
              <strong>Category:</strong> {product.category}
            </p>

            <p className={styles.productPrice}>
              <strong>Price:</strong> ₹{product.price}
            </p>

            <p className={styles.productDescription}>
              {product.description}
            </p>

            {/* ✅ ADMIN ONLY */}
            {user.role === "admin" && (
              <button
                className={styles.editBtn}
                onClick={() => router.push(`/Admin/${id}/edit`)}
              >
                Edit Product
              </button>
            )}

            {/* ✅ USER + ADMIN */}
            <button
              className={styles.cartBtn}
              onClick={() => addToCart(product)}
            >
              Add to Cart
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </>
  );
}
