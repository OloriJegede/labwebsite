import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
import Link from "next/link";
const Slide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3 md:h-[569px]">
      <div className="md:col-span-4 flex flex-col justify-center items-start ">
        <div className="w-[85%]">
          <h3 className="text-[#A90C50] text-[10px] md:text-[18px] gotham-medium">
            APPEARANCE
          </h3>
          <h2 className="text-[40px] md:text-[48px] imbue leading-[100%] my-2">
            Skin, hair, confidence backed by science, built for real life
          </h2>
          <p className="text-[14px] md:text-[18px] gotham-light mb-5">
            Skin, treatments, and rituals rooted in science and built for real
            life.
          </p>
          <div className="flex justify-start items-center space-x-3">
            <Link href={`appearance`}>
              <Button>
                Learn more{" "}
                <Image
                  src="/arrow-right.svg"
                  width={16}
                  height={16}
                  alt="arrow"
                  className=""
                />
              </Button>
            </Link>
            <Link href="#footer" className="underline">
              Join our community
            </Link>
          </div>
        </div>
      </div>
      <div className="md:col-span-3">
        <Image
          src="https://res.cloudinary.com/dtci8qu00/image/upload/v1768550385/heroC_va4dvu.png"
          width={604}
          height={569}
          className=""
          alt="hero1"
        />
      </div>
    </div>
  );
};

export default Slide;
