"use client";

import { useState } from "react";
import { createBrowserSupabase } from "@/lib/supabaseBrowser";

export default function LoginPage() {
  const supabase = createBrowserSupabase();
  const [email, setEmail] = useState("");

  async function handleLogin() {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: "http://localhost:3000/",
      },
    });

    if (error) {
      alert(error.message);
    } else {
      alert("A magic login link has been sent to your email.");
    }
  }

  return (
    <div className="p-10 max-w-md mx-auto space-y-4">
      <h1 className="text-3xl font-bold">Login</h1>
      <p className="text-slate-300">
        Enter your email to receive a login link.
      </p>

      <input
        className="w-full p-3 bg-slate-900 border border-slate-700 rounded text-white placeholder-slate-500"
        type="email"
        placeholder="you@example.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />

      <button
        onClick={handleLogin}
        className="px-4 py-2 bg-blue-600 rounded hover:bg-blue-700"
      >
        Send Magic Link
      </button>
    </div>
  );
}
