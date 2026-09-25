import { SiteFooter } from "@/components/SiteFooter";

/** Sticky-footer shell for authenticated teacher pages. */
export function TeacherAppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex min-h-0 flex-1 flex-col">{children}</div>
      <SiteFooter />
    </div>
  );
}
