"use client";

import { useEffect, useState } from "react";

export default function ImageSlideshow({
  images,
  heightClass = "h-[280px] md:h-[420px] lg:h-full lg:min-h-[460px]",
  intervalMs = 4500,
  position = "bg-center",
}: {
  images: string[];
  heightClass?: string;
  intervalMs?: number;
  position?: string;
}) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (images.length < 2 || paused) return;
    const timer = setInterval(() => {
      setActive((current) => (current + 1) % images.length);
    }, intervalMs);
    return () => clearInterval(timer);
  }, [images.length, intervalMs, paused]);

  return (
    <div
      className={`relative w-full overflow-hidden rounded-xl shadow-md ${heightClass}`}
      onTouchStart={() => setPaused(true)}
      onTouchEnd={() => setPaused(false)}
    >
      {images.map((src, i) => (
        <div
          key={src}
          className={`absolute inset-0 bg-cover ${position} transition-opacity duration-1000 ${
            i === active ? "opacity-100" : "opacity-0"
          }`}
          style={{ backgroundImage: `url('${src}')` }}
        />
      ))}

      {images.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {images.map((src, i) => (
            <button
              key={src}
              onClick={() => setActive(i)}
              aria-label={`Show photo ${i + 1}`}
              className={`h-2 rounded-full transition-all ${
                i === active ? "w-6 bg-[#d97706]" : "w-2 bg-white/60 hover:bg-white"
              }`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
