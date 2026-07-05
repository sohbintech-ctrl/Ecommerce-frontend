"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Search } from "lucide-react";
import { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import OrderDialog from "../components/orderviewdetails";


interface Order {
  orderId: number;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;

  name: string;

  shippingAddress: {
    fullName: string;
    phone: string;
    province: string;
    district: string;
    city: string;
    address: string;
  };

  products: {
    productId: number;
    productName: string;
    image: string;
    quantity: number;
    price: number;
    discount: number;
  }[];
}

const Orders = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
//getallorder api call
  const getAllOrders = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/orders/admin", {
        method: "GET",
        credentials: "include",
      });

      const result = await res.json();
      if (result.success) {
        setOrders(result.orders);
      }
      console.log(orders);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getAllOrders();
  }, []);

  //update order status api call
  const updateOrderStatus = async (orderId: number, status: string) => {
    const res=await fetch(`http://localhost:5000/api/orders/admin/${orderId}`, {
      method: "PUT",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        status,
      }),
    });
    const result=await res.json();
    if(result.success){
      toast.success(result.message);
    }
  };


  //filtereed orders
  const keyword = search.trim().toLowerCase();

  const filteredOrders = orders.filter((o) => {
    return (
      o.orderId.toString().includes(keyword) ||
      o.shippingAddress.fullName?.toLowerCase().includes(keyword) ||
      o.shippingAddress.phone?.toLowerCase().includes(keyword)
    );
  });

  return (
    <div className="bg-muted p-4 ">
      <div className="pt-7 flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Orders</h1>
          <p className="text-muted-foreground">
            View and manage customer orders
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 bg-white border-2 rounded-2xl">
        <div className="flex border-b-2 pb-3">
          <Search className="relative left-7 top-2 w-4 text-muted-foreground" />
          <Input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="search orders by ID, customer, or email..."
            className="pl-9 py-5 bg-[#f1f3f5] border-none mr-4"
          />
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Order ID</TableHead>
                <TableHead className="font-bold">Customer</TableHead>
                <TableHead className="font-bold hidden md:block relative top-2.5">
                  Total
                </TableHead>
                <TableHead className="font-bold">Status</TableHead>
                <TableHead className="font-bold">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredOrders.map((o) => (
                <TableRow key={o.orderId}>
                  <TableCell className="font-bold">#{o.orderId}</TableCell>
                  <TableCell>
                    {o.shippingAddress.fullName.length > 10
                      ? o.shippingAddress.fullName.slice(0, 7) + "..."
                      : o.shippingAddress.fullName}
                  </TableCell>
                  <TableCell className="hidden md:block relative top-1.5">
                    Rs. {o.totalAmount}
                  </TableCell>
                  <TableCell>
                    <Select
                      defaultValue={o.status}
                      onValueChange={(value) => {
                        updateOrderStatus(o.orderId, value);
                      }}
                    >
                      <SelectTrigger className="w-150px">
                        <SelectValue />
                      </SelectTrigger>

                      <SelectContent>
                        <SelectItem value="Pending">Pending</SelectItem>
                        <SelectItem value="Confirmed">Confirmed</SelectItem>
                        <SelectItem value="Packed">Packed</SelectItem>
                        <SelectItem value="Shipped">Shipped</SelectItem>
                        <SelectItem value="Delivered">Delivered</SelectItem>
                        <SelectItem value="Cancelled">Cancelled</SelectItem>
                      </SelectContent>
                    </Select>
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => {
                        setSelectedOrder(o);
                        setOpen(true);
                      }}
                    >
                      View
                    </Button>
                    <OrderDialog
                      open={open}
                      setOpen={setOpen}
                      order={selectedOrder}
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  );
};
export default Orders;
