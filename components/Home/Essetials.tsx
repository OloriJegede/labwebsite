import React from "react";
import Product from "../reusables/Product";
import Image from "next/image";

const Essetials = () => {
  return (
    <div className="max-w-7xl mx-auto pb-10 px-4 md:px-0">
      <div className="text-[32px] md:text-[56px] imbue-medium md:text-center">
        Glow forward: Shop the Essentials
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        <Product />
        <Product />
        <Product />
        <Product />
      </div>
      <div className="flex justify-center items-center space-x-2 pt-10">
        <div className="gotham-medium underline">VIEW ALL PRODUCTS</div>
        <Image
          src={`/arrow-right.svg`}
          alt="arrow"
          width={20.01}
          height={20.01}
        />
      </div>
    </div>
  );
};

export default Essetials;
