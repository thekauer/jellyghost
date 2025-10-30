"use client";
import { Post as PostType } from "@/db/post.repository";
import { Button, Card, CardFooter, CardHeader, Image } from "@heroui/react";

interface PostProps {
  post: PostType;
}

function getImageLink(id: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL!}/api/posts/${id}`;
}

export function Post({ post }: PostProps) {
  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-4 transform transition-transform duration-200 hover:scale-105"
      key={post.id}
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        {/* <p className="text-tiny text-white/60 uppercase font-bold">New</p> */}
        {/* <h4 className="text-black font-medium text-2xl">Acme camera</h4> */}
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={getImageLink(post.id)}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">{post.text}</p>
        </div>
        <Button className="text-tiny" color="primary" radius="full" size="sm">
          Buy me
        </Button>
      </CardFooter>
    </Card>
  );
}
