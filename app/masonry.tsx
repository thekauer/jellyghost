"use client";
import { Thumb } from "@/components/thumb";
import { Post } from "@/db/post.repository";
import { useState } from "react";

interface MasonryProps {
  initialPosts: Post[];
}

export function Masonry({ initialPosts }: MasonryProps) {
  const [posts, setPosts] = useState(initialPosts);

  return (
    <div className="w-full gap-4 grid grid-cols-16 xs:grid-cols-4 sm:grid-cols-8 md:grid-cols-12 lg:grid-cols-16 grid-rows-2 px-8 self-start">
      {posts.map((post) => (
        <Thumb key={post.id} thumb={post} />
      ))}
    </div>
  );
}
