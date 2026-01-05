import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Post from "../reusables/Post";
const Artilcles = () => {
  return (
    <div className="max-w-7xl mx-auto pb-14 px-4 md:px-0 ">
      <div>
        <div className="imbue-medium text-[48px]">Other Articles</div>
      </div>
      <section className="block md:hidden space-y-6 ">
        {Array.from({ length: 5 }).map((_, index) => (
          <Post key={index} />
        ))}
      </section>
      <section className="hidden md:block">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-[382px] md:w-[1283px] mx-auto"
        >
          <CarouselContent>
            {Array.from({ length: 5 }).map((_, index) => (
              <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/4">
                <Post />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </section>
    </div>
  );
};

export default Artilcles;
