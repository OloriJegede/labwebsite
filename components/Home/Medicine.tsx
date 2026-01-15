import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Medicine = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black text-white">
        <div>
          <Image
            src={`/medicine.png`}
            width={756}
            height={688}
            alt="balance"
            className="w-full"
          />
        </div>
        <div className="flex flex-col justify-center items-start px-10 md:px-20">
          <div className="py-10 md:px-0">
            <h3 className="text-[14px] md:text-[18px] gotham-thin">
              BALANCED DIET{" "}
            </h3>
            <h2 className="text-[40px] md:text-[64px] imbue">
              Food as Medicine
            </h2>
            <p className="text-[14px] md:text-[18px] mb-5">
              Every meal is an opportunity to honor your body. We explore the
              intersection of flavor and nutrition, creating dishes that satisfy
              both your palate and your wellbeing.
            </p>
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default Medicine;
