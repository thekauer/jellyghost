import { NextResponse } from "next/server";
import { db } from "@/db/db"; // your Drizzle ORM instance
import { posts } from "@/db/schema";
import { eq } from "drizzle-orm";

export const dynamic = "force-static";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ id: string }> },
) {
  const { id } = await params;

  const post = await db
    .select({ originalImage: posts.originalImage })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  if (!post[0]) {
    return NextResponse.json({ error: "Post not found" }, { status: 404 });
  }
  const buffer = post[0].originalImage as Buffer;

  return new Response(buffer, {
    status: 200,
    headers: {
      "Content-Type": "image/webp", // fixed since you know it's WebP
      "Cache-Control": "public, max-age=31536000, immutable", // optional caching
      "Content-Disposition": `inline; filename="${id}.webp"`, // inline or attachment
    },
  });
}
