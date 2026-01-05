import React from "react";
import Image from "next/image";
import { Button } from "../ui/button";
const Slide = () => {
  return (
    <div className="grid grid-cols-7 h-[569px]">
      <div className="col-span-4 flex flex-col justify-center items-start ">
        <div className="w-4/5">
          <h3 className="text-[#A90C50] tetxt-18px] gotham-medium">
            LIFESTYLE
          </h3>
          <h2 className="text-[48px] imbue">Anti-aging starts here</h2>
          <p className="text-[18px] gotham-light mb-5">
            Simple habits that strengthen your mind, mood, and daily wellbeing.
          </p>
          <Button>
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
      <div className="col-span-3">
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
