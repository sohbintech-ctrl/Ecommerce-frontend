"use client";

import { Package } from "lucide-react";
import { useEffect, useState } from "react";



interface Order {
  orderId: number;
  totalAmount: number;
  paymentMethod: string;
  status: string;
  createdAt: string;

  productId: number;
  productName: string;
  image: string;

  quantity: number;
  price: number;
  discount: number;
}
const orders=()=> {
const [orders, setOrders] = useState<Order[]>([]);

const getOrders = async () => {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/orders`, {
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
  getOrders();
}, []);


  return (
    <div className="space-y-6">
      <h1 className="md:text-2xl font-bold">My Orders</h1>

      {orders.length === 0 ? (
        <div className="flex flex-col items-center text-gray-500 mt-10">
          <Package className="w-10 h-10 mb-2" />
          <p>No orders found</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {orders.map((order: any) => (
            <div
              key={order.id}
              className="border rounded-lg p-4 flex justify-between hover:shadow-md transition"
            >
              {/* Left */}
              <div>
                <p className="font-semibold text-sm md:text-base">Order #{order.orderId}</p>
                <p className="font-semibold text-sm md:text-base">{order.productName}</p>
                <p className="text-sm text-gray-500">{order.createdAt}</p>
              </div>

              {/* Right */}
              <div className="text-right">
                <p className="font-bold text-[#DB4444]">
                  Rs {order.totalAmount}
                </p>

                <p
                  className={`text-sm font-medium ${
                    order.status === "Pending"
                      ? "text-yellow-500"
                      : order.status === "Confirmed"
                        ? "text-blue-500"
                        : order.status === "Packed"
                          ? "text-purple-500"
                          : order.status === "Shipped"
                            ? "text-indigo-500"
                            : order.status === "Delivered"
                              ? "text-green-500"
                              : order.status === "Cancelled"
                                ? "text-red-500"
                                : "text-gray-500"
                  }`}
                >
                  {order.status}
                </p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
export default orders;