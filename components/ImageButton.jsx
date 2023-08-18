import Image from "next/image";
import React, { useEffect, useState } from "react";

function ImageButton({ product, setCart, Cart }) {
  const [isInCart, setIsInCart] = useState(false);

  // Load Cart state from localStorage on component mount
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("cart"));
    if (savedCart) {
      setCart(savedCart);
    }
  }, []);

  // Save Cart state to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(Cart));
  }, [Cart]);

  useEffect(() => {
    const interval = setInterval(() => {
      setIsInCart(Cart.find((match) => match.id === product.id) !== undefined);
    }, 5);
    return () => clearInterval(interval);
  }, [Cart, product.id]);

  const idToRemove = product.id;

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        if (Cart.find((match) => match.id === product.id) !== undefined) {
          const newCart = Cart.filter((item) => item.id !== idToRemove);
          setCart(newCart);
          console.log('removed');
          setIsInCart(false);
        } else {
          setCart([...Cart, product]);
          console.log(Cart);
        }
      }}
      className="absolute top-3 right-3"
    >
      <Image
        src={isInCart ? "/Icons/isCart.svg" : "/Icons/addCart.svg"}
        alt="cart"
        width={30}
        height={30}
      />
    </button>
  );
}

export default ImageButton;
