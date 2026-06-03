// Feature flags — flip these to toggle sections site-wide
export const features = {
  // Show the LeetCode stats panel on the homepage
  SHOW_LEETCODE: true,
  // Show the command palette (Ctrl+K) — skeleton only for now
  SHOW_COMMAND_PALETTE: false,
} as const

export type FeatureFlag = keyof typeof features
