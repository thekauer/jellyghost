import { getPost } from "@/db/post.repository";
import { PostModal } from "./post-modal";

export default async function PhotoModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getPost(id);

  return <PostModal post={post} />;
}
