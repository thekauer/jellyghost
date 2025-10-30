import { maybeGetUser } from "@/lib/user";
import { Editor } from "./editor/editor";
import { listPosts } from "@/db/post.repository";
import { Masonry } from "./masonry";

export default async function Home() {
  const user = await maybeGetUser();
  const posts = await listPosts();

  return (
    <div className="flex min-h-screen items-start py-4 justify-center bg-zinc-50 font-sans dark:bg-black">
      <main className="min-w-4/5 flex flex-col justify-center items-center">
        {user && <Editor />}
        <Masonry initialPosts={posts} />
      </main>
    </div>
  );
}
