"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useEffect, useState } from "react";
import { toast } from "sonner";

interface Shipping {
  id: number;
  fullName: string;
  phone: string;
  province: string;
  district: string;
  city: string;
  address: string;
}

interface Props {
  open: boolean;
  setOpen: (open: boolean) => void;
  shipping: Shipping | null;
  getShipping: () => Promise<void>;
}

export const AddShippingDialog = ({
  open,
  setOpen,
  shipping,
  getShipping,
}: Props) => {
  const [fullName, setFullName] = useState("");
  const [phone, setPhone] = useState("");
  const [province, setProvince] = useState("");
  const [district, setDistrict] = useState("");
  const [city, setCity] = useState("");
  const [streetAddress, setStreetAddress] = useState("");

  useEffect(() => {
    if (shipping) {
      setFullName(shipping.fullName);
      setPhone(shipping.phone);
      setProvince(shipping.province);
      setDistrict(shipping.district);
      setCity(shipping.city);
      setStreetAddress(shipping.address);
    } else {
      setFullName("");
      setPhone("");
      setProvince("");
      setDistrict("");
      setCity("");
      setStreetAddress("");
    }
  }, [shipping]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const url = shipping
        ? `${process.env.NEXT_PUBLIC_API_URL}/api/shipping/updateaddress`
        : `${process.env.NEXT_PUBLIC_API_URL}/api/shipping/addshipping`;

      const method = shipping ? "PUT" : "POST";

      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fullName,
          phone,
          province,
          district,
          city,
          streetAddress,
        }),
      });

      const data = await res.json();
      if (data.success) {
        toast.success(data.message);
        await getShipping();
        setOpen(false);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>
            {shipping ? "Edit Shipping Address" : "Add Shipping Address"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            placeholder="Full Name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
          />

          <Input
            type="number"
            placeholder="Phone Number"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />

          <Input
            placeholder="Province"
            value={province}
            onChange={(e) => setProvince(e.target.value)}
          />

          <Input
            placeholder="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
          />

          <Input
            placeholder="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />

          <Input
            placeholder="Street Address"
            value={streetAddress}
            onChange={(e) => setStreetAddress(e.target.value)}
          />

          <Button className="w-full" type="submit">
            {shipping ? "Save Changes" : "Save Address"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};
export default AddShippingDialog;
