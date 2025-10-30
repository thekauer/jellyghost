import { desc, eq } from "drizzle-orm";
import { db } from "./db";
import { posts } from "./schema";

export type Post = Awaited<ReturnType<typeof listPosts>>[number];
export async function listPosts() {
  return await db
    .select({
      id: posts.id,
      text: posts.text,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .orderBy(desc(posts.createdAt))
    .limit(10);
}

export async function getPost(id: string) {
  const post = await db
    .select({
      id: posts.id,
      text: posts.text,
      createdAt: posts.createdAt,
    })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);
  return post[0] || null;
}
