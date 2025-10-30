import { stackServerApp } from "@/stack/server";
import { CurrentServerUser } from "@stackframe/stack";

export type User = {
  email: string;
  name: string;
  profile: string;
};

function convertUser(user: CurrentServerUser) {
  return {
    email: user.primaryEmail,
    profile: user.profileImageUrl,
    name: user.displayName,
  } as User;
}

export async function getUser() {
  return convertUser(await stackServerApp.getUser({ or: "redirect" }));
}

export async function maybeGetUser() {
  const user = await stackServerApp.getUser();
  if (!user) return null;
  return convertUser(user);
}
