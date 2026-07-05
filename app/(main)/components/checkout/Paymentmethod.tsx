"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useCart } from "../../context/cartcontext";
import { useRouter } from "next/navigation";
const Paymentmethod = () => {
  const [payment, setPayment] = useState("");
   const { cart} = useCart();
   const router = useRouter();

   useEffect(() => {
     if (cart.length === 0) {
       router.replace("/");
     }
   }, [cart, router]);

  const handleOrder=async()=>{
    try{
        const res = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/api/orders`,
          {
            method: "POST",
            credentials: "include",
          },
        );
        const result=await res.json();


    if (result.success) {
      toast.success(result.message);
    } else {
      toast.error(result.message);
    }
    
        
    }catch(err){
        console.log(err);
    }
  }
  return (
    <>
      <h1 className="font-bold text-2xl mt-5">Payment Method</h1>
      <div className="flex justify-between mt-5">
        <div className="space-y-3">
          <label className="flex items-center gap-3 cursor-pointer">
            <input
              type="radio"
              name="payment"
              value="cod"
              onChange={(e) => setPayment(e.target.value)}
            />

            <span>Cash on Delivery</span>
          </label>
        </div>

        <Button disabled={payment !== "cod"} onClick={handleOrder}>Place Order</Button>
      </div>
    </>
  );
};

export default Paymentmethod;
