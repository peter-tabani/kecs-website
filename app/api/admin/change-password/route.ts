import { NextRequest, NextResponse } from "next/server";
import { ADMIN_SESSION_COOKIE, verifyCredentials, verifySessionToken } from "@/lib/admin-session";
import { writeStoredCredentials } from "@/lib/admin-config";
import { hashPassword, validatePasswordStrength } from "@/lib/password";
import { adminEmailAddress, isMailConfigured, sendMail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  if (!verifySessionToken(request.cookies.get(ADMIN_SESSION_COOKIE)?.value)) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const body = await request.json().catch(() => null);
  const currentPassword = typeof body?.currentPassword === "string" ? body.currentPassword : "";
  const newPassword = typeof body?.newPassword === "string" ? body.newPassword : "";

  const username = process.env.ADMIN_USERNAME ?? "";
  if (!(await verifyCredentials(username, currentPassword))) {
    return NextResponse.json({ error: "Your current password is not correct." }, { status: 400 });
  }

  const weak = validatePasswordStrength(newPassword);
  if (weak) return NextResponse.json({ error: weak }, { status: 400 });

  if (newPassword === currentPassword) {
    return NextResponse.json(
      { error: "Your new password must be different from the current one." },
      { status: 400 }
    );
  }

  const { hash, salt } = hashPassword(newPassword);
  const saved = await writeStoredCredentials(hash, salt);

  if (!saved) {
    return NextResponse.json(
      {
        error:
          "We could not save the new password. Photo storage may not be set up yet. Please contact the person who manages the website.",
      },
      { status: 503 }
    );
  }

  if (isMailConfigured()) {
    await sendMail({
      to: adminEmailAddress(),
      subject: "Your KES website password was changed",
      text: `The password for the KES website photo uploader was changed on ${new Date().toLocaleString("en-GB")}.\n\nIf this was not you, contact the person who manages the website straight away.`,
    });
  }

  return NextResponse.json({ ok: true });
}
