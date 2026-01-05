import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";

const Product = () => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 ">
      <Image src={`/bottle1.png`} width={130} height={284} alt="product" />
      <div className="text-[20px]">Radiance Syrup</div>
      <div className="text-[24px] gotham-regular">$200</div>
      <Button size={`lg`} className="bg-[#ECC5C0] text-black hover:text-white">
        Buy Now
      </Button>
    </div>
  );
};

export default Product;
