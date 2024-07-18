// src/components/AddToWishlist.jsx
import React from "react";
import "../Styles/AddToWishlist.css";

export function AddToWishlist({ wishlistItems, onRemoveFromWishlist, onClose }) {
  return (
    <div className="add-to-wishlist-container">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h2>Wishlist</h2>
      {wishlistItems.length === 0 ? (
        <p>Your wishlist is empty</p>
      ) : (
        <ul className="wishlist-items-list">
          {wishlistItems.map((item) => (
            <li key={item.id} className="wishlist-item">
              <img src={item.image} alt={item.title} className="wishlist-item-image" />
              <div className="wishlist-item-details">
                <h3 className="wishlist-item-title">{item.title}</h3>
                <p className="wishlist-item-price">${item.price.toFixed(2)}</p>
                <button className="remove-button" onClick={() => onRemoveFromWishlist(item.id)}>
                  Remove
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
