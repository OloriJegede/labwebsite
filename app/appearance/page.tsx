import React from "react";
import Posts from "@/components/Appearance/AllPosts";
const page = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 pt-8">
      <div className="imbue-medium text-[48px]">Appearance</div>
      <Posts />
    </div>
  );
};

export default page;
