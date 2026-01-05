import Image from "next/image";
import React from "react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto pb-14 px-4 md:px-0">
      <span className="text-[#808080] gotham-light text-[18px] border border-[#B3B3B3] rounded-full px-3 py-2 flex-wrap">
        Show with us
      </span>
      <div className="grid grid-cols-1 md:grid-cols-5 gap-10">
        <div className="md:col-span-2">
          <div>
            <div className="pt-8 imbue-medium text-[40px] md:text-[48px] leading-[120%]">
              “L.A.B. is a science-informed method created for women who are
              done guessing, and are ready to understand their bodies, improve
              how they age, and feel powerful in their 40s, 50s, 60s and
              beyond.”
            </div>
            <div className="space-y-3 pt-4 md:pt-0 text-[#1A1A1A] text-[18px]">
              <p>
                In her early 30s, our founder, Dr. Sasha Wynter, experienced a
                health scare that changed everything. Being in the health care
                field for over 2 decades, she returned to science and rebuilt
                her approach to wellness, studying functional medicine, gut
                health, hormone balance, aesthetics, and longevity research, She
                used several protools on herself. Patterns began to emerge.
                Every anti-aging strategy that truly worked fit into one of the
                three categories: Lifestyle. Appearance. Balanced Diet.
              </p>
              <p>
                This simple but transformative realization became the L.A.B.™
                Method
              </p>
              <p>
                Today, L.A.B. is more than just a science-informed method. It
                has grown into a movement. A place where women learn, grow, and
                age with intention.
              </p>
            </div>
          </div>
        </div>
        <div className="md:col-span-3 pt-10 space-y-4">
          <Image
            src={`/about-img.png`}
            width={735.05}
            height={877}
            alt="about us image"
          />
          <div className="pt-8 md:w-[70%] mx-auto">
            <div className="text-[40px] md:text-[48px] imbue-medium text-center leading-[120%]">
              “Our vision is to lead a global movement that transforms how women
              approach wellness, replacing confusion and extremes with clarity,
              science, and confidence.”
            </div>
            <div className="text-[18px] pt-4 md:pt-0 text-center">
              Through our signature pillars: Lifestyle, Appearance, and Balanced
              Diet, L.A.B. empowers women to take control of their energy,
              hormones, and longevity.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
