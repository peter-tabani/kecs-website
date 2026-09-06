import { ArrowRight } from "lucide-react";
import Link from "next/link";

const stats = [
  { value: "250+", label: "Sponsored\nChildren" },
  { value: "150+", label: "Fee-Paying\nLearners" },
  { value: "2013", label: "Year\nFounded" },
  { value: "Gr. 9", label: "Highest\nGrade" },
];

export default function Hero() {
  return (
    <section className="relative min-h-[78vh] overflow-hidden">
      <div
        className="absolute inset-0 bg-cover bg-[center_35%]"
        style={{
          backgroundImage: "url('/images/hero/kecs-gate.webp')",
        }}
      />
      <div className="absolute inset-0 bg-[#0f172a]/72" />

      <div className="relative mx-auto flex min-h-[78vh] max-w-[1400px] items-center px-4 py-12 lg:px-6">
        <div className="grid w-full gap-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center">
          <div className="max-w-3xl text-white">
            <p className="mb-4 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
              Welcome to KES
            </p>

            <h2 className="hero-title mb-6 text-5xl font-medium leading-[0.95] md:text-7xl">
              Kenya Excellent
              <br />
              Centre & School
            </h2>

            <p className="mb-8 max-w-2xl text-base leading-8 text-white/90 md:text-xl">
              A private school in Likoni, Shelley Beach, Mombasa, for both
              sponsored and fee-paying learners.
            </p>

            <div className="mb-8 flex flex-wrap gap-3 sm:gap-4">
              <Link
                href="/admissions"
                className="inline-flex items-center gap-3 bg-[#d97706] px-6 py-3.5 text-base font-semibold text-white transition hover:bg-[#b45309] sm:px-7 sm:py-4"
              >
                Apply for Admission
                <ArrowRight size={18} />
              </Link>

              <Link
                href="#programs"
                className="inline-flex items-center gap-3 border border-white/40 bg-black/20 px-6 py-3.5 text-base font-semibold text-white transition hover:bg-white/10 sm:px-7 sm:py-4"
              >
                Explore Programs
                <ArrowRight size={18} />
              </Link>
            </div>

            {/* Stats — the only place these numbers appear on the site */}
            <div className="grid grid-cols-4 gap-2 lg:hidden">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-white/20 bg-[#0f172a]/75 p-2.5 text-center"
                >
                  <p className="text-lg font-bold text-orange-300">{s.value}</p>
                  <p className="mt-0.5 whitespace-pre-line text-[10px] leading-4 text-white/70">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Stats Panel (desktop) */}
          <div className="hidden lg:flex lg:flex-col lg:items-end lg:gap-6">
            <div className="grid w-full max-w-xs grid-cols-2 gap-4">
              {stats.map((s) => (
                <div
                  key={s.label}
                  className="rounded-lg border border-white/20 bg-[#0f172a]/75 p-5 text-center"
                >
                  <p className="text-3xl font-bold text-orange-300">{s.value}</p>
                  <p className="mt-1 whitespace-pre-line text-xs leading-5 text-white/75">
                    {s.label}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}