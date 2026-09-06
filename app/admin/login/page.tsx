"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowLeft, Lock, Shield, User } from "lucide-react";

export default function AdminLoginPage() {
  const router = useRouter();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [notice, setNotice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [sendingReset, setSendingReset] = useState(false);

  async function handleForgot() {
    setError(null);
    setNotice(null);
    setSendingReset(true);
    try {
      const res = await fetch("/api/admin/forgot-password", { method: "POST" });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Could not send the reset email.");
        return;
      }
      setNotice(data?.message ?? "Reset link sent. Please check the school email.");
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSendingReset(false);
    }
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setNotice(null);
    setLoading(true);

    try {
      const res = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => null);
        setError(data?.error ?? "Something went wrong. Please try again.");
        return;
      }

      router.replace("/admin");
      router.refresh();
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f172a] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-[center_35%] opacity-25"
        style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
      />
      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0f172a] p-8 shadow-md">
        <Link
          href="/"
          className="mb-8 flex items-center gap-2 text-sm font-medium text-white/60 transition hover:text-white"
        >
          <ArrowLeft size={16} />
          Back to Main Site
        </Link>

        <div className="mb-8 text-center">
          <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/15 text-[#d97706]">
            <Shield size={26} />
          </div>
          <h1 className="hero-title text-2xl text-white">KES Admin</h1>
          <p className="mt-1 text-sm text-white/50">Sign in to manage the photo gallery.</p>
        </div>

        <form className="space-y-5" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="mb-1.5 block text-sm font-medium text-white/70">
              Username
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/30">
                <User size={18} />
              </div>
              <input
                id="username"
                type="text"
                required
                autoComplete="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
              />
            </div>
          </div>

          <div>
            <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/70">
              Password
            </label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 text-white/30">
                <Lock size={18} />
              </div>
              <input
                id="password"
                type="password"
                required
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-lg border border-white/15 bg-white/5 py-2.5 pl-10 pr-3 text-sm text-white outline-none transition focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
              />
            </div>
          </div>

          {error && (
            <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
              {error}
            </p>
          )}

          {notice && (
            <p className="rounded-lg border border-green-400/30 bg-green-400/10 px-4 py-3 text-sm text-green-300">
              {notice}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-lg bg-[#d97706] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b45309] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div className="mt-6 border-t border-white/10 pt-5 text-center">
          <button
            onClick={handleForgot}
            disabled={sendingReset}
            className="text-sm font-semibold text-[#d97706] transition hover:text-orange-300 disabled:opacity-60"
          >
            {sendingReset ? "Sending..." : "Forgot your password?"}
          </button>
          <p className="mt-2 text-xs leading-5 text-white/40">
            We will email a reset link to the school email address.
          </p>
        </div>
      </div>
    </div>
  );
}
