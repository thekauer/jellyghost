import { NavbarComponent } from "./navbar";
import { getUser } from "@/lib/user";

export async function Header() {
  const user = await getUser();

  return <NavbarComponent user={user} />;
}
