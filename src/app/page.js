"use client";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "./context/AuthContext"; 
import Header from "./components/Header/Header";
import Footer from "./components/Footer/Footer";
import BookCard from "./components/BookCard/BookCard";
import api from "./utils/baseUrl";

export default function Home() {
  const router = useRouter();
  const { user, loading } = useAuth(); 
  const [books, setBooks] = useState([]);

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
      setBooks(res.data); 
    } catch (err) {
      console.error(err);
    }
  };

  const addProd = () => {
    router.push("/AddProduct");
  };

  if (loading || !user) {
    return <div>Loading...</div>; 
  }

  return (
    <>
      <Header />
      <main style={{ padding: "20px", minHeight: "70vh" }}>
        <button onClick={addProd} style={{backgroundColor:"#1e40af" , padding: "10px 20px", cursor: "pointer", width:" 125px" , borderRadius:"4px"}}>Add Book</button>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(250px, 1fr))",
            gap: "20px",
            marginTop: "20px",
          }}
        >
          {books.map((product) => (
            <BookCard
              key={product._id}
              book={product}
              onDelete={fetchProducts}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
}
