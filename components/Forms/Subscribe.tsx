import React from "react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const Subscribe = () => {
  return (
    <div className="bg-black p-8 text-white space-y-5">
      <div className="text-[24px] gotham-medium">
        Be in the loop whenever we drop new gems
      </div>
      <div className="space-y-4">
        <Input type="text" placeholder="Name" />
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

export default Subscribe;
