import Artilcles from "@/components/About/Artilcles";
import Hero from "@/components/About/Hero";
import React from "react";

export const revalidate = 60;

const page = () => {
  return (
    <div className="pt-10">
      <Hero />
      <Artilcles />
    </div>
  );
};

export default page;
