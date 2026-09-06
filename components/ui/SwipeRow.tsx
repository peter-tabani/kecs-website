import { Children, type ReactNode } from "react";
import { MoveHorizontal } from "lucide-react";

/**
 * Phones get a horizontal swipe row instead of a tall stack of cards.
 * Desktop falls back to a normal grid.
 */
export default function SwipeRow({
  children,
  desktopGrid = "lg:grid-cols-3",
  itemWidth = "w-[80vw] sm:w-[46vw]",
  hint = true,
}: {
  children: ReactNode;
  desktopGrid?: string;
  itemWidth?: string;
  hint?: boolean;
}) {
  return (
    <div>
      <div
        className={`-mx-4 flex snap-x snap-mandatory gap-5 overflow-x-auto px-4 pb-4 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:grid ${desktopGrid} lg:gap-6 lg:overflow-visible lg:px-0 lg:pb-0`}
      >
        {Children.map(children, (child, i) => (
          <div key={i} className={`${itemWidth} shrink-0 snap-start lg:w-auto lg:shrink`}>
            {child}
          </div>
        ))}
      </div>

      {hint && (
        <p className="flex items-center justify-center gap-1.5 text-xs font-semibold text-slate-400 lg:hidden">
          <MoveHorizontal size={13} />
          Swipe to see more
        </p>
      )}
    </div>
  );
}
