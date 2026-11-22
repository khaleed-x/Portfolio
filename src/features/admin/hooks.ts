import { useEffect, useState } from 'react'
import { getHealth, getStats, listPostMeta, type Check, type PostMeta, type Stats } from './api'

export function useStats(days: number) {
  const [result, setResult] = useState<{ days: number; stats: Stats | null; error: string }>({ days: -1, stats: null, error: '' })
  useEffect(() => {
    let cancelled = false
    getStats(days)
      .then((stats) => !cancelled && setResult({ days, stats, error: '' }))
      .catch((e: Error) => !cancelled && setResult({ days, stats: null, error: e.message }))
    return () => {
      cancelled = true
    }
  }, [days])
  return { stats: result.stats, error: result.days === days ? result.error : '', loading: result.days !== days }
}

export function usePostMeta() {
  const [state, setState] = useState<{ posts: PostMeta[] | null; error: string }>({ posts: null, error: '' })
  useEffect(() => {
    let cancelled = false
    listPostMeta()
      .then((posts) => !cancelled && setState({ posts, error: '' }))
      .catch((e: Error) => !cancelled && setState({ posts: null, error: e.message }))
    return () => {
      cancelled = true
    }
  }, [])
  return state
}

export function useHealth() {
  const [state, setState] = useState<{ checks: Check[] | null; error: string }>({ checks: null, error: '' })
  useEffect(() => {
    let cancelled = false
    getHealth()
      .then((checks) => !cancelled && setState({ checks, error: '' }))
      .catch((e: Error) => !cancelled && setState({ checks: null, error: e.message }))
    return () => {
      cancelled = true
    }
  }, [])
  return state
}
