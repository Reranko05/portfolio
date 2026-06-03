"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ page, totalPages, onPageChange }: PaginationProps) {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center justify-center gap-2 mt-8">
      <button
        onClick={() => onPageChange(page - 1)}
        disabled={page === 1}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "var(--color-gh-elevated)",
          border: "1px solid var(--color-gh-border)",
          color: "var(--color-gh-text-muted)",
        }}
      >
        <ChevronLeft size={15} />
        Prev
      </button>

      <div className="flex items-center gap-1">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            onClick={() => onPageChange(p)}
            className="w-8 h-8 rounded-md text-sm font-medium transition-colors"
            style={{
              backgroundColor:
                p === page ? "var(--color-gh-accent)" : "var(--color-gh-elevated)",
              color:
                p === page ? "var(--color-gh-canvas)" : "var(--color-gh-text-muted)",
              border: "1px solid var(--color-gh-border)",
            }}
          >
            {p}
          </button>
        ))}
      </div>

      <button
        onClick={() => onPageChange(page + 1)}
        disabled={page === totalPages}
        className="flex items-center gap-1 px-3 py-1.5 rounded-md text-sm transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
        style={{
          backgroundColor: "var(--color-gh-elevated)",
          border: "1px solid var(--color-gh-border)",
          color: "var(--color-gh-text-muted)",
        }}
      >
        Next
        <ChevronRight size={15} />
      </button>
    </div>
  );
}
