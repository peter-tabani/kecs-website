import { NextRequest, NextResponse } from "next/server";
import { verifyResetToken } from "@/lib/admin-session";
import { writeStoredCredentials } from "@/lib/admin-config";
import { hashPassword, validatePasswordStrength } from "@/lib/password";
import { adminEmailAddress, isMailConfigured, sendMail } from "@/lib/mailer";

export async function POST(request: NextRequest) {
  const body = await request.json().catch(() => null);
  const token = typeof body?.token === "string" ? body.token : "";
  const password = typeof body?.password === "string" ? body.password : "";

  if (!(await verifyResetToken(token))) {
    return NextResponse.json(
      { error: "This reset link has expired or has already been used. Please request a new one." },
      { status: 400 }
    );
  }

  const weak = validatePasswordStrength(password);
  if (weak) return NextResponse.json({ error: weak }, { status: 400 });

  const { hash, salt } = hashPassword(password);
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

  // Tell the school the password changed, so an unexpected change is noticed.
  if (isMailConfigured()) {
    await sendMail({
      to: adminEmailAddress(),
      subject: "Your KES website password was changed",
      text: `The password for the KES website photo uploader was changed on ${new Date().toLocaleString("en-GB")}.\n\nIf this was not you, contact the person who manages the website straight away.`,
    });
  }

  return NextResponse.json({ ok: true });
}
