import Image from "next/image";
import React from "react";
import { Button } from "../ui/button";
import Link from "next/link";

interface ProductProps {
  imageUrl: string;
  name: string;
  price: string;
  buyLink: string;
}

const Product = ({ imageUrl, name, price, buyLink }: ProductProps) => {
  return (
    <div className="flex flex-col justify-center items-center space-y-2 ">
      <Image
        src={imageUrl}
        width={225}
        height={284}
        className="w-auto h-[284px]"
        alt="product"
      />
      <div className="text-[20px]">{name}</div>
      <div className="text-[24px] gotham-regular">${price}</div>
      <Link href={buyLink} target="_blank" rel="noopener noreferrer">
        <Button
          size={`lg`}
          className="bg-[#ECC5C0] text-black hover:text-white"
        >
          Buy Now
        </Button>
      </Link>
    </div>
  );
};

export default Product;
