import { Post } from "@/components/post";
import { getPost } from "@/db/post.repository";

export default async function PhotoPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return <Post post={post} />;
}
