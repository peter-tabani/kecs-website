import type { ReactNode } from "react";

export default function SectionBanner({
  image,
  eyebrow,
  title,
  subtitle,
  height = "h-[190px] md:h-[280px]",
  children,
}: {
  image: string;
  eyebrow?: string;
  title: ReactNode;
  subtitle?: string;
  height?: string;
  children?: ReactNode;
}) {
  return (
    <div className={`relative flex ${height} w-full items-center overflow-hidden`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url('${image}')` }}
      />
      <div className="absolute inset-0 bg-gradient-to-r from-[#0f172a]/95 via-[#0f172a]/80 to-[#0f172a]/40" />

      <div className="relative mx-auto w-full max-w-[1400px] px-4 lg:px-6">
        {eyebrow && (
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
            {eyebrow}
          </p>
        )}
        <h1 className="hero-title text-3xl leading-tight text-white md:text-5xl">{title}</h1>
        {subtitle && <p className="mt-4 max-w-xl text-base leading-8 text-white/75">{subtitle}</p>}
        {children}
      </div>
    </div>
  );
}
