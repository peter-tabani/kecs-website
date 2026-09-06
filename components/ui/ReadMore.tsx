"use client";

import { useState, type ReactNode } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

/**
 * Collapses long copy on phones so readers are not stuck scrolling.
 * Everything is shown as normal from the `lg` breakpoint up.
 */
export default function ReadMore({
  children,
  collapsedHeight = "max-h-32",
  fadeFrom = "from-[#0f172a]",
  buttonClass = "text-[#d97706]",
}: {
  children: ReactNode;
  collapsedHeight?: string;
  fadeFrom?: string;
  buttonClass?: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      <div
        className={`relative overflow-hidden lg:max-h-none lg:overflow-visible ${
          open ? "max-h-none" : collapsedHeight
        }`}
      >
        {children}
        {!open && (
          <div
            className={`pointer-events-none absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t ${fadeFrom} to-transparent lg:hidden`}
          />
        )}
      </div>

      <button
        onClick={() => setOpen((v) => !v)}
        className={`mt-3 inline-flex items-center gap-1.5 text-sm font-bold lg:hidden ${buttonClass}`}
      >
        {open ? "Show less" : "Read more"}
        {open ? <ChevronUp size={15} /> : <ChevronDown size={15} />}
      </button>
    </div>
  );
}
