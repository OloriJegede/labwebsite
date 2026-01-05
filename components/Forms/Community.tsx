import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Community = () => {
  return (
    <div className="bg-black p-6 md:p-12 text-white space-y-5">
      <div className="text-[40px] md:text-[56px] imbue-medium leading-[100%]">
        Join the L.A.B. Community
      </div>
      <div className="text-[14px] md:text-[16px]">
        Get weekly science-informed lifestyle tips, beauty insights, food
        guides, and more.
      </div>
      <div className="space-y-4">
        <Input type="text" placeholder="First Name" />
        <Input type="text" placeholder="Last Name" />
        <Input type="email" placeholder="Email" />
      </div>
      <div className="pt-5">
        <Button className="bg-white text-black hover:bg-[#ECC5C0] w-full">
          Subscribe Now
        </Button>
      </div>
    </div>
  );
};

export default Community;
