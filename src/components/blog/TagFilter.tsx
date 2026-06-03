"use client";

import { cn } from "@/lib/utils";

interface TagFilterProps {
  tags: string[];
  selected: string[];
  onToggle: (tag: string) => void;
}

export function TagFilter({ tags, selected, onToggle }: TagFilterProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => {
        const active = selected.includes(tag);
        return (
          <button
            key={tag}
            onClick={() => onToggle(tag)}
            className={cn(
              "px-3 py-1 rounded-full text-xs font-medium transition-all duration-150"
            )}
            style={{
              backgroundColor: active
                ? "var(--color-gh-accent-muted)"
                : "var(--color-gh-elevated)",
              border: `1px solid ${active ? "var(--color-gh-accent)" : "var(--color-gh-border)"}`,
              color: active ? "var(--color-gh-accent)" : "var(--color-gh-text-muted)",
            }}
          >
            {tag}
          </button>
        );
      })}
    </div>
  );
}
