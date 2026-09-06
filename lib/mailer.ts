import nodemailer from "nodemailer";

/**
 * Sends mail through the school's own Gmail account using an App Password.
 * Free, no third-party service, 500 messages a day which is far more than
 * this site will ever need.
 */

export function isMailConfigured(): boolean {
  return Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);
}

/** Where admin password-reset links are sent. Defaults to the sending account. */
export function adminEmailAddress(): string {
  return process.env.ADMIN_EMAIL || process.env.GMAIL_USER || "";
}

export async function sendMail(options: {
  to: string;
  subject: string;
  text: string;
  html?: string;
}): Promise<boolean> {
  if (!isMailConfigured()) {
    console.error("Email is not configured: set GMAIL_USER and GMAIL_APP_PASSWORD");
    return false;
  }

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_APP_PASSWORD,
      },
    });

    await transporter.sendMail({
      from: `"KES Website" <${process.env.GMAIL_USER}>`,
      ...options,
    });
    return true;
  } catch (err) {
    console.error("Failed to send email", err);
    return false;
  }
}

/** Masks an address for display: excellentkenya@gmail.com -> exc***@gmail.com */
export function maskEmail(email: string): string {
  const [name, domain] = email.split("@");
  if (!name || !domain) return "your school email address";
  const visible = name.slice(0, Math.min(3, name.length));
  return `${visible}${"*".repeat(3)}@${domain}`;
}
