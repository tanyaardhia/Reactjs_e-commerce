import { useEffect, useState } from "react";
import axios from "axios";
import { Navbar } from "../components/Navbar";
import { Card } from "../components/Card";
import { AddToCart } from "./AddToCart";

export function Home() {
  const [getData, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cartItems, setCartItems] = useState([]);
  const [wishlistItems, setWishlistItems] = useState([]);
  const [wishlistCount, setWishlistCount] = useState(0);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState(false);

  const fetchData = async () => {
    try {
      const response = await axios.get(`https://fakestoreapi.com/products`);

      console.log("data fetched successfully >>", response.data);
      setData(response.data);
      setLoading(false);
    } catch (error) {
      console.error("error news data >>", error);
      setLoading(false);
    }
  };

  const handleAddToCart = (product) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.id === product.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1 }];
      }
    });
  };

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const handleUpdateQuantity = (productId, newQuantity) => {
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: newQuantity } : item
      )
    );
  };

  const handleAddToWishlist = (product) => {
    setWishlistItems((prevItems) => [...prevItems, product]);
    setWishlistCount(wishlistCount + 1);
  };

  const handleRemoveFromCart = (productId) => {
    setCartItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
  };

  const handleRemoveFromWishlist = (productId) => {
    setWishlistItems((prevItems) =>
      prevItems.filter((item) => item.id !== productId)
    );
    setWishlistCount(wishlistCount - 1);
  };


  const handleToggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleToggleWishlist = () => {
    setIsWishlistOpen(!isWishlistOpen);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <Navbar
        cartCount={cartCount}
        wishlistCount={wishlistCount}
        onCartClick={handleToggleCart}
        onWishlistClick={handleToggleWishlist}
      />

      <div className="home-container">
        {loading ? (
          <div className="loading-container">
            <div className="loading"></div>
          </div>
        ) : (
          <div className="card-container">
            {getData.map((item) => (
              <Card
              key={item.id}
              product={item}
              onAddToCart={handleAddToCart}
              onAddToWishlist={handleAddToWishlist}
              />
            ))}
          </div>
        )}
      </div>
      {isCartOpen && (
        <AddToCart
        cartItems={cartItems}
        onRemoveFromCart={handleRemoveFromCart}
        onUpdateQuantity={handleUpdateQuantity}
        onClose={handleToggleCart}
      />
      )}
    </>
  );
}
