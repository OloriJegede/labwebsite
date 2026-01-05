import React from "react";
import Image from "next/image";
import { Button } from "../../ui/button";
const Slide = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-3 md:h-[569px]">
      <div className="md:col-span-4 flex flex-col justify-center items-start ">
        <div className="w-4/5">
          <h3 className="text-[#A90C50] text-[10px] md:text-[18px] gotham-medium">
            LIFESTYLE
          </h3>
          <h2 className="text-[40px] md:text-[48px] imbue leading-[100%]">
            Anti-aging starts here
          </h2>
          <p className="text-[14px] md:text-[18px] gotham-light mb-5">
            Simple habits that strengthen your mind, mood, and daily wellbeing.
          </p>
          <Button size={`sm`}>
            Read more{" "}
            <Image
              src="/arrow-right.svg"
              width={16}
              height={16}
              alt="arrow"
              className=""
            />
          </Button>
        </div>
      </div>
      <div className="md:col-span-3">
        <Image
          src="/heroA.png"
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
