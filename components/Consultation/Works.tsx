import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

const Works = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-14">
      <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
        <div className="md:col-span-3">
          <Image
            src={`/consultation-img.png`}
            width={729}
            height={624}
            alt="consultation image"
          />
        </div>
        <div className="md:col-span-2 flex flex-col justify-center items-start">
          <div className="text-[40px] md:text-[56px] imbue-medium">
            Why it works?
          </div>
          <div className="text-[18px] space-y-4">
            <p>
              You receive a clear, non-overwhelming plan built from clinical
              experience, research, and your unique lifestyle.
            </p>
            <p> Lets create your personalized L.A.B. method.</p>
          </div>
          <div className="pt-10">
            <Link href="/booking">
              <Button className="bg-black text-white">
                Book Your Consultation{" "}
                <Image
                  src={`/white-arrow-right.svg`}
                  width={20}
                  height={20}
                  alt="arrow"
                />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Works;
