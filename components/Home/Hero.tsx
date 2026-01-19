"use client";
import React, { useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import SlideOne from "@/components/reusables/Slides/Slide1";
import SlideTwo from "@/components/reusables/Slides/Slide2";
import SlideThree from "@/components/reusables/Slides/Slide3";
import type { CarouselApi } from "@/components/ui/carousel";

const Hero = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);
  const slideCount = 3;

  React.useEffect(() => {
    if (!api) return;

    setCurrent(api.selectedScrollSnap());

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div className="pt-10 pb-20">
      <Carousel
        opts={{
          align: "center",
          loop: true,
        }}
        setApi={setApi}
        className=""
      >
        <CarouselContent className="-ml-1">
          <CarouselItem className="basis-[387px] md:basis-[1283px]">
            <div className="p-1">
              <SlideTwo />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-[387px] md:basis-[1283px]">
            <div className="p-1">
              <SlideThree />
            </div>
          </CarouselItem>
          <CarouselItem className="basis-[387px] md:basis-[1283px]">
            <div className="p-1">
              <SlideOne />
            </div>
          </CarouselItem>
        </CarouselContent>
        <div className="flex justify-center items-center gap-4">
          <CarouselPrevious className="static translate-y-0" />
          <div className="flex gap-2">
            {Array.from({ length: slideCount }).map((_, index) => (
              <button
                key={index}
                onClick={() => api?.scrollTo(index)}
                className={`h-2 w-2 rounded-full transition-all ${
                  current === index ? "bg-primary w-4" : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          <CarouselNext className="static translate-y-0" />
        </div>
      </Carousel>
    </div>
  );
};

export default Hero;
