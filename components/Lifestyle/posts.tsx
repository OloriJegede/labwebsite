import React from "react";
import Post from "../reusables/Post";
import { Button } from "../ui/button";

const posts = () => {
  return (
    <div className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
        <Post />
      </div>
      <div className="flex justify-center py-14">
        <Button className="bg-[#A90C50] text-white px-20">
          Load older posts
        </Button>
      </div>
    </div>
  );
};

export default posts;
