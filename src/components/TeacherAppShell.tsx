import { SiteFooter } from "@/components/SiteFooter";

/**
 * Viewport-locked teacher shell. Footer overlays the bottom edge so short
 * viewports cover content instead of compressing the layout upward.
 *
 * Horizontal floor: min-w-[360px] lives on the column that also positions the
 * footer. overflow-x-auto on the parent means footer + page scroll sideways
 * together below 360px (instead of the footer shrinking with the viewport).
 */
export function TeacherAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative flex h-dvh max-h-dvh flex-col overflow-hidden">
      <div className="min-h-0 min-w-0 flex-1 overflow-x-auto overflow-y-hidden">
        <div className="relative flex h-full min-h-0 min-w-[360px] w-full flex-col">
          <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
            {children}
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30">
            <div className="pointer-events-auto">
              <SiteFooter />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
