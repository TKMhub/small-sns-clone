"use client";
import { useOptimistic } from "react";
import Likes from "./Likes";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";

export default function Post({ posts }: { posts: PostWithAuthor[] }) {
  const [useOptimisticPosts, addOptimisticPost] = useOptimistic<
    PostWithAuthor[],
    PostWithAuthor
  >(posts, (currentOptimisticPosts, newPost) => {
    const newOptimisticPosts = [...currentOptimisticPosts];
    const index = newOptimisticPosts.findIndex(
      (post) => post.id === newPost.id
    );
    newOptimisticPosts[index] = newPost;
    return newOptimisticPosts;
  });

  const supabase = createClientComponentClient();
  const router = useRouter();

  useEffect(() => {
    supabase.channel("realtime posts").on(
      "postgres_changes",
      {
        event: "*",
        schema: "public",
        table: "posts",
      },
      (payload) => {
        router.refresh();
      }
    );
  }, [supabase, router]);

  return (
    <>
      {useOptimisticPosts?.map((post) => (
        <div key={post.id}>
          <p>
            {post.author?.name} {post.author?.username}
          </p>
          <p>{post.title}</p>
          <Likes post={post} addOptimisticPost={addOptimisticPost} />
        </div>
      ))}
    </>
  );
}
