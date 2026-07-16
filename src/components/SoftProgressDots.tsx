/**
 * Soft 5-dot progress (visual only — does not limit story length).
 * filledCount = how many rounds completed after the opening (0–5+).
 */

export function SoftProgressDots({ filledCount }: { filledCount: number }) {
  const dots = [0, 1, 2, 3, 4];

  return (
    <div className="flex w-full max-w-md items-center gap-0 px-2" aria-hidden="true">
      {dots.map((i) => {
        const isActive = i === Math.min(filledCount, 4);
        const isPast = i < filledCount;
        return (
          <div key={i} className="flex flex-1 items-center last:flex-none">
            <span
              className={`inline-block h-4 w-4 shrink-0 rounded-full border-[2.5px] ${
                isActive
                  ? "border-zap-red bg-white"
                  : isPast
                    ? "border-zap-sky-deep bg-zap-sky-deep"
                    : "border-zap-dot-line bg-white"
              }`}
            />
            {i < dots.length - 1 && (
              <span className="mx-1 h-[2px] flex-1 bg-zap-dot-line" />
            )}
          </div>
        );
      })}
    </div>
  );
}
