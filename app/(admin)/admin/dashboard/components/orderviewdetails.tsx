"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

type Order = {
  orderId: number;
  totalAmount: number;
  status: string;

  shippingAddress: {
    fullName: string;
    phone: string;
    city: string;
    address: string;
  };

  products: {
    productName: string;
    quantity: number;
    price: number;
  }[];
};

type Props = {
  open: boolean;
  setOpen: (v: boolean) => void;
  order: Order | null;
};

const OrderDialog = ({ open, setOpen, order }: Props) => {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle>Order Details</DialogTitle>
        </DialogHeader>

        {/* BODY */}
        {order && (
          <div className="space-y-5">
            {/* CUSTOMER */}
            <div>
              <h2 className="font-bold">Customer</h2>
              <p>{order.shippingAddress.fullName}</p>
              <p>{order.shippingAddress.phone}</p>
            </div>

            {/* ADDRESS */}
            <div>
              <h2 className="font-bold">Address</h2>
              <p>{order.shippingAddress.city}</p>
              <p>{order.shippingAddress.address}</p>
            </div>

            {/* PRODUCTS */}
            <div>
              <h2 className="font-bold">Products</h2>

              {order.products.map((p, i) => (
                <div key={i} className="border p-2 rounded mt-2">
                  <p className="font-medium">{p.productName}</p>
                  <p>Qty: {p.quantity}</p>
                  <p>Price: {p.price}</p>
                </div>
              ))}
            </div>

            {/* TOTAL */}
            <div className="font-bold text-lg">Total: {order.totalAmount}</div>

            {/* STATUS */}
            <div>Status: {order.status}</div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default OrderDialog;
