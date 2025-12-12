"use client";

import { useState } from "react";
import api from "@/app/utils/baseUrl";
import { useRouter } from "next/navigation";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import { toast } from "react-toastify";
import "./AddProduct.css"

export default function AddProduct() {
  const router = useRouter();

  const [form, setForm] = useState({
    title: "",
    category: "",
    price: "",
    description: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleCancel = () => {
    router.push("/");
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!form.title || !form.category || !form.price) {
      alert("Please fill all required fields!");
      return;
    }

    const fd = new FormData();
    fd.append("title", form.title);
    fd.append("category", form.category);
    fd.append("price", form.price);
    fd.append("description", form.description);
    if (image) fd.append("image", image);

    try {
      const res = await api.post("/admin/add-product", fd, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      toast(res.data?.message || "Product added successfully!");
      router.push("/");
    } catch (err) {
      console.error("ADD Product ERROR:", err);
      toast(err.response?.data?.message || "Failed to add product.");
    }
  };

  return (
    <>
      <Header />

      <main className="addbook-container">
        <h1>Add product</h1>

        <form className="addbook-form" onSubmit={handleSubmit}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />

          <input
            type="text"
            name="category"
            placeholder="Category"
            value={form.category}
            onChange={handleChange}
            required
          />

          <input
            type="number"
            name="price"
            placeholder="Price"
            value={form.price}
            onChange={handleChange}
            required
          />

          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])}
          />

          <button type="submit">Add product</button>
        <button onClick={handleCancel} > Cancel </button>
        </form>
      </main>

      <Footer />
    </>
  );
}
