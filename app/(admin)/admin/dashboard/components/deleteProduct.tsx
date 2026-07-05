"use client";

import { Button } from "@/components/ui/button";
import { PencilIcon, ShareIcon, TrashIcon } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "sonner";

interface DeleteProductProps {
  id: number;
  getProduct: () => void;
}

const DeleteProduct = ({ id,getProduct}:DeleteProductProps ) => {

    const handleDelete = async () => {
     const res = await fetch(
       `${process.env.NEXT_PUBLIC_API_URL}/api/product/${id}`,
       {
         method: "DELETE",
         credentials: "include",
       },
     );

       const result=await res.json();
       if(result.success){
        toast.success(result.message);
       }else{
        toast.error(result.message);
       }
    
     
      getProduct();
    };
    
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <Button variant="outline">...</Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <PencilIcon />
            Edit
          </DropdownMenuItem>
          <DropdownMenuItem>
            <ShareIcon />
            Share
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            variant="destructive"
            onClick={handleDelete}
          >
            <TrashIcon />
            Delete
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
export default DeleteProduct;
