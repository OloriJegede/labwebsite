import React from "react";
import Post from "../reusables/Post";

const LatestPost = () => {
  return (
    <div className="bg-[#F9F9F9] px-4 md:px-0">
      <section className="max-w-7xl mx-auto py-14">
        <div className="text-[24px] md:text-center mb-6">LATEST POSTS</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <Post />
          <Post />
          <Post />
          <Post />
        </div>
      </section>
    </div>
  );
};

export default LatestPost;
