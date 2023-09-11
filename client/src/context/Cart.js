import React, { useState, useEffect, useContext, createContext } from "react";

const CartContext = createContext();

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

useEffect(()=>{
let existingCartItems = localStorage.getItem('cart')
if(existingCartItems)setCart(JSON.parse(existingCartItems))
  //eslint-disable-next-line
},[])


  return (
    <CartContext.Provider value={[cart, setCart]}>
      {children}
    </CartContext.Provider>
  );
};

const useCart = () => useContext(CartContext);

export { CartProvider, useCart };
