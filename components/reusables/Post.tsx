import Image from "next/image";
import Link from "next/link";
import React from "react";
// import { Button } from "../ui/button"; // Unused in this snippet

interface PostProps {
  image?: string | null; // Updated to allow null/undefined
  category: string;
  date: string;
  title: string;
  href?: string | null; // Updated to allow null/undefined
}

const Post = ({ image, category, date, title, href }: PostProps) => {
  return (
    <div className="space-y-4">
      {/* FIX 1: Only render Image if a valid source string exists */}
      {image && (
        // <Image
        //   src={image}
        //   width={334.99}
        //   height={489.01}
        //   alt={title}
        //   className="w-[382px] md:w-[334.99px]"
        // />
        <img
          src={image}
          alt={title}
          className="w-[382px] h-[489.01] md:w-[334.99px] obejct-cover"
        />
      )}

      <div>
        {category} / <span>{date}</span>
      </div>

      <div className="text-[20px] gotham-medium leading-[120%]">{title}</div>

      <div>
        {/* FIX 2: Only render Link if href is defined */}
        {href ? (
          <Link
            href={href}
            className="flex justify-start items-center text-[#A90C50] text-[18px]"
          >
            Read more{" "}
            <Image
              src={`/red-arrow-right.svg`}
              width={20}
              height={20}
              alt="arrow"
            />
          </Link>
        ) : (
          /* Optional: Render a disabled state if no link exists */
          <span className="flex justify-start items-center text-gray-400 text-[18px] cursor-not-allowed">
            Read more{" "}
            <Image
              src={`/red-arrow-right.svg`} // Ensure this icon exists or use a gray one
              width={20}
              height={20}
              alt="arrow"
              className="opacity-50"
            />
          </span>
        )}
      </div>
    </div>
  );
};

export default Post;
