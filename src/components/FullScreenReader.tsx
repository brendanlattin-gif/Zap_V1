"use client";

/**
 * Full-screen reader modal — large projected text for the class.
 */

export function FullScreenReader({
  open,
  title,
  text,
  onClose,
}: {
  open: boolean;
  title: string;
  text: string;
  onClose: () => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Full story reader"
    >
      <div className="zap-panel flex max-h-[92vh] w-full max-w-4xl flex-col overflow-hidden shadow-xl animate-pop">
        <div className="flex items-center justify-between border-b-2 border-zap-ink px-5 py-3">
          <h2 className="font-display text-xl text-zap-red">{title}</h2>
          <button type="button" className="zap-btn zap-btn-peach" onClick={onClose}>
            Close
          </button>
        </div>
        <div className="overflow-y-auto px-6 py-6 sm:px-10 sm:py-8">
          <p className="whitespace-pre-wrap font-body text-2xl leading-relaxed text-zap-ink sm:text-3xl sm:leading-relaxed">
            {text}
          </p>
        </div>
      </div>
    </div>
  );
}
