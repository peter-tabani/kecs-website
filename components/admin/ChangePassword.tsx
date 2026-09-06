"use client";

import { useState } from "react";

export default function ChangePassword({ usingSetupPassword }: { usingSetupPassword: boolean }) {
  const [open, setOpen] = useState(false);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [saving, setSaving] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setDone(false);

    if (newPassword !== confirm) {
      setError("The two new passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const res = await fetch("/api/admin/change-password", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => null);
      if (!res.ok) {
        setError(data?.error ?? "Could not change the password.");
        return;
      }
      setDone(true);
      setCurrentPassword("");
      setNewPassword("");
      setConfirm("");
    } catch {
      setError("Could not reach the server. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  const inputClass =
    "block w-full rounded-lg border border-slate-300 bg-white px-3 py-2.5 text-sm text-slate-900 outline-none focus:border-[#d97706] focus:ring-1 focus:ring-[#d97706]";

  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-slate-800">Password</p>
          <p className="mt-0.5 text-sm text-slate-500">
            {usingSetupPassword
              ? "You are still using the password the website was set up with. Please change it."
              : "Change the password you use to sign in here."}
          </p>
        </div>
        <button
          onClick={() => setOpen((v) => !v)}
          className="rounded-full border border-slate-300 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-[#d97706] hover:text-[#d97706]"
        >
          {open ? "Cancel" : "Change password"}
        </button>
      </div>

      {usingSetupPassword && !open && (
        <p className="mt-3 rounded-lg border border-amber-300 bg-amber-50 px-4 py-3 text-sm text-amber-800">
          Anyone who knows the setup password can upload photos to your website.
          Change it to something only you know.
        </p>
      )}

      {open && (
        <form className="mt-5 max-w-sm space-y-4" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="currentPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
              Current password
            </label>
            <input
              id="currentPassword"
              type="password"
              required
              autoComplete="current-password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className={inputClass}
            />
          </div>

          <div>
            <label htmlFor="newPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
              New password
            </label>
            <input
              id="newPassword"
              type="password"
              required
              autoComplete="new-password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className={inputClass}
            />
            <p className="mt-1 text-xs text-slate-400">
              At least 10 characters, with a number in it.
            </p>
          </div>

          <div>
            <label htmlFor="confirmPassword" className="mb-1.5 block text-sm font-medium text-slate-700">
              Type the new password again
            </label>
            <input
              id="confirmPassword"
              type="password"
              required
              autoComplete="new-password"
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className={inputClass}
            />
          </div>

          {error && (
            <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">
              {error}
            </p>
          )}

          <button
            type="submit"
            disabled={saving}
            className="w-full rounded-full bg-[#d97706] py-3 text-sm font-semibold text-white transition hover:bg-[#b45309] disabled:opacity-60"
          >
            {saving ? "Saving..." : "Save new password"}
          </button>
        </form>
      )}

      {done && (
        <p className="mt-4 rounded-lg border border-green-200 bg-green-50 px-4 py-3 text-sm text-green-700">
          Password changed. Use the new one next time you sign in.
        </p>
      )}
    </div>
  );
}
