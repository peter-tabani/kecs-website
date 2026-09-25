import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "School Leadership",
  description:
    "Meet the director and school leaders of Kenya Excellent Centre and School in Likoni, Mombasa.",
  alternates: { canonical: "/leadership" },
};

export default function LeadershipLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return children;
}
