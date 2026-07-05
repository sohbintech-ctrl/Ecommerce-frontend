"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { RegisterUserData, registerUserSchema } from "../../zod/auth.schema";
import { toast } from "sonner";


interface RegisterFormProps {
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
export const RegisterForm=({ setOpen }: RegisterFormProps)=>{
    const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver:zodResolver(registerUserSchema)
  })

  //form handling
  const onSubmit = async (data: RegisterUserData) => {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/auth/register`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(data),
      },
    );

    const result = await res.json();
    //console.log("Backend response:", result);
    if(result.success){
     toast.success(result.message);
       setOpen(false);
    }else{
      toast.error(result.message);
    }
   
  } catch (error) {
    console.error("Error:", error);
  }
};
    return(   
  <form 
  onSubmit={handleSubmit(onSubmit)}
>
  {/* Form */}
  <div>
    <div className="pb-6 md:pb-10">
      <h1 className="text-2xl md:text-3xl font-semibold text-[#DB4444]">
        Create an account
      </h1>
      <p className="text-sm md:text-base text-gray-600">Enter your details below</p>
    </div>

    <div className="flex flex-col gap-6 w-full max-w-md mb-5">
      <Input
        type="text"
        placeholder="Full Name"
        {...register("name")}
        className={`border-0 border-b border-gray-300 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-black ${
          errors.name ? "border-destructive" : ""
        }`}
        required
      />
      {errors.name && (
        <p className="text-sm text-destructive">{errors.name.message}</p>
      )}

      <Input
        type="text"
        placeholder="Enter a Email"
        {...register("email")}
        className={`border-0 border-b border-gray-300 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-black ${
          errors.email ? "border-destructive" : ""
        }`}
        required
      />
      {errors.email && (
        <p className="text-sm text-destructive">{errors.email.message}</p>
      )}

      <Input
        type="password"
        placeholder="Enter a Password"
        {...register("password")}
        className={`border-0 border-b border-gray-300 rounded-none shadow-none focus-visible:ring-0 focus-visible:border-black ${
          errors.password ? "border-destructive" : ""
        }`}
        required
      />
      {errors.password && (
        <p className="text-sm text-destructive">{errors.password.message}</p>
      )}
    </div>

    <div>
      <Button className="w-full md:w-auto" variant="mycolor">
        Create Account
      </Button>
    </div>
  </div>
</form>
       
    )
}
export default RegisterForm;