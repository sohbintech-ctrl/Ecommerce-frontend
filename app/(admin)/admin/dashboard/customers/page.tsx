"use client";
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

interface data {
  id: number;
  fullName: string;
  email: string;
  role: "user" | "admin";
  createdAt: string;
}

const Customers = () => {
  const [customers, setCustomers] = useState<data[]>([]);
  const [search, setSearch] = useState("");

  const getCustomers = async () => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/customers`,
        {
          method: "GET",
          credentials: "include",
        },
      );

      const data = await res.json();

      if (data.success) {
        setCustomers(data.customers);
      }
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getCustomers();
  }, []);

  const filteredCustomers = customers.filter(
    (c) =>
      c.fullName.toLowerCase().includes(search.toLowerCase()) ||
      c.email.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="bg-muted p-4 ">
      <div className="pt-7 flex justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Customers</h1>
          <p className="text-muted-foreground">
            View and manage customer information
          </p>
        </div>
      </div>

      <div className="mt-5 pt-4 bg-white border-2 rounded-2xl">
        <div className="flex border-b-2 pb-3">
          <Search className="relative left-7 top-2 w-4 text-muted-foreground" />
          <Input
            type="text"
            placeholder="search customers by name or email..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 py-5 bg-[#f1f3f5] border-none mr-4"
          />
        </div>

        <div>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-bold">Name</TableHead>
                <TableHead className="font-bold hidden md:block relative top-2.5">
                  Email
                </TableHead>
                <TableHead className="font-bold">Role</TableHead>
                <TableHead className="font-bold hidden md:block relative top-2.5">
                  Joined
                </TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {filteredCustomers.map((item: any) => (
                <TableRow key={item.id}>
                  <TableCell className="font-bold">{item.fullName}</TableCell>
                  <TableCell className="hidden md:block">
                    {item.email}
                  </TableCell>
                  <TableCell>{item.role}</TableCell>
                  <TableCell className="hidden md:block">
                    {item.createdAt.slice(0,10)}
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
export default Customers;
