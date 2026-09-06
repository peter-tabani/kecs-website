import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { ADMIN_SESSION_COOKIE, verifySessionToken } from "@/lib/admin-session";
import LogoutButton from "@/components/admin/LogoutButton";

export default async function AdminProtectedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieStore = await cookies();
  const token = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;

  if (!verifySessionToken(token)) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-slate-50">
      <nav className="sticky top-0 z-30 flex items-center justify-between border-b border-white/10 bg-[#0f172a] px-4 py-4 lg:px-6">
        <Link href="/" className="flex items-center gap-2.5 text-white">
          <div className="flex h-9 w-9 items-center justify-center rounded-full border-2 border-[#d97706] text-sm font-bold text-[#d97706]">
            K
          </div>
          <div>
            <p className="text-sm font-bold leading-none">KES Admin</p>
            <p className="mt-0.5 text-[11px] leading-none text-white/50">Gallery Dashboard</p>
          </div>
        </Link>
        <LogoutButton />
      </nav>
      <div className="mx-auto max-w-[1200px] px-4 py-8 lg:px-6">{children}</div>
    </div>
  );
}
