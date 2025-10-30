import { stackServerApp } from "@/stack/server";
import { NextRequest, NextResponse } from "next/server";
import * as z from "zod/mini";
import sharp from "sharp";
import { db } from "@/db/db";
import { posts } from "@/db/schema";
import { Responses } from "@/lib/responses";

const postSchema = z.object({
  images: z.array(z.string()),
  text: z.string(),
});

type NewPost = typeof posts.$inferInsert;

export async function POST(request: NextRequest) {
  const user = await stackServerApp.getUser();
  if (!user) return Responses.unauthorized();
  if (user.primaryEmail !== "thekauer@gmail.com") return Responses.forbidden();
  const body = await request.json();
  const result = postSchema.safeParse(body);
  if (!result.success) {
    return Responses.badRequest("Invalid Request Body");
  }
  const img = await processImage(result.data.images[0]);

  const newPost: NewPost = {
    text: result.data.text,
    originalImage: img,
    userId: user.id,
  };

  try {
    await db.insert(posts).values(newPost);
    return Responses.created({ message: "Resource created successfuly" });
  } catch (err) {
    console.error(err);
    return Responses.internalError();
  }

  // return new Response(img, {
  //   headers: {
  //     "Content-Type": "image/png",
  //     "Content-Disposition": `attachment; filename="resized.png"`,
  //   },
  // });
}

async function processImage(base64String: string) {
  const cleanBase64 = base64String.replace(/^data:image\/\w+;base64,/, "");
  const imgBuffer = Buffer.from(cleanBase64, "base64");
  return await sharp(imgBuffer).webp().toBuffer();
}
