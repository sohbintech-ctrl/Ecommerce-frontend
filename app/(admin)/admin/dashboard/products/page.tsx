"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Field, FieldGroup } from "@/components/ui/field";
import { Label } from "@/components/ui/label";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Search } from "lucide-react";
import { useEffect, useState } from "react";
import DeleteProduct from "../components/deleteProduct";
import { toast } from "sonner";

const Products = () => {
  const [product, setProduct] = useState("");
  const [SKU, setSKU] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [category, setCategory] = useState("");
  const [productss, setProductss] = useState<any[]>([]);
  const [search, setSearch] = useState("");
  const [image, setImage] = useState<File | null>(null);
  const [discount, setDiscount] = useState("");
  const [isDialogOpen, setIsDialogOpen] = useState(false); 

  //form handling
  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const formData = new FormData();

    formData.append("product", product);
    formData.append("SKU", SKU);
    formData.append("category", category);
    formData.append("stock", stock);
    formData.append("discount", discount);
    formData.append("price", price);

    if (image) {
      formData.append("image", image);
    }

    //console.log([...formData.entries()]);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/product/products`,
        {
          method: "POST",
          credentials: "include",
          body: formData,
        },
      );

      const result = await res.json();
      toast.success(result.message);

      // Reset form fields
      setProduct("");
      setSKU("");
      setPrice("");
      setStock("");
      setCategory("");
      setDiscount("");
      setImage(null);

      // Close dialog
      setIsDialogOpen(false);

      await getProduct();
    } catch (err) {
      console.log(err);
    }
  };

  const getProduct = async () => {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/product/products`,
      {
        credentials: "include",
      },
    );

    const data = await res.json();
    console.log("data", data);
    setProductss(data.product);
  };

  useEffect(() => {
    getProduct();
  }, []);

  //console.log("product",productss);

  const filteredProducts = productss.filter(
    (p) =>
      p.productName.toLowerCase().includes(search.toLowerCase()) ||
      p.SKU.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-muted p-4">
      {/*product add management*/}
      <div className="pt-7 flex justify-between">
        <div>
          <h1 className="md:text-3xl font-semibold tracking-tight text-2xl">
            Products
          </h1>
          <p className="text-muted-foreground text-sm">
            Manage your product inventory
          </p>
        </div>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>+Add product</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-sm">
            <form onSubmit={handleSubmit}>
              <DialogHeader>
                <DialogTitle>Add New Product</DialogTitle>
                <DialogDescription>
                  Add a new product to your inventory.
                </DialogDescription>
              </DialogHeader>
              <FieldGroup className="mt-5">
                <Field>
                  <Label htmlFor="name-1">Product Image</Label>
                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => setImage(e.target.files?.[0] || null)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="name-1">Product Name</Label>
                  <Input
                    type="text"
                    placeholder="Enter product name"
                    value={product}
                    onChange={(e) => setProduct(e.target.value)}
                  />
                </Field>
                <Field>
                  <Label htmlFor="SKU-1">SKU</Label>
                  <Input
                    type="text"
                    placeholder="Enter SKU"
                    value={SKU}
                    onChange={(e) => setSKU(e.target.value)}
                  />
                </Field>

                <Field>
                  <Label htmlFor="SKU-1">Discount</Label>
                  <Input
                    type="number"
                    placeholder="0.00"
                    value={discount}
                    onChange={(e) => setDiscount(e.target.value)}
                  />
                </Field>

                <div className="flex gap-5">
                  <Field>
                    <Label htmlFor="SKU-1">Price</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={price}
                      onChange={(e) => setPrice(e.target.value)}
                    />
                  </Field>
                  <Field>
                    <Label htmlFor="SKU-1">Stock</Label>
                    <Input
                      type="number"
                      placeholder="0.00"
                      value={stock}
                      onChange={(e) => setStock(e.target.value)}
                    />
                  </Field>
                </div>

                <Select
                  value={category}
                  onValueChange={(value) => setCategory(value)}
                >
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Select Category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectGroup>
                      <SelectItem value="Clothing">Clothing</SelectItem>
                      <SelectItem value="Mobile">Mobile</SelectItem>
                      <SelectItem value="Shoes">Shoes</SelectItem>
                    </SelectGroup>
                  </SelectContent>
                </Select>
              </FieldGroup>
              <DialogFooter>
                <DialogClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DialogClose>
                <Button type="submit">Add Product</Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      {/*shown the product*/}
      <div className="mt-5 pt-4 bg-white border-2 rounded-2xl">
        <div className="flex border-b-2 pb-3">
          <Search className="relative left-7 top-2 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="search product by name or SKU...."
            className="pl-9 py-5 bg-[#f1f3f5] border-none mr-4 text-sm"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Product</TableHead>
                <TableHead className="font-bold  hidden md:block relative top-2.5">
                  SKU
                </TableHead>
                <TableHead className="font-bold">Category</TableHead>
                <TableHead className="font-bold">Price</TableHead>
                <TableHead className="font-bold hidden md:block relative top-2.5">
                  Stock
                </TableHead>
                <TableHead className="font-bold">Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredProducts.map((p) => (
                <TableRow key={p.id}>
                  <TableCell className="font-bold">
                    {p.productName.split(" ").length > 4
                      ? `${p.productName.split(" ").slice(0, 1).join(" ")}...`
                      : p.productName}
                  </TableCell>
                  <TableCell className="hidden md:block">{p.SKU}</TableCell>
                  <TableCell>{p.category}</TableCell>
                  <TableCell>{p.price}</TableCell>
                  <TableCell className="hidden md:block relative top-1.5">{p.stock}</TableCell>
                  <TableCell>
                    <span
                      className={`px-2 py-1 rounded-full text-white text-xs ${
                        p.status === "in-stock"
                          ? "bg-black"
                          : p.status === "low-stock"
                            ? "bg-gray-400"
                            : "bg-red-500"
                      }`}
                    >
                      {p.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <DeleteProduct id={p.id} getProduct={getProduct} />
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
export default Products;
