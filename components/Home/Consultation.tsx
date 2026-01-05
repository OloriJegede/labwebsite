import React from "react";
import { Button } from "../ui/button";
import Image from "next/image";

const Consultation = () => {
  return (
    <div className="py-20n px-4 md:px-0">
      <div className="imbue-medium text-[40px] md:text-[56px] md:text-center">
        Book a Personalized Consultation
      </div>
      <div className="text-[18px] md:text-[24px] md:text-center">
        Get a tailored plan for your skin, hormones, diet, and lifestyle
      </div>
      <div className="flex md:justify-center pt-8">
        <Button>
          Book a consultation
          <Image
            src="/arrow-right.svg"
            width={16}
            height={16}
            alt="arrow"
            className=""
          />
        </Button>
      </div>
    </div>
  );
};

export default Consultation;
