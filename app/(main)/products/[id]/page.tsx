import DeleteProduct from "@/app/(admin)/admin/dashboard/components/deleteProduct";
import ProductClient from "../../components/cart/productClient";

export default async function ProductPage({ params }: any) {
  const { id } = await params;

  return <ProductClient id={id} />;
}
