"use client";

import { createBrowserSupabase } from "@/lib/supabaseBrowser";
import { useRouter } from "next/navigation";

export function LogoutButton() {
  const supabase = createBrowserSupabase();
  const router = useRouter();

  async function handleLogout() {
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="text-red-400 hover:text-red-300 text-sm"
    >
      Logout
    </button>
  );
}
