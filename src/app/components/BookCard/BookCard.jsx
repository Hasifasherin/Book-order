"use client";
import Link from "next/link";
import Image from "next/image";
import "./BookCard.css";
import { IMAGE_BASE_URL } from "@/app/utils/baseUrl";

export default function BookCard({ book, onDelete }) {

  const handleDelete = () => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    const updatedBooks = storedBooks.filter(
      (b) => b.id.toString() !== book.id.toString()
    );

    localStorage.setItem("books", JSON.stringify(updatedBooks));
    onDelete?.();
    alert("Book deleted!");
  };

  return (
    <div className="book-card">
      <img
        src={IMAGE_BASE_URL + book.image}
        alt={book.name}
        className="book-img"
      />

      <h2>{book.name}</h2>
      <p>{book.author}</p>
      <p className="price">₹{book.price}</p>

      <div className="buttons">
        <Link href={`/BookDetails/${book.id}`}>
          <button className="view-details">View</button>
        </Link>

        <button className="delete-btn" onClick={handleDelete}>
          Delete
        </button>
      </div>
    </div>
  );
}
