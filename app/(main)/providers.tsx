"use client";

import { AuthProvider } from "./context/authContext";
import { CartProvider } from "./context/cartcontext";

export default function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
      </CartProvider>
    </AuthProvider>
  );
}
