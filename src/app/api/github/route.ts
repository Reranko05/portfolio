import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import fetchGitHubData from '@/lib/github'

export async function GET(req: NextRequest) {
  try {
    const url = new URL(req.url)
    const username = url.searchParams.get('username') || 'Reranko05'
    const data = await fetchGitHubData(username)
    return NextResponse.json(data)
  } catch (err: any) {
    return NextResponse.json({ error: err.message || 'Unknown error' }, { status: 500 })
  }
}

export const runtime = 'nodejs'
