import { cn } from "@/lib/utils";

interface SectionHeaderProps {
  title: string;
  description?: string;
  action?: React.ReactNode;
  className?: string;
}

export function SectionHeader({
  title,
  description,
  action,
  className,
}: SectionHeaderProps) {
  return (
    <div className={cn("flex items-start justify-between gap-4 mb-5", className)}>
      <div>
        <h2
          className="text-base font-semibold flex items-center gap-2"
          style={{ color: "var(--color-gh-text)" }}
        >
          {title}
        </h2>
        {description && (
          <p className="text-sm mt-0.5" style={{ color: "var(--color-gh-text-muted)" }}>
            {description}
          </p>
        )}
      </div>
      {action && <div className="flex-shrink-0">{action}</div>}
    </div>
  );
}
