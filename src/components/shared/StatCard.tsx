import { cn } from "@/lib/utils";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  className?: string;
}

export function StatCard({ label, value, icon, className }: StatCardProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-1 p-4 rounded-lg",
        className
      )}
      style={{
        backgroundColor: "var(--color-gh-surface)",
        border: "1px solid var(--color-gh-border)",
      }}
    >
      {icon && (
        <div className="mb-1" style={{ color: "var(--color-gh-text-muted)" }}>
          {icon}
        </div>
      )}
      <span
        className="text-2xl font-bold font-mono"
        style={{ color: "var(--color-gh-text)" }}
      >
        {value}
      </span>
      <span className="text-xs" style={{ color: "var(--color-gh-text-muted)" }}>
        {label}
      </span>
    </div>
  );
}
