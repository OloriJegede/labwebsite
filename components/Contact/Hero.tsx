import React from "react";

const Hero = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-14">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-3">
          <div className="text-[40px] md:text-[96px] leading-[100%] imbue">
            Get in Touch
          </div>
          <p className="text-[18px]">
            We are here to support you on your anti-aging journey.
          </p>
          <p className="text-[18px]">
            Got questions about the L.A.B. Method, products, or consultations?
          </p>
          <p className="text-[18px] gotham-regular">
            Email: info@labmethod.com
          </p>
        </div>
        <div className="space-y-3">
          <div className="text-[40px] md:text-[96px] leading-[100%] imbue">
            Connect with us
          </div>
          <p className="text-[18px]">
            Follow our community for daily aging-well insights.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Hero;
