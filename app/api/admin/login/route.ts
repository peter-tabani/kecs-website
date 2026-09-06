import { NextRequest, NextResponse } from "next/server";
import {
  ADMIN_SESSION_COOKIE,
  SESSION_MAX_AGE_SECONDS,
  createSessionToken,
  verifyCredentials,
} from "@/lib/admin-session";
import { checkRateLimit, clearAttempts, recordFailure } from "@/lib/rate-limit";

function clientKey(request: NextRequest): string {
  const forwarded = request.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() || request.headers.get("x-real-ip") || "unknown";
}

export async function POST(request: NextRequest) {
  const key = clientKey(request);

  const { allowed, retryAfterSeconds } = checkRateLimit(key);
  if (!allowed) {
    const minutes = Math.ceil(retryAfterSeconds / 60);
    return NextResponse.json(
      { error: `Too many attempts. Please wait ${minutes} minute${minutes === 1 ? "" : "s"} and try again.` },
      { status: 429, headers: { "Retry-After": String(retryAfterSeconds) } }
    );
  }

  const body = await request.json().catch(() => null);
  const username = typeof body?.username === "string" ? body.username : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!(await verifyCredentials(username, password))) {
    recordFailure(key);
    return NextResponse.json({ error: "Invalid username or password." }, { status: 401 });
  }

  clearAttempts(key);

  const response = NextResponse.json({ ok: true });
  response.cookies.set(ADMIN_SESSION_COOKIE, createSessionToken(), {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
  return response;
}
