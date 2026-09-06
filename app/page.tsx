import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import About from "@/components/sections/About";
import Programs from "@/components/sections/Programs";
import GalleryPreview from "@/components/sections/GalleryPreview";
import SectionBanner from "@/components/ui/SectionBanner";
import SwipeRow from "@/components/ui/SwipeRow";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />
      <Hero />
      <About />
      <Programs />
      <GalleryPreview />

      {/* Why Choose KES */}
      <section id="why-kecs" className="bg-white pb-16 lg:pb-20">
        <SectionBanner
          image="/images/programs/junior.jpg"
          eyebrow="Why Choose KES"
          title="What Your Child Gets Here"
          height="h-[180px] md:h-[240px]"
        />
        <div className="mx-auto max-w-[1400px] px-4 pt-10 lg:px-6 lg:pt-14">
          <SwipeRow desktopGrid="lg:grid-cols-3">
            {[
              {
                title: "Discipline & Integrity",
                body: "We hold learners to a high standard of behaviour and honesty, and we follow it up daily rather than only talking about it.",
              },
              {
                title: "School Transport",
                body: "A school bus and van service runs daily, so getting your child to and from school is one less thing to arrange.",
              },
              {
                title: "ICT & Online Research",
                body: "A computer lab and an Online Research Centre where learners can do their own research and get used to working on a computer.",
              },
              {
                title: "Science Lab",
                body: "An equipped science laboratory, so learners actually run experiments instead of only reading about them.",
              },
              {
                title: "Talent Development",
                body: "A music room, athletics, Taekwondo and Scouting. Plenty of children find what they are good at outside the classroom.",
              },
              {
                title: "Guidance & Counselling",
                body: "A counsellor learners can talk to. Problems at home or with friends affect schoolwork, and we would rather know early.",
              },
            ].map((item) => (
              <div key={item.title} className="h-full rounded-xl border border-slate-200 p-6">
                <h4 className="mb-3 text-xl font-semibold">{item.title}</h4>
                <p className="leading-8 text-slate-600">{item.body}</p>
              </div>
            ))}
          </SwipeRow>
        </div>
      </section>

      {/* Admissions CTA */}
      <section id="admissions" className="bg-[#0f172a] py-16 text-white lg:py-20">
        <div className="mx-auto max-w-[1400px] px-4 lg:px-6">
          <div className="rounded-xl bg-white/5 px-6 py-10 lg:flex lg:items-center lg:justify-between lg:px-8 lg:py-12">
            <div className="max-w-3xl">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.25em] text-orange-300">
                Admissions
              </p>
              <h3 className="hero-title mb-5 text-4xl leading-tight md:text-5xl">
                Bring Your Child to KES
              </h3>
              <p className="mb-6 text-base leading-8 text-white/85">
                We are admitting learners into ECDE (from age 3), Primary
                (Grade 1-6) and Junior Secondary (Grade 7-9). Call us, or read
                the requirements and fee details on the admissions page.
              </p>
              <Link
                href="/admissions"
                className="inline-flex items-center gap-2 text-sm font-bold text-orange-300 hover:text-orange-200"
              >
                See admission requirements <ArrowRight size={15} />
              </Link>
            </div>

            <div className="mt-8 flex flex-col gap-3 lg:mt-0 lg:items-end">
              <a
                href="tel:+254722916174"
                className="inline-flex items-center gap-3 rounded-full bg-[#d97706] px-7 py-4 font-semibold text-white transition hover:bg-[#b45309]"
              >
                Call +254 722 916174
                <ArrowRight size={18} />
              </a>
              <a
                href="mailto:excellentkenya@gmail.com"
                className="inline-flex items-center gap-3 rounded-full border border-white/30 px-7 py-4 font-semibold text-white transition hover:bg-white/10"
              >
                Email Us
                <ArrowRight size={18} />
              </a>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}