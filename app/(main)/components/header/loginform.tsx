"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { loginSchema, LoginUserData } from "../../zod/auth.schema";
import { useRouter } from "next/navigation";
import { useAuth } from "../../context/authContext";
import RegisterDialog from "./Registerdialog";
import { toast } from "sonner";

const LoginForm = () => {
  //context api
  const { setUser } = useAuth();

  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  //form handling
  const onSubmit = async (data: LoginUserData) => {
    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/api/auth/login`,
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
      //console.log("backend Response",result);

      if (result.success) {
        setUser(result.user);
        toast.success(result.message);
       
        if (result.user.role?.toLowerCase().trim() === "admin") {
          router.push("/admin/dashboard");
        } else {
          router.push("/");
        }
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.log("error", err);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {/* Form */}
      <div className="w-full max-w-md mx-auto px-4">
        {/* logo */}
        <div className="mt-10 pb-8">
          <h1 className="text-2xl md:text-3xl font-bold text-[#DB4444]">
            Log in to Exclusive
          </h1>
          <p className="text-sm md:text-base text-gray-600">
            Enter your details below
          </p>
        </div>
        {/* form page input */}
        <div className="flex flex-col gap-6 mb-6">
          <Input
            type="text"
            placeholder="Enter Email"
            {...register("email")}
            className={`border-0 border-b border-gray-300 rounded-none shadow-none text-sm md:text-base focus-visible:ring-0 focus-visible:border-black ${
              errors.email ? "border-destructive" : ""
            }`}
            required
          />
          {errors.email && (
            <p className="text-sm text-destructive">{errors.email.message}</p>
          )}

          <Input
            type="password"
            placeholder="Enter Password"
            {...register("password")}
            className={`border-0 border-b border-gray-300 rounded-none shadow-none text-sm md:text-base focus-visible:ring-0 focus-visible:border-black ${
              errors.password ? "border-destructive" : ""
            }`}
            required
          />
          {errors.password && (
            <p className="text-sm text-destructive">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* button page */}
        <div className="sm:flex sm:justify-between space-y-2">
          <Button variant="mycolor" className="w-auto px-7 ">
            Login
          </Button>

          <p className="text-sm text-[#DB4444] cursor-pointer hover:underline relative top-3">
            Forget password?
          </p>
        </div>

        <p className="text-sm cursor-pointer mt-2 flex gap-1">
          Don't have an account?
          <RegisterDialog />
        </p>
      </div>
    </form>
  );
};
export default LoginForm;
