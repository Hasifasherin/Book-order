"use client";

import { createContext, useContext, useEffect, useState } from "react";
import api from "@/app/utils/baseUrl";
import { toast } from "react-toastify";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const token =
    typeof window !== "undefined" ? localStorage.getItem("token") : null;

  /* Load cart from localStorage */
  useEffect(() => {
    const stored = localStorage.getItem("cart");
    if (stored) setCart(JSON.parse(stored));
  }, []);

  /* Save cart */
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  /* Fetch cart from backend */
  useEffect(() => {
    if (!token) return setCart([]);

    const fetchCart = async () => {
      try {
        const res = await api.get("/cart", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setCart(res.data.cart || []);
      } catch (err) {
        toast.error("Failed to load cart");
      }
    };

    fetchCart();
  }, [token]);

  /* Add to cart */
  const addToCart = async (product) => {
    if (!token) return toast.error("Login required");

    try {
      const res = await api.post(
        "/cart",
        { productId: product._id },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCart(res.data.cart);
      toast.success("Added to cart!");
    } catch {
      toast.error("Failed to add to cart");
    }
  };

  /* Remove item */
  const removeItem = async (cartItemId) => {
    try {
      const res = await api.delete("/cart", {
        headers: { Authorization: `Bearer ${token}` },
        data: { cartItemId },
      });
      setCart(res.data.cart);
    } catch {
      toast.error("Failed to remove item");
    }
  };

  /* Increase qty */
  const increaseQty = async (id) => {
    const item = cart.find((i) => i._id === id);
    if (!item) return;

    setCart((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: i.quantity + 1 } : i))
    );

    await api.patch(
      `/cart/${id}`,
      { quantity: item.quantity + 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  /* Decrease qty */
  const decreaseQty = async (id) => {
    const item = cart.find((i) => i._id === id);
    if (!item || item.quantity <= 1) return;

    setCart((prev) =>
      prev.map((i) => (i._id === id ? { ...i, quantity: i.quantity - 1 } : i))
    );

    await api.patch(
      `/cart/${id}`,
      { quantity: item.quantity - 1 },
      { headers: { Authorization: `Bearer ${token}` } }
    );
  };

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeItem, increaseQty, decreaseQty }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
