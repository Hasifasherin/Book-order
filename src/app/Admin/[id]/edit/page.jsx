"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api, { IMAGE_BASE_URL } from "@/app/utils/baseUrl";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import styles from "./edit.module.css";
import { toast } from "react-toastify";

export default function EditBook() {
  const { id } = useParams();
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    const fetchBook = async () => {
      try {
        const res = await api.get(`/admin/products/${id}`);
        const book = res.data.product;
        setForm({
          title: book.title,
          category: book.category,
          price: book.price,
          description: book.description,
        });
        setImage(book.image); // show current image filename
      } catch (err) {
        console.error("Failed to load book:", err);
        router.push("/admin");
      } finally {
        setLoading(false);
      }
    };
    fetchBook();
  }, [id, router]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("price", form.price);
    fd.append("description", form.description);
    if (image instanceof File) fd.append("image", image); // only append if new file

    try {
      await api.put(`/admin/products/${id}`, fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      toast("Book updated successfully!");
      router.push(`/Admin/${id}`);
    } catch (err) {
      console.error("Update error:", err);
      toast("Failed to update book.");
    }
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <Header />
      <main className={styles.editContainer}>
        <h1>Edit Book</h1>
        <form className={styles.editForm} onSubmit={handleSubmit}>
          <input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
          <input name="category" placeholder="Category" value={form.category} onChange={handleChange} required />
          <input name="price" type="number" placeholder="Price" value={form.price} onChange={handleChange} required />
          <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} />
          
          <div >
            <label style={{ color: "black" }}>Upload new image</label>
            <input type="file" accept="image/*" onChange={(e) => setImage(e.target.files[0])} />
          </div>

          {typeof image === "string" && (
            <img src={IMAGE_BASE_URL + image} alt="current" style={{ maxWidth: "200px", marginTop: "10px" }} />
          )}

          <div className={styles.buttons}>
            <button type="submit" className={styles.saveBtn}>Save</button>
            <button type="button" className={styles.cancelBtn} onClick={() => router.push("/admin")}>Cancel</button>
          </div>
        </form>
      </main>
      <Footer />
    </>
  );
}
