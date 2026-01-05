import React from "react";
import Post from "../reusables/Post";
import { client } from "@/sanity/lib/client";

// Define the GROQ query with all needed fields
const POSTS_QUERY = `*[
  _type == "post" 
  && defined(slug.current) 
  && "lifestyle" in categories[]->slug.current
]|order(_createdAt desc)[0...4]{
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

const LifestylePost = async () => {
  const posts = await client.fetch<PostType[]>(POSTS_QUERY);

  // Filter out posts with missing required data
  const validPosts = posts.filter(
    (post) => post.slug?.current && post.title && post.mainImage?.asset?.url
  );

  return (
    <div className="bg-[#F9F9F9] px-4 md:px-0">
      <section className="max-w-7xl mx-auto py-14">
        <div className="text-[24px] md:text-center mb-6">LIFESTYLE</div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {validPosts.map((post) => (
            <Post
              key={post._id}
              image={post.mainImage!.asset!.url!}
              category={post.category || "Lifestyle"}
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
            No lifestyle posts available yet.
          </div>
        )}
      </section>
    </div>
  );
};

export default LifestylePost;
