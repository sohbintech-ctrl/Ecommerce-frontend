"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import Price from "../price/price";
import LoadingSpinner from "@/app/(admin)/admin/dashboard/components/Loadingspinner";

interface Product {
  id: number;
  productName: string;
  image: string;
  price: number;
  stock: number;
  discount: number;
  category: string;
}

const Products = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

 

  const getProducts = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/products`,
        {
          credentials: "include",
        },
      );

      const data = await res.json();

      //console.log(data);

      setProducts(data.product);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getProducts();
  
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }
  return (
    <div className="mt-8 mx-4 md:mt-10 ">
      <h1 className="text-lg md:text-3xl font-bold">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-5 md:mt-10">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id}>
            <Card key={product.id} className="overflow-hidden">
              <div className="h-52 flex items-center justify-center bg-white p-4">
                <Image
                  src={product.image}
                  alt={product.productName}
                  width={400}
                  height={400}
                  className="max-w-full max-h-full object-contain"
                />
              </div>

              <CardContent className="md:pt-4">
                <h2 className="md:text-lg font-semibold">
                  {product.productName.split(" ").length > 4
                    ? `${product.productName.split(" ").slice(0, 4).join(" ")}...`
                    : product.productName}
                </h2>

                <Price price={product.price} discount={product.discount} />
              </CardContent>

              <CardFooter>
                <Button className="w-full" variant="mycolor">
                  View Details
                </Button>
              </CardFooter>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Products;
