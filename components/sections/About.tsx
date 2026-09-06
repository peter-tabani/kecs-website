import { ArrowRight } from "lucide-react";
import Link from "next/link";
import SectionBanner from "@/components/ui/SectionBanner";
import ImageSlideshow from "@/components/ui/ImageSlideshow";
import ReadMore from "@/components/ui/ReadMore";
import SwipeRow from "@/components/ui/SwipeRow";
import { ABOUT_SLIDESHOW_COUNT, listGalleryImages } from "@/lib/cloudinary";

// Shown only until the school has uploaded photos of their own.
const FALLBACK_SLIDES = [
  "/images/hero/kecs-gate.webp",
  "/images/programs/ecde.jpg",
  "/images/programs/primary.jpg",
  "/images/programs/junior.jpg",
];

export default async function About() {
  // The newest uploads from the admin dashboard, whatever category they are in.
  const uploaded = await listGalleryImages();
  const slides = uploaded.length
    ? uploaded.slice(0, ABOUT_SLIDESHOW_COUNT).map((image) => image.url)
    : FALLBACK_SLIDES;

  return (
    <section id="about" className="bg-white">

      {/* ── Part 1: Photos + Story ── */}
      <div className="bg-[#0f172a] px-4 py-12 md:py-24 lg:px-6">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-10 lg:grid-cols-[1fr_1.05fr] lg:items-center lg:gap-16">

            {/* Photos — newest uploads, refreshed automatically */}
            <ImageSlideshow images={slides} position="bg-[center_35%]" />

            {/* Heading + story + stats */}
            <div>
              <p className="mb-4 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
                About KES
              </p>
              <h2 className="hero-title mb-6 text-4xl font-medium leading-tight text-white md:text-5xl">
                Where Likoni children{" "}
                <span className="text-[#d97706]">get their start.</span>
              </h2>

              <ReadMore>
                <p className="mb-5 text-base leading-9 text-white/70">
                  We opened on one belief: every child deserves a good
                  education, whatever their family can afford. We started with{" "}
                  <strong className="text-white">25 fee-paying students</strong>{" "}
                  and <strong className="text-white">5 needy children</strong>,
                  most of them orphans or from the poorest homes in Likoni.
                </p>
                <p className="text-base leading-9 text-white/70">
                  Director <strong className="text-white">Mr. Noah Mweruphe</strong>{" "}
                  and the team who started the school believed that children
                  from well-off and struggling families should sit in the same
                  classroom, as equals. That is still how we run the place.
                </p>
              </ReadMore>

              <div className="mt-8 rounded-lg bg-white/5 p-5">
                <p className="text-sm italic leading-8 text-white/55">
                  &ldquo;Our goal is that 75% of our learners are fully sponsored,
                  so that the fortunate and the less fortunate are educated
                  together.&rdquo;
                </p>
                <p className="mt-2 text-xs font-bold text-[#d97706]">
                  Mr. Noah Mweruphe, Director
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Part 2: Vision, Mission & Values ── */}
      <div className="bg-[#fffaf2]">
        <SectionBanner
          image="/images/programs/ecde.jpg"
          eyebrow="What We Stand For"
          title="Vision, Mission & Values"
          height="h-[160px] md:h-[220px]"
        />
        <div className="px-4 py-10 lg:px-6 lg:py-14">
          <div className="mx-auto max-w-[1400px]">
            <SwipeRow desktopGrid="lg:grid-cols-3">
              {[
                {
                  title: "Vision",
                  body: "To be the best in providing quality education and care to the young.",
                },
                {
                  title: "Mission",
                  body: "To bring together resources and partners so that every learner is educated and cared for, whether their family pays fees or not.",
                },
                {
                  title: "Core Values",
                  body: "Discipline, honesty, hard work, integrity, and close relationships among all staff and learners.",
                },
              ].map((card) => (
                <div
                  key={card.title}
                  className="h-full rounded-xl border border-slate-200 bg-white p-6 transition hover:border-[#d97706]/50"
                >
                  <h4 className="mb-2 font-bold text-slate-900">{card.title}</h4>
                  <p className="text-sm leading-7 text-slate-500">{card.body}</p>
                </div>
              ))}
            </SwipeRow>
          </div>
        </div>
      </div>

      {/* ── Part 3: Image + Achievements ── */}
      <div className="bg-white px-4 py-10 lg:px-6 lg:py-14">
        <div className="mx-auto max-w-[1400px]">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-stretch lg:gap-12">

            {/* Photos */}
            <ImageSlideshow
              images={[
                "/images/programs/primary.jpg",
                "/images/programs/junior.jpg",
                "/images/programs/islamic.jpg",
              ]}
              heightClass="h-[260px] md:h-[380px] lg:h-full lg:min-h-[420px]"
              intervalMs={5000}
            />

            {/* Achievements */}
            <div className="flex flex-col justify-center">
              <p className="mb-3 text-sm font-bold uppercase tracking-[0.3em] text-[#d97706]">
                What We Have Achieved
              </p>
              <h3 className="hero-title mb-6 text-3xl leading-tight text-slate-900 md:text-4xl">
                What our learners have done.
              </h3>
              <div className="mb-6">
                <ReadMore
                  collapsedHeight="max-h-28"
                  fadeFrom="from-white"
                  buttonClass="text-[#d97706]"
                >
                  <div className="space-y-4">
                    {[
                      { badge: "Academics", text: "Best in Academics at sub-county level, with strong KJSEA results year after year." },
                      { badge: "Scouting", text: "Top performers in Scouting at sub-county level, building leadership and teamwork." },
                      { badge: "Sports", text: "Highly competitive in Athletics and Taekwondo, representing Likoni at county level." },
                      { badge: "Alumni", text: "Graduates admitted to Maranda High, Nanyuki High, Kwale High and Matuga Girls." },
                    ].map((item) => (
                      <div key={item.badge} className="flex items-start gap-4">
                        <span className="mt-0.5 shrink-0 rounded-full bg-[#d97706] px-3 py-0.5 text-xs font-bold text-white">
                          {item.badge}
                        </span>
                        <p className="text-sm leading-7 text-slate-600">{item.text}</p>
                      </div>
                    ))}
                  </div>
                </ReadMore>
              </div>
              <div className="flex flex-wrap gap-3">
                <Link
                  href="/admissions"
                  className="inline-flex items-center gap-2 rounded-full bg-[#d97706] px-6 py-3 text-sm font-bold text-white transition hover:bg-[#b45309]"
                >
                  Join KES <ArrowRight size={16} />
                </Link>
                <Link
                  href="/donors/portal"
                  className="inline-flex items-center gap-2 rounded-full border border-slate-200 px-6 py-3 text-sm font-bold text-slate-700 transition hover:border-[#d97706] hover:text-[#d97706]"
                >
                  Support a Child <ArrowRight size={16} />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

    </section>
  );
}