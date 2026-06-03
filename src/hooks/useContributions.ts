"use client"
import useSWR from 'swr'

const fetcher = (url: string) => fetch(url).then((r) => r.json())

export function useContributions(username = 'Reranko05') {
  const { data, error } = useSWR(`/api/github/contributions?username=${encodeURIComponent(username)}`, fetcher, {
    revalidateOnFocus: false,
  })

  return {
    data,
    error,
    isLoading: !data && !error,
  }
}

export default useContributions
