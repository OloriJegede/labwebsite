import Image from "next/image";
import Link from "next/link";
import React from "react";

const AppearanceMostRead = () => {
  return (
    <div className="max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 py-14">
        <div>
          <Image src={`/post2.png`} width={604} height={569} alt="most read" />
        </div>
        <div className="px-4 md:px-0 flex flex-col justify-center items-center md:w-[90%] mx-auto">
          <section className="space-y-4 py-10 md:py-0">
            <div className="text-[14px] text-center gotham-medium">
              APPEARANCE
            </div>
            <div className="text-[40px] md:text-[64px] imbue leading-[100%] text-center ">
              Beauty is amplified by small, mindful steps
            </div>
            <div className="text-[18px] text-center md:text-left gotham-thin">
              We champion choices that reflect our dedication to wellbeing. From
              the nourishing foods we savor to the eco-friendly products we
              embrace, we prioritize decisions aligned with our values.
            </div>
            <div className="flex justify-center items-center">
              <Link href={`#`} className="text-[#C43670] text-[18px]">
                Learn more
              </Link>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default AppearanceMostRead;
