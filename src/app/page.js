"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext";
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductCard from "./components/ProductCard/ProductCard";
import api from "./utils/baseUrl";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth();

  const [products, setProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);

  const itemsPerPage = 10;

  // 🔐 AUTH GUARD
  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [user, loading, router]);

  // 🔁 FETCH PRODUCTS BASED ON ROLE
  useEffect(() => {
    if (user) fetchProducts();
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res =
        user.role === "admin"
          ? await api.get("/admin/products")
          : await api.get("/products");

      // admin -> res.data
      // user  -> res.data.products OR res.data
      setProducts(res.data.products || res.data);
    } catch (err) {
      console.error("FETCH PRODUCTS ERROR:", err);
    }
  };

  // Pagination logic
  const lastIndex = currentPage * itemsPerPage;
  const firstIndex = lastIndex - itemsPerPage;
  const currentProducts = products.slice(firstIndex, lastIndex);
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (loading || !user) return <div>Loading...</div>;

  return (
    <>
      <Header />

      <main style={{ padding: "20px", minHeight: "70vh" }}>
        {/* ✅ ADMIN ONLY */}
        {user.role === "admin" && (
          <button
            onClick={() => router.push("/Admin/AddProduct")}
            style={{
              backgroundColor: "#2e7d32",
              padding: "10px 20px",
              borderRadius: "4px",
              color: "white",
              border: "none",
              cursor: "pointer",
            }}
          >
            Add Product
          </button>
        )}

        {/* Product Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {currentProducts.map((product) => (
            <ProductCard
              key={product._id}
              product={product}
              onDelete={fetchProducts}
            />
          ))}
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: "30px",
              gap: "8px",
            }}
          >
            <button
              disabled={currentPage === 1}
              onClick={() => handlePageChange(currentPage - 1)}
            >
              &lt;
            </button>

            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => handlePageChange(i + 1)}
                style={{
                  padding: "6px 12px",
                  backgroundColor:
                    currentPage === i + 1 ? "#2e7d32" : "#e0e0e0",
                  color: currentPage === i + 1 ? "#fff" : "#000",
                  border: "none",
                  borderRadius: "4px",
                  cursor: "pointer",
                }}
              >
                {i + 1}
              </button>
            ))}

            <button
              disabled={currentPage === totalPages}
              onClick={() => handlePageChange(currentPage + 1)}
            >
              &gt;
            </button>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
