import { maybeGetUser } from "@/lib/user";
import { NavbarComponent } from "./navbar";

export async function Header() {
  const user = await maybeGetUser();

  return <NavbarComponent user={user} />;
}
