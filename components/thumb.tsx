import { Card, CardHeader, CardFooter, Image, Button } from "@heroui/react";
import { Post as PostType } from "@/db/post.repository";

import { useRouter } from "next/navigation";

// TODO: env var
function getImageLink(id: string) {
  return `http://localhost:3001/api/posts/${id}`;
}

function getPostLink(id: string) {
  return `http://localhost:3001/posts/${id}`;
}

interface ThumbProps {
  thumb: PostType;
}

export function Thumb({ thumb }: ThumbProps) {
  const router = useRouter();
  function handleCardPress(id: string) {
    router.push(getPostLink(id));
  }

  return (
    <Card
      isFooterBlurred
      className="w-full h-[300px] col-span-12 sm:col-span-4 transform transition-transform duration-200 hover:scale-105"
      key={thumb.id}
      isPressable
      onPress={() => handleCardPress(thumb.id)}
    >
      <CardHeader className="absolute z-10 top-1 flex-col items-start">
        {/* <p className="text-tiny text-white/60 uppercase font-bold">New</p> */}
        {/* <h4 className="text-black font-medium text-2xl">Acme camera</h4> */}
      </CardHeader>
      <Image
        removeWrapper
        alt="Card example background"
        className="z-0 w-full h-full scale-125 -translate-y-6 object-cover"
        src={getImageLink(thumb.id)}
      />
      <CardFooter className="absolute bg-white/30 bottom-0 border-t-1 border-zinc-100/50 z-10 justify-between">
        <div>
          <p className="text-black text-tiny">Available soon.</p>
          <p className="text-black text-tiny">{thumb.text}</p>
        </div>
        {/* <Button */}
        {/*   className="text-tiny" */}
        {/*   color="primary" */}
        {/*   radius="full" */}
        {/*   size="sm" */}
        {/* > */}
        {/*   Buy me */}
        {/* </Button> */}
      </CardFooter>
    </Card>
  );
}
