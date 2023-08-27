import Image from "next/image";
import { useState, useEffect } from "react";

const AddToCartButton = ({ product }) => {
  const [isInCart, setIsInCart] = useState(false);

  useEffect(() => {
    let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
    setIsInCart(cartItems.some(item => item.title === product.title));
  }, []);

  const pushCart = () => {
    let cartItems = JSON.parse(sessionStorage.getItem('cart')) || [];
  
    if (cartItems.some(item => item.title === product.title)) {
      cartItems = cartItems.filter(item => item.title !== product.title);
      sessionStorage.setItem('cart', JSON.stringify(cartItems));
      setIsInCart(false);
    } else {
      cartItems.push(product);
      sessionStorage.setItem('cart', JSON.stringify(cartItems));
      setIsInCart(true);
    }
  };

  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        pushCart();
      }}
      className="absolute top-2 right-2"
    >
      {isInCart ? 
        <Image src={"/Icons/isCart.svg"} alt="In Cart" width={30} height={30} /> :
        <Image src={"/Icons/AddCart.svg"} alt="Add to Cart" width={30} height={30} />
      }
    </button>
  );
};

export default AddToCartButton;
