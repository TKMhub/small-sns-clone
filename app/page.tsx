import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import AuthButtonServer from "./components/AuthButtonServer";
import { redirect } from "next/navigation";
import { Database } from "./lib/database.types";

export default async function Home() {
  const supabase = createServerComponentClient<Database>({ cookies });
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect("/login");
  }

  const { data: posts } = await supabase.from("Posts").select();

  return (
    <>
      <AuthButtonServer />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}
