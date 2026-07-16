"use client";

/**
 * Plot Ideas overlay — teacher-activated only.
 * Generates 3 directions; selecting one continues the story and closes the overlay.
 */

export function PlotIdeasOverlay({
  open,
  loading,
  ideas,
  usedMock,
  error,
  onClose,
  onRegenerate,
  onSelect,
}: {
  open: boolean;
  loading: boolean;
  ideas: string[];
  usedMock: boolean;
  error: string | null;
  onClose: () => void;
  onRegenerate: () => void;
  onSelect: (idea: string) => void;
}) {
  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-40 flex items-center justify-center bg-black/45 p-4"
      role="dialog"
      aria-modal="true"
      aria-label="Plot ideas"
    >
      <div className="zap-panel w-full max-w-lg p-5 shadow-xl animate-pop sm:p-6">
        <div className="mb-4 flex items-start justify-between gap-3">
          <div>
            <h2 className="font-display text-2xl text-zap-ink">Plot Ideas</h2>
            <p className="mt-1 font-body text-sm text-zap-muted">
              Pick one direction, or regenerate for new options.
            </p>
          </div>
          <button type="button" className="zap-btn zap-btn-peach" onClick={onClose}>
            Close
          </button>
        </div>

        {usedMock && (
          <p className="mb-3 rounded-lg bg-zap-cream-deep px-3 py-2 font-body text-xs font-bold text-zap-muted">
            Using mock ideas (no OpenAI key yet).
          </p>
        )}

        {error && (
          <p className="mb-3 font-body text-sm font-bold text-zap-red">{error}</p>
        )}

        {loading ? (
          <p className="py-8 text-center font-body text-lg">Thinking of ideas…</p>
        ) : (
          <ul className="flex flex-col gap-3">
            {ideas.map((idea, index) => (
              <li key={`${index}-${idea.slice(0, 24)}`}>
                <button
                  type="button"
                  className="zap-panel-white w-full px-4 py-3 text-left font-body text-base font-semibold transition hover:bg-zap-cream"
                  onClick={() => onSelect(idea)}
                >
                  <span className="mr-2 font-display text-zap-red">
                    {String.fromCharCode(65 + index)}.
                  </span>
                  {idea}
                </button>
              </li>
            ))}
          </ul>
        )}

        <div className="mt-5 flex justify-end">
          <button
            type="button"
            className="zap-btn zap-btn-peach"
            onClick={onRegenerate}
            disabled={loading}
          >
            Regenerate
          </button>
        </div>
      </div>
    </div>
  );
}
