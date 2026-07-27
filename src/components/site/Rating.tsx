import { Star } from "lucide-react";
import { ratingFor, reviewCountFor } from "@/lib/rating";

export function Rating({
  slug,
  size = "sm",
  showCount = false,
}: {
  slug: string;
  size?: "sm" | "md";
  showCount?: boolean;
}) {
  const value = ratingFor(slug);
  const count = reviewCountFor(slug);
  const iconClass = size === "md" ? "size-4" : "size-3.5";
  const textClass = size === "md" ? "text-sm" : "text-xs";
  return (
    <div className={`inline-flex items-center gap-1 ${textClass} text-foreground/80`}>
      <Star className={`${iconClass} fill-primary text-primary`} />
      <span className="font-medium">{value.toFixed(1)}</span>
      {showCount && <span className="text-muted-foreground">({count})</span>}
    </div>
  );
}