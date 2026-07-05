"use client";

import { useCart } from "../../context/cartcontext";

const PriceSummary = () => {
  const { cart } = useCart();

  const subtotal = cart.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const totalDiscount = cart.reduce(
    (sum, item) => sum + (item.price * item.quantity * item.discount) / 100,
    0,
  );

  const grandTotal = subtotal - totalDiscount;

  return (
    <div className="border rounded-lg shadow-sm p-5 mt-6">
      <h2 className="text-xl font-bold mb-4">Price Details</h2>

      <div className="space-y-3">
        <div className="flex justify-between">
          <span>Subtotal</span>
          <span>Rs. {subtotal}</span>
        </div>

        <div className="flex justify-between">
          <span className="text-[#DB4444]">Discount</span>
          <span className="text-[#DB4444]">- Rs. {totalDiscount}</span>
        </div>

        <div className="flex justify-between">
          <span>Shipping</span>
          <span className="text-green-600">Free</span>
        </div>

        <hr />

        <div className="flex justify-between text-xl font-bold">
          <span>Grand Total</span>
          <span className="text-green-600">Rs. {grandTotal}</span>
        </div>
      </div>
    </div>
  );
};

export default PriceSummary;
