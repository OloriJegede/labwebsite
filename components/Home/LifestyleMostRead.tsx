import Image from "next/image";
import Link from "next/link";
import React from "react";

const LifestyleMostRead = () => {
  return (
    <div className="max-w-7xl mx-auto ">
      <div className="grid grid-cols-1 md:grid-cols-2 py-14">
        <div className="px-4 md:px-0 flex flex-col justify-center items-center md:w-[90%] mx-auto">
          <section className="space-y-4">
            <div className="text-[14px] text-center gotham-medium">
              LIFESTYLE /{" "}
              <span className="text-[#999999]">1 DECEMBER 2025</span>
            </div>
            <div className="text-[40px] md:text-[64px] imbue leading-[100%] text-center ">
              Wellness is a journey of small, intentional choices
            </div>
            <div className="text-[18px] gotham-thin text-center md:text-left">
              Every choice matters. From the food we eat to the products we use,
              we believe in making decisions with purpose and awareness.
            </div>
            <div className="flex justify-center items-center">
              <Link href={`#`} className="text-[#C43670] text-[18px]">
                Read more
              </Link>
            </div>
          </section>
        </div>
        <div>
          <Image
            src={`/mostread.png`}
            width={604}
            height={569}
            alt="most read"
          />
        </div>
      </div>
    </div>
  );
};

export default LifestyleMostRead;
