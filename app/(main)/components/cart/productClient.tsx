"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useCart } from "../../context/cartcontext";
import Price from "../price/price";
import LoadingSpinner from "@/app/(admin)/admin/dashboard/components/Loadingspinner";
import { useAuth } from "../../context/authContext";
import LoginDialog from "../header/logindialog";
import LoginForm from "../header/loginform";
import AddtoCartDialog from "./addtocartdialog";



export default function ProductClient({ id }: { id:Number  }) {
  const [product, setProduct] = useState<any>(null);
  const [open, setOpen] = useState(false);
   const{ user, setUser} = useAuth();

  const {cart,getCart,increaseQuantity,decreaseQuantity}=useCart();
  //console.log(cart);
  const cartItem=cart.find(
    (item:any)=>item.productId===Number(id)
  );

  useEffect(() => {
    const getProduct = async () => {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/products/${id}`,
        { credentials: "include" }
      );

      const data = await res.json();
      setProduct(data.product[0]);
    };

    getProduct();
  }, [id]);

  const addToCart = async () => {
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/cart/addCart`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ productId: id }),
    });

    await getCart();
    setOpen(false);
  };

  if (!product) return <LoadingSpinner/>;

  return (
    <div className="max-w-7xl mx-auto py-10 px-4">
      <div className="grid md:grid-cols-2 gap-10">
        <div className="border rounded-xl p-8 flex justify-center items-center bg-white">
          <Image
            src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${product.image}`}
            alt={product.productName}
            width={500}
            height={500}
            className="object-contain"
            unoptimized
          />
        </div>

        <div className="space-y-5">
          <h1 className="md:text-4xl font-bold text-2xl">
            {product.productName}
          </h1>

          <Price price={product.price} discount={product.discount} />

          <div>Category: {product.category}</div>
          <div>Stock: {product.stock}</div>
          <div>Status: {product.status}</div>

          {product.status == "out-of-stock" ? (
            <Button variant="mystock" disabled>
              Out of Stock
            </Button>
          ) : cartItem ? (
            <div className="flex gap-2 items-center">
              <Button onClick={() => decreaseQuantity(cartItem.cartId)}>
                -{" "}
              </Button>
              {cartItem.quantity}
              <Button
                onClick={() => increaseQuantity(cartItem.cartId)}
                disabled={cartItem.quantity >= product.stock}
              >
                +
              </Button>
            </div>
          ) : !user ? (
            <>
              
              <AddtoCartDialog/>
            </>
          ) : (
            <Button onClick={addToCart} variant="mycolor" className="w-auto">
              Add to Cart
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}