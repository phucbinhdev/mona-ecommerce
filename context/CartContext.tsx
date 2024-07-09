import React, { createContext, useContext, useState, ReactNode } from "react";

type CartContextType = {
  totalQuantity: number;
  setTotalQuantity: React.Dispatch<React.SetStateAction<number>>;
};

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [totalQuantity, setTotalQuantity] = useState<number>(0);

  return (
    <CartContext.Provider value={{ totalQuantity, setTotalQuantity }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};
