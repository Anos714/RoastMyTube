import { headers } from "next/headers";
import { auth } from "./auth";
import { AuthError } from "./errors";

export async function requireUser() {
  const session = await auth.api.getSession({ headers: await headers() });
  if (!session?.user) throw new AuthError();
  return session.user;
}
