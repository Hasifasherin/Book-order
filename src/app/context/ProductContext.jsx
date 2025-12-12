"use client";
import { createContext, useContext, useState, useEffect } from "react";

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);

  // Load products from localStorage
  useEffect(() => {
    const storedProducts = localStorage.getItem("products");
    if (storedProducts) {
      setProducts(JSON.parse(storedProducts));
    }
  }, []);

  // Save to localStorage
  const saveProducts = (updatedProducts) => {
    setProducts(updatedProducts);
    localStorage.setItem("products", JSON.stringify(updatedProducts));
  };

  // Add product
  const addProduct = (newProduct) => {
    saveProducts([...products, newProduct]);
  };

  // Edit product
  const editProduct = (id, updatedData) => {
    const updatedProducts = products.map((p) =>
      p.id === id ? { ...p, ...updatedData } : p
    );
    saveProducts(updatedProducts);
  };

  // Delete product
  const deleteProduct = (id) => {
    const updatedProducts = products.filter((p) => p.id !== id);
    saveProducts(updatedProducts);
  };

  return (
    <ProductContext.Provider
      value={{ products, addProduct, editProduct, deleteProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProducts = () => useContext(ProductContext);
