"use client";
import {
  Session,
  createClientComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const AuthButtonClient = ({ session }: { session: Session | null }) => {
  const ruoter = useRouter();
  const supabase = createClientComponentClient<Database>();

  const handleSingIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };

  const handleSingOut = async () => {
    await supabase.auth.signOut();
    ruoter.refresh();
  };

  return (
    <>
      {session ? (
        <button onClick={handleSingOut}>サインアウト</button>
      ) : (
        <button onClick={handleSingIn}>サインイン</button>
      )}
    </>
  );
};

export default AuthButtonClient;
