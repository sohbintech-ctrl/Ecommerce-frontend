"use client";

import OrderSummary from "../components/checkout/OrderSummary";
import Paymentmethod from "../components/checkout/Paymentmethod";
import ShippingPage from "../components/shipping/ShippingForm";

const CheckOut = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <ShippingPage />
      <OrderSummary />
      <Paymentmethod/>
    </div>
  );
};
export default CheckOut;
