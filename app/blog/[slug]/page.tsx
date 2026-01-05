import React from "react";
import Link from "next/link";
import Image from "next/image";
import Subscribe from "@/components/Forms/Subscribe";
import { client } from "@/sanity/lib/client";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";

// GROQ query to fetch single post
const POST_QUERY = `*[_type == "post" && slug.current == $slug][0]{
  _id,
  title,
  slug,
  publishedAt,
  "author": author->name,
  "categories": categories[]->title,
  mainImage {
    asset -> {
      url
    },
    alt
  },
  body
}`;

// Query for categories sidebar
const CATEGORIES_QUERY = `*[_type == "category"]{
  _id,
  title,
  slug
}`;

interface PageProps {
  params: Promise<{
    slug: string;
  }>;
}

interface Category {
  _id: string;
  title: string;
  slug: {
    current: string;
  };
}

// Generate static params for static generation
export async function generateStaticParams() {
  const posts = await client.fetch(`*[_type == "post" && defined(slug.current)]{
    "slug": slug.current
  }`);

  return posts.map((post: { slug: string }) => ({
    slug: post.slug,
  }));
}

const BlogPost = async ({ params }: PageProps) => {
  // Await params to get the actual slug value
  const { slug } = await params;

  const post = await client.fetch(POST_QUERY, { slug });
  const categories = await client.fetch(CATEGORIES_QUERY);

  if (!post) {
    notFound();
  }

  // Format date
  const formattedDate = post.publishedAt
    ? new Date(post.publishedAt).toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
        year: "numeric",
      }) +
      " · " +
      new Date(post.publishedAt).toLocaleTimeString("en-GB", {
        hour: "2-digit",
        minute: "2-digit",
      })
    : "";

  return (
    <div className="max-w-7xl mx-auto px-4 md:px-0 py-10">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-20">
        {/* Sidebar */}
        <div className="md:col-span-1">
          <div className="text-[#B3B3B3] text-[24px] gotham-light">
            CATEGORIES
          </div>
          <div>
            {categories.map((category: Category) => (
              <Link key={category._id} href={`/${category.slug.current}`}>
                <div className="flex justify-between items-center border-b-[0.5px] border-[#CCCCCC] py-4">
                  <div className="text-[#999999] text-[18px]">
                    {category.title}
                  </div>
                  <Image
                    src="/chevron-right.svg"
                    width={24}
                    height={24}
                    alt="arrow"
                  />
                </div>
              </Link>
            ))}
          </div>
          <div className="pt-10 hidden md:block">
            <Subscribe />
          </div>
        </div>

        {/* Main Content */}
        <div className="md:col-span-2">
          {/* Category Badge */}
          {post.categories && post.categories.length > 0 && (
            <span className="bg-[#ECC5C0] gotham-light text-[18px] rounded-full px-4 py-2 inline-block">
              {post.categories[0]}
            </span>
          )}

          {/* Title */}
          <h1 className="imbue-semibold text-[40px] md:text-[48px] leading-[120%] pt-6">
            {post.title}
          </h1>

          {/* Meta Info */}
          <section className="space-y-2 pt-6">
            {post.author && (
              <div className="text-[#666666] text-[16px]">
                Posted by {post.author}
              </div>
            )}
            {formattedDate && (
              <div className="text-[#666666] text-[16px]">{formattedDate}</div>
            )}
          </section>

          {/* Main Image */}
          {post.mainImage?.asset?.url && (
            <div className="pt-5">
              <img
                src={post.mainImage.asset.url}
                alt={post.mainImage.alt || post.title}
                className="w-full h-auto"
              />
            </div>
          )}

          {/* Body Content */}
          <div className="pt-8 space-y-6 text-[#333333] leading-relaxed prose prose-lg max-w-none">
            <PortableText
              value={post.body}
              components={{
                block: {
                  normal: ({ children }) => (
                    <p className="text-[18px] mb-4">{children}</p>
                  ),
                  h3: ({ children }) => (
                    <h3 className="text-[18px] gotham-semibold mb-3 pt-4">
                      {children}
                    </h3>
                  ),
                },
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
