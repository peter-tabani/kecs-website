"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";

export default function LogoutButton() {
  const router = useRouter();

  async function handleLogout() {
    await fetch("/api/admin/logout", { method: "POST" });
    router.replace("/admin/login");
    router.refresh();
  }

  return (
    <button
      onClick={handleLogout}
      className="flex items-center gap-1.5 rounded-full border border-white/15 px-3 py-2 text-xs font-semibold text-white/70 transition hover:bg-white/10 hover:text-white"
    >
      <LogOut size={13} /> Sign Out
    </button>
  );
}
