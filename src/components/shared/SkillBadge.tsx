import { cn } from "@/lib/utils";

interface SkillBadgeProps {
  label: string;
  color?: string;
  className?: string;
}

export function SkillBadge({ label, color, className }: SkillBadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-medium font-mono",
        className
      )}
      style={{
        backgroundColor: "var(--color-gh-elevated)",
        border: "1px solid var(--color-gh-border)",
        color: color || "var(--color-gh-text)",
      }}
    >
      {color && (
        <span
          className="w-2 h-2 rounded-full flex-shrink-0"
          style={{ backgroundColor: color }}
        />
      )}
      {label}
    </span>
  );
}

interface LanguageDotProps {
  name: string;
  color: string;
}

export function LanguageDot({ name, color }: LanguageDotProps) {
  return (
    <span className="flex items-center gap-1.5 text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
      <span
        className="w-3 h-3 rounded-full flex-shrink-0"
        style={{ backgroundColor: color }}
      />
      {name}
    </span>
  );
}
