"use client";
import { createContext, useContext, useState, useEffect } from "react";

const BookContext = createContext();

export const BookProvider = ({ children }) => {
  const [books, setBooks] = useState([]);

  // Load books from localStorage
  useEffect(() => {
    const storedBooks = JSON.parse(localStorage.getItem("books")) || [];
    setBooks(storedBooks);
  }, []);

  // Save books to localStorage whenever they change
  const updateLocalStorage = (updatedBooks) => {
    localStorage.setItem("books", JSON.stringify(updatedBooks));
  };

  // Add new book
  const addBook = (newBook) => {
    const updatedBooks = [...books, newBook];
    setBooks(updatedBooks);
    updateLocalStorage(updatedBooks);
  };

  // Edit book
  const editBook = (id, updatedData) => {
    const updatedBooks = books.map((b) =>
      b.id === id ? { ...b, ...updatedData } : b
    );
    setBooks(updatedBooks);
    updateLocalStorage(updatedBooks);
  };

  // Delete book
  const deleteBook = (id) => {
    const updatedBooks = books.filter((b) => b.id !== id);
    setBooks(updatedBooks);
    updateLocalStorage(updatedBooks);
  };

  return (
    <BookContext.Provider
      value={{ books, addBook, editBook, deleteBook }}
    >
      {children}
    </BookContext.Provider>
  );
};

export const useBooks = () => useContext(BookContext);
