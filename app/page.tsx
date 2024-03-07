import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { cookies } from "next/headers";
import AuthButton from "./components/AuthButtonClient";
import AuthButtonServer from "./components/AuthButtonServer";

export default async function Home() {
  console.log(cookies());
  const supabase = createServerComponentClient({ cookies });
  const { data: posts } = await supabase.from("Posts").select();
  console.log("posts", posts);

  return (
    <>
      <AuthButtonServer />
      <pre>{JSON.stringify(posts, null, 2)}</pre>
    </>
  );
}
