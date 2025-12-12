"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import api from "@/app/utils/baseUrl";
import Header from "@/app/components/Header/Header";
import Footer from "@/app/components/Footer/Footer";
import styles from "./edit.module.css";
import { toast } from "react-toastify";

export default function EditProduct() {
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

        const fetchProduct = async () => {
            try {
                const res = await api.get(`/admin/products/${id}`);
                const product = res.data.product;

                setForm({
                    title: product.title,
                    category: product.category,
                    price: product.price,
                    description: product.description,
                });

                setImage(product.image);
            } catch (err) {
                console.error("Failed to load product:", err);
                router.push("/");
            } finally {
                setLoading(false);
            }
        };

        fetchProduct();
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

        if (image instanceof File) {
            fd.append("image", image);
        }

        try {
            await api.put(`/admin/products/${id}`, fd, {
                headers: { "Content-Type": "multipart/form-data" },
            });

            toast.success("Product updated successfully!");
            router.push(`/Admin/${id}`);
        } catch (err) {
            console.error("Update error:", err);
            toast.error("Failed to update product.");
        }
    };

    if (loading) return <div>Loading...</div>;

    return (
        <>
            <Header />
            <main className={styles.editContainer}>
                <h1>Edit Product</h1>

                <form className={styles.editForm} onSubmit={handleSubmit}>
                    <input
                        name="title"
                        placeholder="Title"
                        value={form.title}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="category"
                        placeholder="Category"
                        value={form.category}
                        onChange={handleChange}
                        required
                    />
                    <input
                        name="price"
                        type="number"
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

                    <div>
                        <label style={{ color: "black" }}>Upload new image</label>

                        <input
                            type="file"
                            accept="image/*"
                            id="fileInput"
                            style={{ display: "none" }}
                            onChange={(e) => setImage(e.target.files[0])}
                        />

                        <input
                            type="text"
                            readOnly
                            onClick={() => document.getElementById("fileInput").click()}
                            placeholder={
                                typeof image === "string" ? image : "Choose a file..."
                            }
                            value={image instanceof File ? image.name : ""}
                            style={{
                                width: "100%",
                                padding: "6px",
                                border: "1px solid #ccc",
                                borderRadius: "4px",
                                cursor: "pointer",
                                marginBottom: "5px",
                            }}
                        />

                        {image && typeof image === "string" && (
                            <img
                                src={image}
                                alt="current"
                                style={{ maxWidth: "200px", marginTop: "10px" }}
                            />
                        )}

                        {image && image instanceof File && (
                            <img
                                src={URL.createObjectURL(image)}
                                alt="preview"
                                style={{ maxWidth: "200px", marginTop: "10px" }}
                            />
                        )}
                    </div>

                    <div className={styles.buttons}>
                        <button type="submit" className={styles.saveBtn}>
                            Save
                        </button>
                        <button
                            type="button"
                            className={styles.cancelBtn}
                            onClick={() => router.push(`/Admin/${id}`)}
                        >
                            Cancel
                        </button>
                    </div>
                </form>
            </main>
            <Footer />
        </>
    );
}
