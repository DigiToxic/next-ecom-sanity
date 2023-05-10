import { createContext } from "react";
import { Project } from "@/types/Project";

export interface ProjectWithQuantity extends Project {
  quantity: number;
}

interface CartContextData {
  cartItems: ProjectWithQuantity[];
  addToCart: (item: ProjectWithQuantity) => void;
  increaseQuantity: (itemId: string) => void;
  decreaseQuantity: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
}

const CartContext = createContext<CartContextData | undefined>(undefined);

export default CartContext;
