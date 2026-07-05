"use client";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import Image from "next/image";

//carseoul banner
const CarouselBanner = () => {
  const banners = [
    "/banner.avif",
    "/banner1.avif",
    "/banner2.avif"
    ];

  return (
    <Carousel className=" relative mt-5" opts={{
        loop:true,
    }}
    plugins={[
        Autoplay({
            delay:3000,
            stopOnInteraction:false,
        })
    ]}
    >
      <CarouselContent>
        {banners.map((img, i) => (
          <CarouselItem key={i}>
            <div className="relative h-250px md:h-450px">
              <Image
                src={img}
                alt="banner"
                height={500}
                width={1920}
                className="w-full h-auto"
                sizes="85vw"
              />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
     
       <CarouselPrevious className="absolute left-2 top-1/2 -translate-y-1/2 z-10" />
      <CarouselNext className="absolute right-2 top-1/2 -translate-y-1/2 z-10"/>
    </Carousel>
  );
};

export default CarouselBanner;