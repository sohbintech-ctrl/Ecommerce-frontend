import CarouselBanner from "./components/homepage/carsouelbanner";
import Products from "./components/homepage/products";


export default function Home() {
  return (
    <div className="max-w-7xl mx-auto">
    <CarouselBanner/>
    <Products/>
    </div>
  );
}
