import React, { useState } from "react";
import { AddToCart } from "./AddToCart";

export function ShoppingCart() {
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const handleAddToCart = (newItem) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === newItem.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === newItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...newItem, quantity: 1 }];
      }
    });
  };

  const handleRemoveFromCart = (id) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== id)
    );
  };

  const handleUpdateQuantity = (id, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === id
          ? { ...item, quantity: newQuantity }
          : item
      )
    );
  };

  return (
    <div>
      <button onClick={() => setIsCartOpen(true)}>Open Cart</button>
      {isCartOpen && (
        <AddToCart
          cartItems={cartItems}
          onRemoveFromCart={handleRemoveFromCart}
          onClose={() => setIsCartOpen(false)}
          onUpdateQuantity={handleUpdateQuantity}
        />
      )}
      {/* Contoh produk untuk ditambahkan ke keranjang */}
      <div>
        <h2>Products</h2>
        <button onClick={() => handleAddToCart({ id: 1, title: "Product 1", price: 10, image: "image1.jpg" })}>
          Add Product 1
        </button>
        <button onClick={() => handleAddToCart({ id: 2, title: "Product 2", price: 15, image: "image2.jpg" })}>
          Add Product 2
        </button>
      </div>
    </div>
  );
}
