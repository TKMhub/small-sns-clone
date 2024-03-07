"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import React from "react";

const AuthButton = () => {
  const supabase = createClientComponentClient();
  const handleSingIn = async () => {
    await supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: "http://localhost:3000/auth/callback",
      },
    });
  };
  return <button onClick={handleSingIn}>サインイン</button>;
};

export default AuthButton;
