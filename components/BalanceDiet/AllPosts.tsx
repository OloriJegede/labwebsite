import React from "react";
import Post from "../reusables/Post";
import { Button } from "../ui/button";
import { client } from "@/sanity/lib/client";

// Define the GROQ query to fetch all balance diet posts
const POSTS_QUERY = `*[
  _type == "post" 
  && defined(slug.current)
  && "balance-diet" in categories[]->slug.current
]|order(publishedAt desc){
  _id, 
  title, 
  slug,
  "category": categories[0]->title,
  publishedAt,
  mainImage {
    asset -> {
      url
    }
  }
}`;

interface PostType {
  _id: string;
  title: string;
  slug: { current: string };
  category?: string;
  publishedAt?: string;
  mainImage?: { asset?: { url?: string } };
}

const Posts = async () => {
  const posts = await client.fetch<PostType[]>(POSTS_QUERY);

  // Filter posts with missing required data
  const validPosts = posts.filter(
    (post) => post.slug?.current && post.title && post.mainImage?.asset?.url
  );

  return (
    <div className="pt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-x-4 gap-y-10">
        {validPosts.map((post) => (
          <Post
            key={post._id}
            image={post.mainImage!.asset!.url!}
            category={post.category || "Balance Diet"}
            date={
              post.publishedAt
                ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
                : new Date().toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                  })
            }
            title={post.title}
            href={`/blog/${post.slug?.current || ""}`}
          />
        ))}
      </div>
      {validPosts.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No balance diet posts available yet.
        </div>
      )}
      {validPosts.length > 0 && (
        <div className="flex justify-center py-14">
          <Button className="bg-[#A90C50] text-white px-20">
            Load older posts
          </Button>
        </div>
      )}
    </div>
  );
};

export default Posts;
