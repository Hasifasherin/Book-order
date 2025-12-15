"use client";

import { useCart } from "../context/CartContext";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import styles from "./cart.module.css";

export default function CartPage() {
  const { cart, removeItem, increaseQty, decreaseQty } = useCart();

  // Filter out invalid cart items (product deleted / not populated)
  const validCart = cart.filter((item) => item.product);

  const totalPrice = validCart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  return (
    <>
      <Header />

      <main className={styles.cartContainer}>
        <h2 className={styles.cartTitle}>Your Cart</h2>

        {validCart.length === 0 ? (
          <p className={styles.emptyText}>Your cart is empty</p>
        ) : (
          <div className={styles.cartList}>
            {validCart.map((item) => (
              <div className={styles.cartCard} key={item._id}>
                <img
                  src={item.product.image}
                  alt={item.product.title}
                  className={styles.cartImg}
                />

                <div className={styles.cartInfo}>
                  <h3 className={styles.cartName}>
                    {item.product.title}
                  </h3>

                  <p className={styles.cartPrice}>
                    ₹{item.product.price * item.quantity}
                  </p>

                  <div className={styles.qtyBox}>
                    <button onClick={() => decreaseQty(item._id)}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQty(item._id)}>+</button>
                  </div>

                  <button
                    className={styles.removeBtn}
                    onClick={() => removeItem(item._id)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {validCart.length > 0 && (
          <div className={styles.cartTotal}>
            Total: <span>₹{totalPrice}</span>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
