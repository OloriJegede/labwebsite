import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Medicine = () => {
  return (
    <div className="px-4 md:px-0">
      <div className="grid grid-cols-1 md:grid-cols-2 bg-black text-white">
        <div>
          <Image
            src={`https://res.cloudinary.com/dtci8qu00/image/upload/v1768817961/image-balance_diet_oefszg.png`}
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
              Food to Slow Age
            </h2>
            <p className="text-[14px] md:text-[18px] mb-5">
              Every meal is an opportunity to nourish your body from the inside.
              We explore the best anti-aging food and supplements that are
              backed by science.
            </p>
            <Link href={`/balance-diet`}>
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
      </div>
    </div>
  );
};

export default Medicine;
