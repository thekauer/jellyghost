import { relations } from "drizzle-orm";
import { posts, usersSyncInNeonAuth } from "./schema";

export const postsRelations = relations(posts, ({ one }) => ({
  user: one(usersSyncInNeonAuth, {
    fields: [posts.userId],
    references: [usersSyncInNeonAuth.id],
  }),
}));

export const usersRelations = relations(usersSyncInNeonAuth, ({ many }) => ({
  posts: many(posts),
}));
