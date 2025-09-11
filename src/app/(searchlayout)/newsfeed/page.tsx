"use client";

import { useEffect, useMemo, useState } from "react";
import PostCard from "../../../components/PostCard";
import { PostCardProps } from "@/type/PostCard.types";
import { useAppDispatch, useAppSelector } from "@/reduxStore/store";
import { fetchPosts } from "@/reduxStore/postSlice";
import RightPanel from "@/components/RightPanel";
import {
  WindowScroller,
  List,
  AutoSizer,
  InfiniteLoader,
} from "react-virtualized";
import LeftPannel from "@/components/LeftPannel";

export default function NewsFeedPage() {
  const dispatch = useAppDispatch();
  const postsPayload =
    useAppSelector((state) => state?.post?.postsPayload) || [];
  console.log("feedposts", postsPayload);
  const { posts: feedposts } = postsPayload || { posts: [] };

  useEffect(() => {
    if (feedposts.length === 0) {
      dispatch(fetchPosts());
    }
  }, []);

  const Row = ({ index, style }) => {
    const post = feedposts[index];
    if (!post) return <div style={style}>Loading...</div>;
    return <PostCard key={post.id} {...post} style={style} />;
  };

  return (
    <div className="pt-10 container mx-auto grid grid-cols-12 gap-4 px-4">
      <LeftPannel />
      {/* Center column (wider feed) */}
      <main className="bg-white rounded-xl shadow p-4 md:col-span-2 lg:col-span-6">
        <h2 className="font-semibold mb-2">Newsfeed</h2>
        <div className="space-y-4">
          {feedposts?.map((post) => (
            <PostCard key={post.id} {...post} />
          ))}
        </div>
      </main>
      <RightPanel />
    </div>
  );
}
