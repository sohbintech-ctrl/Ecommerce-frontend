"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";

type CartItem = {
  cartId: number;
  productId: number;
  productName: string;
  image: string;
  discount:number,
  price: number;
  quantity: number;
};

type CartContextType = {
  cart: CartItem[];
  setCart: React.Dispatch<React.SetStateAction<CartItem[]>>;
  getCart: () => Promise<void>;
  deleteCart: (cartId: number) => Promise<void>;
  increaseQuantity: (cartId: number) => Promise<void>;
  decreaseQuantity: (cartId: number) => Promise<void>;
};

const CartContext = createContext<CartContextType | null>(null);

export const CartProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [cart, setCart] = useState<CartItem[]>([]);

    const getCart = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/cart", {
        credentials: "include",
      });

      const data = await res.json();

      setCart(data.cart);

    } catch (err) {
      console.log(err);
    }
  };


const deleteCart=async(cartId:any)=>{
    try{
    const res=await fetch(`http://localhost:5000/api/cart/${cartId}`,{
      method:"DELETE",
      credentials:"include",
        headers: {
        "Content-Type": "application/json",
      },
    });
    
    const result=await res.json();
    if(result.success){
      toast.success(result.message);
      getCart();

    }

    }catch(err){
      console.log(err)
    }
  }


  const increaseQuantity=async(cartId:number)=>{
   try{
    const res=await fetch( `http://localhost:5000/api/cart/increase/${cartId}`,
    {
      method:"PUT",
      credentials:"include",
      headers:{
        "Content-Type":"application/json",
      }
    });
    const data=await res.json();

    if(data.success){
     await getCart();
    }
   }catch(error){
    console.log(error);
   }
  }
  
  const decreaseQuantity=async(cartId:number)=>{
    try{
        const res=await fetch(`http://localhost:5000/api/cart/decrease/${cartId}`,{
      method:"PUT",
      credentials:"include",
      headers:{
        "Content-type":"application/json",
      }
    })
    const data=await res.json();
    if(data.success){
     await getCart();
    }
    }catch(error){
      console.log(error);
    }
  }

  
  return (
    <CartContext.Provider value={{cart,setCart,getCart,deleteCart,increaseQuantity,decreaseQuantity}}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);

  if (!context) {
    throw new Error("useCart must be used inside CartProvider");
  }

  return context;
};