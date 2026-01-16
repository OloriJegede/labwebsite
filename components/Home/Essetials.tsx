import React from "react";
import Product from "../reusables/Product";
import Image from "next/image";
import Link from "next/link";

const products = [
  {
    imageUrl:
      "https://res.cloudinary.com/dtci8qu00/image/upload/v1768550386/approved1_xa2pah.png",
    name: "Radiance Syrup",
    price: "185.00",
    buyLink:
      "https://www.shopltk.com/explore/L.A.B/posts/d23a1de5-ea91-11f0-a2be-0242ac110012",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dtci8qu00/image/upload/v1768550387/approved2_zmqvhw.png",
    name: "Phloretin CF",
    price: "185.00",
    buyLink:
      "https://www.shopltk.com/explore/L.A.B/posts/d23a1de5-ea91-11f0-a2be-0242ac110012",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dtci8qu00/image/upload/v1768550377/approved3_wzlays.png",
    name: "Vitamin C Serum",
    price: "21.44",
    buyLink:
      "https://www.shopltk.com/explore/L.A.B/posts/d23a1de5-ea91-11f0-a2be-0242ac110012",
  },
  {
    imageUrl:
      "https://res.cloudinary.com/dtci8qu00/image/upload/v1768550377/approved4_gkodm1.png",
    name: "Radiance Syrup",
    price: "27.00",
    buyLink:
      "https://www.shopltk.com/explore/L.A.B/posts/1395c600-ea9a-11f0-9674-0242ac110008",
  },
  // ...repeat for other products
];

const Essetials = () => {
  return (
    <div className="max-w-7xl mx-auto pb-10 px-4 md:px-0">
      <div className="text-[32px] md:text-[56px] imbue-medium md:text-center">
        L.A.B Approved
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
        {products.map((product, index) => (
          <Product
            key={index}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            buyLink={product.buyLink}
          />
        ))}
      </div>
      <div className="flex justify-center items-center space-x-2 pt-10">
        <Link
          href={"https://www.shopltk.com/explore/L.A.B"}
          target="_blank"
          className="gotham-medium underline"
        >
          VIEW ALL PRODUCTS
        </Link>
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
