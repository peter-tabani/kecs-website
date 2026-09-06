"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import SwipeRow from "@/components/ui/SwipeRow";

const programs = [
  {
    id: "ecde",
    title: "ECDE",
    subtitle: "PP1 – PP2",
    image: "/images/programs/ecde.jpg",
    fallbackColor: "from-amber-600 to-orange-500",
    description:
      "Play-based learning that covers early reading, numbers and social skills. We take children from age 3. Small classes, patient teachers, and a settled routine that helps a child get used to school.",
    details: ["Ages 3 and above", "PP1 & PP2", "CBC Curriculum"],
  },
  {
    id: "primary",
    title: "Primary School",
    subtitle: "Grade 1 – 6",
    image: "/images/programs/primary.jpg",
    fallbackColor: "from-blue-700 to-blue-500",
    description:
      "The full CBC programme: Mathematics, Science, Social Studies and Communication, taught alongside the character lessons we take seriously here. Pupils sit KPSEA at the end of Grade 6.",
    details: ["Grade 1 – 6", "CBC Curriculum", "KPSEA Assessment"],
  },
  {
    id: "junior",
    title: "Junior Secondary",
    subtitle: "Grade 7 – 9",
    image: "/images/programs/junior.jpg",
    fallbackColor: "from-slate-700 to-slate-600",
    description:
      "Grade 7 to 9, ending with the Kenya Junior Secondary Education Assessment (KJSEA). Learners take on more responsibility for their own work here, and our leavers have gone on to national schools.",
    details: ["Grade 7 – 9", "CBC Curriculum", "KJSEA Assessment"],
  },
  {
    id: "islamic",
    title: "Islamic Curriculum",
    subtitle: "Madrasa Programme",
    image: "/images/programs/islamic.jpg",
    fallbackColor: "from-emerald-700 to-teal-600",
    description:
      "A Madrasa programme that runs alongside the normal CBC timetable, so Muslim learners can do their Islamic studies without leaving school or falling behind in class.",
    details: ["All levels", "Integrated with CBC", "Islamic Studies"],
  },
];

function FlipCard({ program }: { program: typeof programs[0] }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className="group h-[380px] cursor-pointer"
      style={{ perspective: "1000px" }}
      onClick={() => setFlipped((f) => !f)}
      onMouseEnter={() => setFlipped(true)}
      onMouseLeave={() => setFlipped(false)}
    >
      {/* Card wrapper — rotates */}
      <div
        className="relative h-full w-full transition-transform duration-700"
        style={{
          transformStyle: "preserve-3d",
          transform: flipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >

        {/* ── FRONT ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl shadow-md"
          style={{ backfaceVisibility: "hidden" }}
        >
          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center transition-opacity duration-300 group-hover:opacity-90"
            style={{ backgroundImage: `url('${program.image}')` }}
          />
          {/* Fallback gradient if no image */}
          <div className={`absolute inset-0 bg-gradient-to-br ${program.fallbackColor} opacity-30`} />
          {/* Dark overlay at bottom for text */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

          {/* Content */}
          <div className="absolute inset-0 flex flex-col justify-between p-7">
            {/* Top: emoji badge */}
            <div className="flex items-start justify-between">
              <span className="rounded-md bg-black/60 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white">
                {program.subtitle}
              </span>
              
            </div>

            {/* Bottom: title + hint */}
            <div>
              <h3 className="hero-title mb-1 text-2xl font-semibold text-white md:text-3xl">
                {program.title}
              </h3>
              <p className="flex items-center gap-1.5 text-xs font-semibold text-white/60">
                <span className="hidden md:inline">Hover to learn more</span>
                <span className="md:hidden">Tap to learn more</span>
                <ArrowRight size={12} />
              </p>
            </div>
          </div>
        </div>

        {/* ── BACK ── */}
        <div
          className="absolute inset-0 overflow-hidden rounded-xl bg-[#0f172a] p-7 shadow-md"
          style={{
            backfaceVisibility: "hidden",
            transform: "rotateY(180deg)",
          }}
        >
          {/* Orange accent top bar */}
          <div className="mb-5 h-1 w-12 rounded-full bg-[#d97706]" />

          <span className="mb-4 inline-block rounded-full bg-[#d97706]/20 px-3 py-1 text-xs font-bold uppercase tracking-wider text-[#d97706]">
            {program.subtitle}
          </span>

          <h3 className="hero-title mb-4 text-2xl text-white">{program.title}</h3>

          <p className="mb-6 text-sm leading-8 text-white/70">
            {program.description}
          </p>

          {/* Detail tags */}
          <div className="mb-6 flex flex-wrap gap-2">
            {program.details.map((d) => (
              <span
                key={d}
                className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-white/60"
              >
                {d}
              </span>
            ))}
          </div>

          <Link
            href="/admissions"
            onClick={(e) => e.stopPropagation()}
            className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-5 py-2.5 text-xs font-bold text-white hover:bg-[#b45309] transition"
          >
            Apply Now <ArrowRight size={13} />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function Programs() {
  return (
    <section id="programs" className="bg-[#fffaf2] py-16 lg:py-20">
      <div className="mx-auto max-w-[1400px] px-4 lg:px-6">

        {/* Header */}
        <div className="mb-10 text-center lg:mb-14">
          <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
            Our Learning Path, CBC Curriculum
          </p>
          <h2 className="hero-title text-4xl leading-tight text-slate-900 md:text-5xl">
            Programs for Every Stage of Growth
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-8 text-slate-500">
            From pre-primary up to Grade 9. Tap any card to see what it covers.
          </p>
        </div>

        {/* Flip Cards */}
        <SwipeRow desktopGrid="lg:grid-cols-4">
          {programs.map((program) => (
            <FlipCard key={program.id} program={program} />
          ))}
        </SwipeRow>
      </div>
    </section>
  );
}