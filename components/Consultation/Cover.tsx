import Image from "next/image";
import React from "react";

const Cover = () => {
  return (
    <div className="bg-[#000000]">
      <div className="max-w-7xl mx-auto px-4 md:px-0">
        <div className="md:w-[80%] mx-auto py-14">
          <div className="grid grid-cols-1 md:grid-cols-7 gap-10">
            <div className="md:col-span-3">
              <div className="imbue text-[40px] pb-4 md:pb-0 md:text-[86px] text-white leading-[100%]">
                What we cover
              </div>
              <Image
                src={`https://res.cloudinary.com/dtci8qu00/image/upload/v1768550384/cover-img_d0ckhm.png`}
                width={459}
                height={359}
                alt="cover image"
              />
            </div>
            <div className="md:col-span-4 pt-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="text-[18px] p-8 bg-white">
                  Skin and appearance concerns
                </div>
                <div className="text-[18px] p-8 bg-white">
                  Hormone shifts and solution pathways
                </div>
                <div className="text-[18px] p-8 bg-white">
                  Lifestyle stressors and sleep habits
                </div>
                <div className="text-[18px] p-8 bg-white">
                  Balanced diet and anti-aging nutrition
                </div>
                <div className="text-[18px] p-8 bg-white">
                  Supplement recommendations
                </div>
                <div className="text-[18px] p-8 bg-white">
                  Personalized L.A.B. plan
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cover;
