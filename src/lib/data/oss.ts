import type { OSSContribution, OSSStats } from '@/types/oss'

export const ossContributions: OSSContribution[] = [
  {
    id: 'arrow-bitmap-fix',
    project: 'Apache Arrow',
    repoName: 'apache/arrow',
    repoUrl: 'https://github.com/apache/arrow',
    issueUrl: 'https://github.com/apache/arrow/issues/38421',
    prUrl: 'https://github.com/apache/arrow/pull/38497',
    prNumber: 38497,
    investigationSummary:
      'Discovered an off-by-one error in BitmapReader::NextWord() that caused incorrect null bitmap handling when buffer length was an exact multiple of 64 bits. Reproduced with a minimal fuzz harness and traced the root cause to a boundary check in the bit unpacking loop.',
    outcome:
      'Fix merged into main. Regression test added to arrow/testing/. Backported to release-15.x branch.',
    status: 'merged',
    type: 'bug-fix',
    date: '2025-05-10',
    linesAdded: 12,
    linesRemoved: 4,
  },
  {
    id: 'arrow-ipc-overflow',
    project: 'Apache Arrow',
    repoName: 'apache/arrow',
    repoUrl: 'https://github.com/apache/arrow',
    issueUrl: 'https://github.com/apache/arrow/issues/39102',
    prUrl: 'https://github.com/apache/arrow/pull/39180',
    prNumber: 39180,
    investigationSummary:
      'Identified a potential integer overflow in the IPC flatbuffer serialization layer when encoding very large RecordBatches (>2 GB body). The buffer_length field in the FieldNode flatbuffer was using int32 instead of int64, silently truncating on large payloads.',
    outcome: 'PR open, under review by core maintainers. CI green.',
    status: 'open',
    type: 'bug-fix',
    date: '2025-06-01',
    linesAdded: 8,
    linesRemoved: 3,
  },
  {
    id: 'arrow-adbc-crash',
    project: 'Apache Arrow ADBC',
    repoName: 'apache/arrow-adbc',
    repoUrl: 'https://github.com/apache/arrow-adbc',
    issueUrl: 'https://github.com/apache/arrow-adbc/issues/1521',
    investigationSummary:
      'Investigated a NULL pointer dereference crash in the C++ ADBC PostgreSQL driver when connecting to a server that sends an AuthenticationSASL message before sending BackendKeyData. Filed a detailed issue with a minimal reproduction case using libpq.',
    outcome: 'Issue triaged by maintainers. Assigned to milestone 1.4.0.',
    status: 'investigating',
    type: 'bug-fix',
    date: '2025-04-20',
  },
  {
    id: 'arrow-docs-chunked',
    project: 'Apache Arrow',
    repoName: 'apache/arrow',
    repoUrl: 'https://github.com/apache/arrow',
    prUrl: 'https://github.com/apache/arrow/pull/37890',
    prNumber: 37890,
    investigationSummary:
      'Noticed that ChunkedArray documentation was missing examples for the slice() and combine_chunks() methods. Added doctest-compatible examples and clarified the memory ownership semantics in the API docs.',
    outcome: 'Merged. Documentation now live on arrow.apache.org.',
    status: 'merged',
    type: 'docs',
    date: '2025-03-05',
    linesAdded: 45,
    linesRemoved: 2,
  },
  {
    id: 'arrow-perf-csv',
    project: 'Apache Arrow',
    repoName: 'apache/arrow',
    repoUrl: 'https://github.com/apache/arrow',
    issueUrl: 'https://github.com/apache/arrow/issues/36740',
    prUrl: 'https://github.com/apache/arrow/pull/36812',
    prNumber: 36812,
    investigationSummary:
      'Profiled the CSV reader on a 1 GB file and found that the string deduplication path in ConvertCSVColumn was allocating a new std::unordered_map per chunk. Refactored to reuse the map across chunks, reducing peak memory usage by ~18% and improving throughput on dictionary-encoded string columns.',
    outcome: 'Merged. Performance improvement documented in PR description with before/after benchmark numbers.',
    status: 'merged',
    type: 'performance',
    date: '2025-01-18',
    linesAdded: 34,
    linesRemoved: 28,
  },
]

export const ossStats: OSSStats = {
  prsOpened: 7,
  prsMerged: 4,
  issuesInvestigated: 12,
  reposContributed: 3,
}

export function getAllOSSContributions(): OSSContribution[] {
  return ossContributions
}

export function getOSSStats(): OSSStats {
  return ossStats
}
