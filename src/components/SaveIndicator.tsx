import type { SaveState } from "@/lib/types";

/** Visible auto-save status for classroom confidence. */
export function SaveIndicator({ state }: { state: SaveState }) {
  const label =
    state === "saving"
      ? "Saving…"
      : state === "saved"
        ? "Saved"
        : state === "error"
          ? "Save failed"
          : "";

  if (!label) return null;

  return (
    <span
      className={`font-body text-sm font-bold ${
        state === "error" ? "text-zap-red" : "text-zap-muted"
      }`}
      aria-live="polite"
    >
      {label}
    </span>
  );
}
