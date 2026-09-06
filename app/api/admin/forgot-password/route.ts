import { NextRequest, NextResponse } from "next/server";
import { createResetToken } from "@/lib/admin-session";
import { adminEmailAddress, isMailConfigured, maskEmail, sendMail } from "@/lib/mailer";
import { checkRateLimit, recordFailure } from "@/lib/rate-limit";

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return `forgot:${forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown"}`;
}

function siteUrl(request: NextRequest): string {
  if (process.env.NEXT_PUBLIC_SITE_URL) return process.env.NEXT_PUBLIC_SITE_URL.replace(/\/$/, "");
  const host = request.headers.get("host");
  const proto = request.headers.get("x-forwarded-proto") ?? "https";
  return host ? `${proto}://${host}` : "";
}

export async function POST(request: NextRequest) {
  const key = clientKey(request);
  const { allowed, retryAfterSeconds } = checkRateLimit(key);
  if (!allowed) {
    const minutes = Math.ceil(retryAfterSeconds / 60);
    return NextResponse.json(
      { error: `Too many requests. Please wait ${minutes} minute${minutes === 1 ? "" : "s"}.` },
      { status: 429 }
    );
  }
  recordFailure(key);

  if (!isMailConfigured()) {
    return NextResponse.json(
      {
        error:
          "Password reset by email is not set up yet. Please contact the person who manages the website.",
      },
      { status: 503 }
    );
  }

  const to = adminEmailAddress();
  const token = await createResetToken();
  const link = `${siteUrl(request)}/admin/reset?token=${encodeURIComponent(token)}`;

  const sent = await sendMail({
    to,
    subject: "Reset your KES website password",
    text: [
      "Someone asked to reset the password for the KES website photo uploader.",
      "",
      "Open this link to choose a new password. It expires in 30 minutes:",
      link,
      "",
      "If this was not you, you can ignore this email. Your password has not changed.",
    ].join("\n"),
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 520px; color: #0f172a;">
        <h2 style="color: #d97706; margin-bottom: 4px;">KES Website</h2>
        <p>Someone asked to reset the password for the photo uploader.</p>
        <p>Click the button below to choose a new password. This link expires in 30 minutes.</p>
        <p style="margin: 24px 0;">
          <a href="${link}" style="background:#d97706;color:#ffffff;padding:12px 22px;border-radius:6px;text-decoration:none;font-weight:bold;">Choose a new password</a>
        </p>
        <p style="font-size:13px;color:#64748b;">If the button does not work, copy this address into your browser:<br>${link}</p>
        <p style="font-size:13px;color:#64748b;">If this was not you, ignore this email. Your password has not changed.</p>
      </div>
    `,
  });

  if (!sent) {
    return NextResponse.json(
      { error: "We could not send the email just now. Please try again shortly." },
      { status: 502 }
    );
  }

  return NextResponse.json({
    ok: true,
    message: `We have sent a reset link to ${maskEmail(to)}. It expires in 30 minutes.`,
  });
}
