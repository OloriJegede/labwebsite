import Image from "next/image";
import React from "react";
import Link from "next/link";
import { Button } from "../ui/button";

const Radiance = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black text-white">
        <div className="block md:hidden">
          <Image
            src={`https://res.cloudinary.com/dtci8qu00/image/upload/v1768815346/imageappear_d2d6rc.png`}
            width={756}
            height={688}
            alt="balance"
            className="w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-start px-10 md:px-20">
          <div className="py-10 md:px-0">
            <h3 className="text-[14px] md:text-[18px] gotham-thin">
              APPEARANCE{" "}
            </h3>
            <h2 className="text-[40px] md:text-[64px] imbue">
              Radiance From Within
            </h2>
            <p className="text-[14px] md:text-[18px] mb-5">
              True beauty begins with self-care rituals that nurture your skin
              and soul. Discover clean, conscious products and practices that
              enhance your natural glow.
            </p>
            <Link href={`/appearance`}>
              <Button size={`lg`} className="text-white bg-transparent px-0">
                Learn more{" "}
                <Image
                  src="/white-arrow-right.svg"
                  width={16}
                  height={16}
                  alt="arrow"
                  className=""
                />
              </Button>
            </Link>
          </div>
        </div>
        <div className="hidden md:block">
          <Image
            src={`https://res.cloudinary.com/dtci8qu00/image/upload/v1768815346/imageappear_d2d6rc.png`}
            width={756}
            height={688}
            alt="balance"
            className="w-full"
          />
        </div>
      </div>
    </div>
  );
};

export default Radiance;
