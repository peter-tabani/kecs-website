"use client";

import { Suspense, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import { KeyRound } from "lucide-react";

function ResetForm() {
  const router = useRouter();
  const token = useSearchParams().get("token") ?? "";

  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (password !== confirm) {
      setError("The two passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/reset-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Could not set the new password.");
        return;
      }
      setDone(true);
      setTimeout(() => router.replace("/admin/login"), 2500);
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  if (!token) {
    return (
      <div className="text-center">
        <p className="mb-4 text-white/70">
          This page needs a reset link. Please use the link from the email we sent you.
        </p>
        <Link href="/admin/login" className="text-sm font-semibold text-[#d97706] hover:text-orange-300">
          Back to sign in
        </Link>
      </div>
    );
  }

  if (done) {
    return (
      <div className="text-center">
        <h1 className="hero-title mb-2 text-2xl text-white">Password changed</h1>
        <p className="text-sm text-white/60">
          You can now sign in with your new password. Taking you there...
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-[#d97706]/15 text-[#d97706]">
          <KeyRound size={26} />
        </div>
        <h1 className="hero-title text-2xl text-white">Choose a new password</h1>
        <p className="mt-1 text-sm text-white/50">
          At least 10 characters, with a number in it.
        </p>
      </div>

      <form className="space-y-5" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-white/70">
            New password
          </label>
          <input
            id="password"
            type="password"
            required
            autoComplete="new-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="block w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
          />
        </div>

        <div>
          <label htmlFor="confirm" className="mb-1.5 block text-sm font-medium text-white/70">
            Type it again
          </label>
          <input
            id="confirm"
            type="password"
            required
            autoComplete="new-password"
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className="block w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-sm text-white outline-none transition focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]"
          />
        </div>

        {error && (
          <p className="rounded-lg border border-red-400/30 bg-red-400/10 px-4 py-3 text-sm text-red-300">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="w-full rounded-lg bg-[#d97706] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#b45309] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save new password"}
        </button>
      </form>
    </>
  );
}

export default function AdminResetPage() {
  return (
    <div className="relative flex min-h-screen items-center justify-center overflow-hidden bg-[#0f172a] px-4 py-12">
      <div
        className="pointer-events-none absolute inset-0 bg-cover bg-[center_35%] opacity-25"
        style={{ backgroundImage: "url('/images/hero/kecs-gate.webp')" }}
      />
      <div className="relative w-full max-w-md rounded-xl border border-white/10 bg-[#0f172a] p-8 shadow-md">
        <Suspense fallback={<p className="text-center text-sm text-white/50">Loading...</p>}>
          <ResetForm />
        </Suspense>
      </div>
    </div>
  );
}
