import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-5 gap-0 max-w-7xl mx-auto px-4 md:px-0 pb-10">
      <div className="md:col-span-4 pt-10 md:pt-0">
        <div className="block md:hidden">
          <span className="text-[#808080] gotham-light text-[18px] border border-[#B3B3B3] rounded-full px-3 py-2 flex-wrap">
            Consultation
          </span>
        </div>
        <div className="grid grid-cols-5">
          <div className="col-span-3">
            <div className="imbue text-[168.97px] md:text-[483.98px] leading-[100%]">
              Feel
            </div>
          </div>
          <div className="col-span-2 pt-4  md:pt-18">
            <div className="imbue text-[40.3px] md:text-[112px] leading-[100%]">
              Seen
            </div>
            <div className="imbue text-[40.3px] md:text-[112px] leading-[100%]">
              Supported
            </div>
            <div className="imbue text-[40.3px] md:text-[112px] leading-[100%]">
              Empowered
            </div>
          </div>
        </div>
        <div>
          A one-on-one session designed to help you understand what your body
          needs at this stage of life, using a holistic and science-driven
          approach.
        </div>
      </div>
      <div className="md:col-span-1 pt-14">
        <div className="hidden md:block">
          <span className="text-[#808080] gotham-light text-[18px] border border-[#B3B3B3] rounded-full px-3 py-2 flex-wrap">
            Consultation
          </span>
        </div>
        <div className="pt-24 hidden md:block">
          <Image src={`/curve.svg`} width={219.5} height={309.01} alt="curve" />
        </div>
      </div>
    </div>
  );
};

export default Hero;
