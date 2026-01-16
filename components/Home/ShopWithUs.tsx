import Image from "next/image";
import React from "react";

const ShopWithUs = () => {
  return (
    <section className="py-24 px-4 md:px-0">
      <div className="md:pl-40">
        <span className="text-[#808080] gotham-light text-[18px] border border-[#B3B3B3] rounded-full px-3 py-2 flex-wrap">
          Shop with us
        </span>
        <div className="text-[24px] gotham-light md:w-[330px] leading-[100%] my-5">
          Purposeful ingredients, perfected for quality.
        </div>
      </div>
      <div className="md:flex md:justify-start md:space-x-10">
        <div>
          <div className="block md:hidden">
            <Image
              src={`/mobile-showwith.png`}
              width={660}
              height={366}
              alt="shop with us"
            />
          </div>
          <div className="hidden md:block">
            <Image
              src={`https://res.cloudinary.com/dtci8qu00/image/upload/v1768550380/showwith3_jlkclu.png`}
              width={660}
              height={366}
              alt="shop with us"
            />
          </div>
        </div>
        <div className="md:flex md:justify-between md:space-x-10">
          <div className="md:w-[424px] ">
            <div className="gotham-thin text-[40px] md:text-[56px] leading-[100%] pt-5 md">
              Your anti-aging arsenal{" "}
              <span className="imbue-medium">awaits.</span>
            </div>
            <div className="text-[#333333] text-[18px] gotham-light pt-5 md:pt-0">
              Support your skin, hormones, energy, and confidence in one place.
            </div>
          </div>
          <div className="pt-5 md:pt-0">
            <Image
              src={`/shopnow.svg`}
              width={78.64}
              height={78.64}
              alt="shopnow"
              className="flex justify-center "
            />
            <div className="gotham-light text-[18px] underline mf:flex md:justify-center pt-3 md:pt-0">
              SHOP NOW
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ShopWithUs;
