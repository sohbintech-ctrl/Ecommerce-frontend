"use client";

import { useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";

import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { useCart } from "../../context/cartcontext";

interface Props {
  open: boolean;
  setOpen: (v: boolean) => void;
}

export default function AddToCartSheet({ open, setOpen }: Props) {
  const router = useRouter();

  const { cart, deleteCart, getCart, increaseQuantity, decreaseQuantity } =
    useCart();

  useEffect(() => {
    getCart();
  }, []);

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetContent className="flex flex-col">
        <SheetHeader>
          <SheetTitle className="text-sm md:text-base">Your Cart</SheetTitle>
        </SheetHeader>

        <div className=" space-y-5 px-2 flex-1 overflow-y-auto">
          {cart.length === 0 ? (
            <p className="text-sm md:text-base">Your cart is empty.</p>
          ) : (
            cart.map((item) => (
              <div
                key={item.cartId}
                className="flex gap-4 border rounded-lg p-3"
              >
                <Image
                  src={item.image}
                  alt={item.productName}
                  width={400}
                  height={400}
                  className="max-w-full max-h-full object-contain"
                />

                <div className="flex-1">
                  <h2 className="font-semibold text-sm md:text-base">
                    {item.productName}
                  </h2>

                  <p className="text-[#DB4444] font-bold text-sm md:text-base">
                    Rs.
                    {item.price * item.quantity -
                      (item.price * item.quantity * item.discount) / 100}
                  </p>

                  <div className="flex gap-2 items-center">
                    <Button onClick={() => decreaseQuantity(item.cartId)}>
                      -
                    </Button>
                    {item.quantity}
                    <Button onClick={() => increaseQuantity(item.cartId)}>
                      +
                    </Button>
                  </div>

                  <Button onClick={() => deleteCart(item.cartId)}>
                    Delete
                  </Button>
                </div>
              </div>
            ))
          )}
        </div>

        <SheetFooter>
          <Button
            disabled={cart.length === 0}
            onClick={() => {
              setOpen(false);
              router.push("/checkout");
            }}
          >
            Proceed to Checkout
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
