"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext"; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import ProductCard from "./components/ProductCard/ProductCard"; // rename BookCard → ProductCard
import api from "./utils/baseUrl";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth(); 
  const [products, setProducts] = useState([]); // rename books → products

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login"); 
    }
  }, [user, loading, router]);

  useEffect(() => {
    if (user) fetchProducts(); 
  }, [user]);

  const fetchProducts = async () => {
    try {
      const res = await api.get("/admin/products");
      setProducts(res.data); 
    } catch (err) {
      console.error(err);
    }
  };

  const addProduct = () => {
    router.push("/Admin/AddProduct"); // rename AddBook → AddProduct
  };

  if (loading || !user) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Header />
      <main style={{ padding: "20px", minHeight: "70vh" }}>
        <button
          onClick={addProduct}
          style={{
            backgroundColor: "#2e7d32",
            padding: "10px 20px",
            cursor: "pointer",
            width: "125px",
            borderRadius: "4px",
            color: "white",
            border: "none",
          }}
        >
          Add Product
        </button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {products.map((product) => (
            <ProductCard
              key={product._id}
              product={product} // rename book → product
              onDelete={fetchProducts}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
