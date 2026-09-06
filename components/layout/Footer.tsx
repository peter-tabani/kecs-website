import Link from "next/link";

export default function Footer() {
  return (
    <footer id="contact" className="bg-[#0f172a] py-12 text-white lg:py-16">
      <div className="mx-auto grid max-w-[1400px] grid-cols-2 gap-x-6 gap-y-8 px-4 lg:grid-cols-3 lg:gap-10 lg:px-6">

        {/* Brand */}
        <div className="col-span-2 lg:col-span-1">
          <h4 className="mb-1 text-2xl font-bold text-[#d97706]">KES</h4>
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/50">
            Natuwe Mbele Daima
          </p>
          <p className="mt-3 leading-8 text-white/65">
            Teaching children in Likoni since 2013, from PP1 right through to
            Grade 9.
          </p>
        </div>

        {/* Contact */}
        <div>
          <h5 className="mb-3 text-lg font-semibold text-white lg:mb-4">Contact</h5>
          <div className="space-y-3 text-sm text-white/65 lg:text-base">
            <p>Along Approved-Shelleybeach Road,<br />Likoni, Mombasa</p>
            <a href="tel:+254722916174" className="block hover:text-[#d97706]">
              +254 722 916174
            </a>
            <a href="mailto:excellentkenya@gmail.com" className="block break-words hover:text-[#d97706]">
              excellentkenya@gmail.com
            </a>
            <p>School Hours: 6:00 AM – 6:00 PM</p>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h5 className="mb-3 text-lg font-semibold text-white lg:mb-4">Quick Links</h5>
          <div className="space-y-3 text-sm text-white/65 lg:text-base">
            <p><Link href="/#about" className="hover:text-[#d97706]">About Us</Link></p>
            <p><Link href="/gallery" className="hover:text-[#d97706]">Photo Gallery</Link></p>
            <p><Link href="/admissions" className="hover:text-[#d97706]">Admissions</Link></p>
            <p><Link href="/#why-kecs" className="hover:text-[#d97706]">School Life</Link></p>
            <p><Link href="/donors/portal" className="hover:text-[#d97706]">Donors</Link></p>
            <p><Link href="/privacy" className="hover:text-[#d97706]">Privacy Policy</Link></p>
            <p>
              <Link href="/admin/login" className="font-semibold text-[#d97706] hover:text-white">
                Staff Photo Upload
              </Link>
            </p>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="mx-auto mt-10 max-w-[1400px] border-t border-white/10 px-4 pt-6 lg:mt-12 lg:px-6">
        <div className="flex flex-col gap-2 text-sm text-white/40 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} The Kenya Excellent Centre and School. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/254708905590?text=Hello%20Frank%2C%20I%20saw%20your%20work%20on%20the%20KES%20website%20and%20I%20am%20interested%20in%20working%20with%20you."
              target="_blank"
              rel="noopener noreferrer"
              className="transition hover:text-[#d97706]"
            >
              Developed by PF
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}