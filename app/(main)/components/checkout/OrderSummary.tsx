"use client";
import { useEffect } from "react";
import { useCart } from "../../context/cartcontext";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Delete } from "lucide-react";
import PriceSummary from "./PriceSummary";

const OrderSummary = () => {
  const { cart, deleteCart, getCart, increaseQuantity, decreaseQuantity } =
    useCart();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <div className="mt-10 ">
      <div>
        <h1 className="font-bold md:text-2xl">Order Summary</h1>
      </div>
      <div className=" border rounded-lg shadow-sm space-y-2 mt-5 mb-5 p-4">
        {cart.map((item) => {
          return (
            <div key={item.cartId} className="flex border-b-2 p-3">
              <div className="flex gap-4">
                <div>
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/${item.image}`}
                    alt={item.productName}
                    width={70}
                    height={70}
                    className="rounded object-contain"
                    unoptimized
                  />
                </div>

                <div>
                  <h2 className="font-semibold text-sm">{item.productName}</h2>

                  <div className="flex gap-2 items-center">
                    <Button onClick={() => decreaseQuantity(item.cartId)}>
                      -{" "}
                    </Button>
                    {item.quantity}
                    <Button onClick={() => increaseQuantity(item.cartId)}>
                      +
                    </Button>
                    <Button onClick={() => deleteCart(item.cartId)}>
                      <Delete />
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <PriceSummary/>
    </div>
  );
};

export default OrderSummary;
