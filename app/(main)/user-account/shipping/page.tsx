"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import AddShippingDialog from "./AddShippingaddress";

interface Address {
  id: number;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  city: string;
  address: string;
}

export const Shipping = () => {
  const [open, setOpen] = useState(false);
  const [shipping, setShipping] = useState<Address | null>(null);

  const getShipping = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/shipping`,
        {
          credentials: "include",
        },
      );

      const data = await res.json();
      setShipping(data.address[0]);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getShipping();
  }, []);

  return (
    <div className=" mt-10">
      <div className="flex items-center justify-between mb-6">
        <h1 className="md:text-2xl font-bold">Address Book</h1>

        <Button onClick={() => setOpen(true)}>
          {shipping ? "Edit Address" : "+ Add Address"}
        </Button>
      </div>

      {!shipping && (
        <div className="border rounded-lg p-5 shadow-sm text-gray-500 text-sm">
          No shipping address added. Please add your shipping address.
        </div>
      )}
      
      {shipping && (
        <div className="border rounded-lg p-5 shadow-sm space-y-2">
          <h2 className="md:text-xl font-semibold">{shipping.fullName}</h2>

          <p className="text-sm md:text-base">{shipping.phone}</p>

          <p className="text-sm md:text-base">
            {shipping.city}, {shipping.province}, {shipping.district}
          </p>

          <p className="text-sm md:text-base">{shipping.address}</p>
        </div>
      )}

      <AddShippingDialog
        open={open}
        setOpen={setOpen}
        shipping={shipping}
        getShipping={getShipping}
      />
    </div>
  );
};
export default Shipping;
