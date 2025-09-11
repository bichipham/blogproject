// app/search/page.tsx
import PostCard from "@/components/PostCard";
import { PostCardProps } from "@/type/PostCard.types";
import Image from "next/image";
import React from "react";

export default async function SearchPage({
  searchParams,
}: {
  searchParams: { query?: string };
}) {
  const query = searchParams.query ?? "";

  // Fetch data theo query (có thể gọi API ngoài)
  const data = query
    ? await fetch(`https://dummyjson.com/posts/search?q=${query}`).then((res) =>
        res.json()
      )
    : [];

  const { posts, total } = data || { posts: [], total: 0 };
  console.log("searchdata", data);
  return total === 0 ? (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <Image
        src="https://group.beincom.com/_next/static/media/not_suggest_community.99771c28.png"
        alt="No Results"
        width={200}
        height={200}
      />
      <h1>No results found for: {query}</h1>
    </div>
  ) : (
    <div className="max-w-3xl mx-auto space-y-6">
      <h1 className="text-xl p-2 mb-2">{total} result</h1>
      <div>
        {posts?.map((item: PostCardProps) => (
          <PostCard key={item.id} {...item} />
        ))}
      </div>
    </div>
  );
}
