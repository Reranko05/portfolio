import type { OSSContribution } from "@/types/oss";
import { ContributionCard } from "./ContributionCard";

export function ContributionTimeline({
  contributions,
}: {
  contributions: OSSContribution[];
}) {
  return (
    <div>
      {contributions.map((c, i) => (
        <ContributionCard
          key={c.id}
          contribution={c}
          isLast={i === contributions.length - 1}
        />
      ))}
    </div>
  );
}
