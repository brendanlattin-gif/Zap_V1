import Image from "next/image";
import Link from "next/link";

/** Compact Zap! logo used in headers. */
export function ZapLogo({
  size = "md",
  href = "/",
}: {
  size?: "sm" | "md" | "lg";
  href?: string | null;
}) {
  const dims = size === "lg" ? 120 : size === "sm" ? 64 : 88;
  const image = (
    <Image
      src="/brand/zaplogo-tiny.png"
      alt="Zap!"
      width={dims}
      height={Math.round(dims * 0.55)}
      className="h-auto w-auto"
      priority={size !== "sm"}
    />
  );

  if (!href) return image;
  return (
    <Link href={href} className="inline-block" aria-label="Zap! home">
      {image}
    </Link>
  );
}

/** Friendly book mascot used on landing / wizard headers. */
export function BookMascot({
  size = "md",
  className = "",
}: {
  size?: "sm" | "md" | "lg";
  className?: string;
}) {
  const src =
    size === "lg"
      ? "/brand/mainbook-big.png"
      : size === "sm"
        ? "/brand/mainbook-tiny.png"
        : "/brand/mainbook-mid.png";

  const width = size === "lg" ? 280 : size === "sm" ? 72 : 160;

  return (
    <Image
      src={src}
      alt="Zap! book mascot"
      width={width}
      height={width}
      className={`h-auto w-auto ${className}`}
      priority={size === "lg"}
    />
  );
}
