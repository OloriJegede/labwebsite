import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const BodyBalance = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black text-white">
        <div>
          <Image
            src={`/balance.png`}
            width={756}
            height={688}
            alt="balance"
            className="w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-start px-10 md:px-20">
          <div className="py-10 md:px-0">
            <h3 className="text-[14px] md:text-[18px] gotham-thin">
              LIFESTYLE/ <span className="gotham-medium">30 NOVEMBER 2025</span>
            </h3>
            <h2 className="text-[40px] md:text-[64px] imbue">
              Mind Body Balance
            </h2>
            <p className="text-[14px] md:text-[18px] mb-5">
              Holistic wellness practices that ground you in the present moment.
              From meditation to movement, find what brings harmony to your
              life.
            </p>
            <Button size={`lg`} className="text-white bg-transparent px-0">
              Read more{" "}
              <Image
                src="/white-arrow-right.svg"
                width={16}
                height={16}
                alt="arrow"
                className=""
              />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BodyBalance;
