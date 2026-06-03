"use client"
import useSWR from 'swr'
import type { GitHubData } from '@/lib/github'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useGitHub(username = 'Reranko05') {
  const { data, error } = useSWR<GitHubData>(`/api/github?username=${username}`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export default useGitHub
