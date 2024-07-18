import React from "react";
import "../Styles/AddToCart.css";

export function AddToCart({
  cartItems = [],
  onClose,
  onUpdateQuantity,
  onRemoveFromCart,
}) {

  const validCartItems = cartItems.filter(
    (item) => !isNaN(item.price) && !isNaN(item.quantity)
  );

  const totalQuantity = validCartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = validCartItems
    .reduce((total, item) => total + (item.price || 0) * item.quantity, 0)
    .toFixed(2);


  return (
    <div className="add-to-cart-container">
      <button className="close-button" onClick={onClose}>
        &times;
      </button>
      <h2 className="mb-5 font-bold">Shopping Cart</h2>
      {cartItems.length === 0 ? (
        <p>Your cart is empty</p>
      ) : (
        <>
          <ul className="cart-items-list">
            {cartItems.map((item) => (
              <li key={item.id} className="cart-item">
                <img
                  src={item.image}
                  alt={item.title}
                  className="cart-item-image"
                />
                <div className="cart-item-details">
                  <h3 className="cart-item-title">{item.title}</h3>
                  <p className="cart-item-price">
                    ${item.price ? item.price.toFixed(2) : "0.00"}
                  </p>
                  <div className="quantity-controls">
                    <button
                      className="quantity-button"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity - 1)
                      }
                      disabled={item.quantity <= 1}
                    >
                      -
                    </button>
                    <span className="quantity">{item.quantity}</span>
                    <button
                      className="quantity-button"
                      onClick={() =>
                        onUpdateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>

                    <button
                      className="remove"
                      onClick={() => onRemoveFromCart(item.id)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="size-6"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                        />
                      </svg>
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <div className="cart-summary">
            <p>Total Quantity: {totalQuantity}</p>
            <p>Total Price: ${totalPrice}</p>
          </div>
        </>
      )}
    </div>
  );
}
