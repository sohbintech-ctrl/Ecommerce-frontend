import {
  Card,
  CardAction,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Box, DollarSign, ShoppingCart, TrendingUp } from "lucide-react";

const CardContents = () => {
  return (
    <div className="p-4 md:pt-7 bg-[#f7f7f7]">
      {/*Card Dashboard */}
      <h1 className="md:text-3xl font-semibold tracking-tight text-md">
        Dashboard
      </h1>
      <p className="text-muted-foreground text-sm">
        Welcome to Back! Here's what's happening with your store
      </p>

      <div className="grid md:grid-cols-4 grid-cols-2 gap-4 py-4">
        <Card className="py-5">
          <CardHeader>
            <CardTitle className="text-gray-500 font-medium">
              Total Revenue
            </CardTitle>
            <CardAction>
              <DollarSign className="w-4 text-gray-500" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="font-bold text-lg md:text-2xl">$59,845.68</p>
            <p className="text-green-600 text-sm">+20% from last month</p>
          </CardContent>
        </Card>

        <Card className="py-5">
          <CardHeader>
            <CardTitle className="text-gray-500 font-medium">Orders</CardTitle>
            <CardAction>
              <ShoppingCart className="w-4 text-gray-500" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="font-bold text-lg md:text-2xl">2,350</p>
            <p className="text-green-600 text-sm">+12.5% from last month</p>
          </CardContent>
        </Card>

        <Card className="py-5">
          <CardHeader>
            <CardTitle className="text-gray-500 font-medium">
              Product sold
            </CardTitle>
            <CardAction>
              <Box className="w-4 text-gray-500" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="font-bold  text-lg md:text-2xl">12,432</p>
            <p className="text-green-600 text-sm">+10.3% from last month</p>
          </CardContent>
        </Card>

        <Card className="py-5">
          <CardHeader>
            <CardTitle className="text-gray-500 font-medium">
              Total Revenue
            </CardTitle>
            <CardAction>
              <TrendingUp className="w-4 text-gray-500" />
            </CardAction>
          </CardHeader>
          <CardContent className="flex flex-col gap-1">
            <p className="font-bold  text-lg md:text-2xl">$59845.68</p>
            <p className="text-red-600 text-sm">-20% from last month</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
export default CardContents;
