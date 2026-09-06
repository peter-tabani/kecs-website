import TopBar from "@/components/layout/TopBar";
import Header from "@/components/layout/Header";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import SectionBanner from "@/components/ui/SectionBanner";

export const metadata = {
  title: "Privacy Policy | The Kenya Excellent Centre and School",
};

export default function PrivacyPage() {
  return (
    <main className="min-h-screen bg-white text-slate-900">
      <TopBar />
      <Header />
      <Navbar />

      <SectionBanner
        image="/images/hero/kecs-gate.webp"
        eyebrow="Legal"
        title="Privacy Policy"
        height="h-[160px] md:h-[220px]"
      />

      <section className="bg-white py-12 lg:py-16">
        <div className="mx-auto max-w-3xl px-4 lg:px-6">
          <p className="mb-10 text-sm text-slate-500">
            Last updated: {new Date().toLocaleDateString("en-GB", { month: "long", year: "numeric" })}
          </p>

          <div className="space-y-10">
            <div>
              <h2 className="mb-3 text-xl font-bold text-slate-900">Who we are</h2>
              <p className="leading-8 text-slate-600">
                The Kenya Excellent Centre and School (KES) runs this website.
                We are along Approved-Shelleybeach Road, Likoni, Mombasa. You
                can reach us on +254 722 916174 or excellentkenya@gmail.com.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-slate-900">What we collect</h2>
              <p className="mb-4 leading-8 text-slate-600">
                We only collect what you type into a form on this site:
              </p>
              <ul className="space-y-3 pl-5 leading-8 text-slate-600">
                <li className="list-disc">
                  <strong className="text-slate-800">Admission enquiries.</strong>{" "}
                  The learner&apos;s name and age, the grade you are applying
                  for, and a parent or guardian&apos;s name, phone number and
                  email address.
                </li>
                <li className="list-disc">
                  <strong className="text-slate-800">Donor enquiries.</strong>{" "}
                  Your name, email address, phone number and your message.
                </li>
                <li className="list-disc">
                  <strong className="text-slate-800">Donor portal accounts.</strong>{" "}
                  Your name, email address and phone number.
                </li>
              </ul>
              <p className="mt-4 leading-8 text-slate-600">
                We do not use advertising trackers and we do not sell anyone&apos;s
                information.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-slate-900">
                Where your information goes
              </h2>
              <p className="leading-8 text-slate-600">
                Form submissions are delivered to the school through Formspree,
                a third-party form service, and then handled by our office. Our
                photo gallery is hosted by Cloudinary. Both are outside Kenya,
                so your details may be stored on servers in other countries.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-slate-900">
                Photographs of learners
              </h2>
              <p className="leading-8 text-slate-600">
                We publish photographs of school life on this website. We seek
                parental consent before a child&apos;s photograph is used, and
                we do not publish a child&apos;s full name, class or any contact
                details alongside their photograph. If you are a parent or
                guardian and want a photograph of your child removed, contact
                the office and we will take it down.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-slate-900">Your rights</h2>
              <p className="leading-8 text-slate-600">
                Under the Kenya Data Protection Act, 2019 you may ask us what
                information we hold about you or your child, ask us to correct
                it, or ask us to delete it. Write to
                excellentkenya@gmail.com or come to the school office and we
                will respond.
              </p>
            </div>

            <div>
              <h2 className="mb-3 text-xl font-bold text-slate-900">Changes</h2>
              <p className="leading-8 text-slate-600">
                If we change how we handle your information we will update this
                page and change the date at the top.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
