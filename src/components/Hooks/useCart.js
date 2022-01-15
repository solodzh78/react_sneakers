import { useContext } from "react";

import { AppContext } from '../context';


export function useCart() {

  const { cartItems, setCartItems } = useContext(AppContext);
  const total = cartItems.reduce((akk, item) => akk + Number(item.price), 0);
  const cartCount = cartItems.length;

  return { cartItems, setCartItems, total, cartCount };
}

export default useCart; 