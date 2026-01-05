import React from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Post from "../reusables/Post";
import { client } from "@/sanity/lib/client";

// Define the GROQ query with all needed fields
const POSTS_QUERY = `*[
  _type == "post" 
  && defined(slug.current)
]|order(publishedAt desc)[0...4]{
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

const Artilcles = async () => {
  const posts = await client.fetch<PostType[]>(POSTS_QUERY);

  // Filter out posts with missing required data
  const validPosts = posts.filter(
    (post) => post.slug?.current && post.title && post.mainImage?.asset?.url
  );

  return (
    <div className="max-w-7xl mx-auto pb-14 px-4 md:px-0 ">
      <div className="flex justify-between items-center mb-6">
        <div className="imbue-medium text-[48px]">Other Articles</div>
      </div>
      <section className="block md:hidden space-y-6 ">
        {validPosts.map((post) => (
          <Post
            key={post._id}
            image={post.mainImage!.asset!.url!}
            category={post.category || "Article"}
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
      </section>
      <section className="hidden md:block">
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="w-[382px] md:w-[1283px] mx-auto"
        >
          <CarouselContent>
            {validPosts.map((post) => (
              <CarouselItem
                key={post._id}
                className="md:basis-1/2 lg:basis-1/4"
              >
                <Post
                  image={post.mainImage!.asset!.url!}
                  category={post.category || "Article"}
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
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="left-auto right-14 -top-20" />
          <CarouselNext className="right-0 -top-20" />
        </Carousel>
      </section>
      {validPosts.length === 0 && (
        <div className="text-center text-gray-500 py-8">
          No articles available yet.
        </div>
      )}
    </div>
  );
};

export default Artilcles;
