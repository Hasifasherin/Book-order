"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { IMAGE_BASE_URL } from "@/app/utils/baseUrl";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import styles from "./details.module.css"; // renamed CSS file
import { toast } from "react-toastify";

export default function ProductDetails() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchProduct = async () => {
      try {
        const res = await api.get(`/admin/products/${id}`);
        setProduct(res.data.product);
      } catch (err) {
        console.error("Failed to load product:", err);
        toast("Failed to load product.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [id]);

  if (loading) return <div className={styles.loading}>Loading...</div>;
  if (!product) return <div className={styles.loading}>Product not found</div>;

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
            <p className={styles.productCategory}><strong>Category:</strong> {product.category}</p>
            <p className={styles.productPrice}><strong>Price:</strong> ₹{product.price}</p>
            <p className={styles.productDescription}>{product.description}</p>

            <button
              className={styles.editBtn}
              onClick={() => router.push(`/Admin/${id}/edit`)}
            >
              Edit Product
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}
