import { useEffect, useRef, useState } from 'react'
import { getDeployState, type DeployState } from './api'

const label: Record<DeployState, string> = {
  building: 'Publishing… live in about a minute',
  live: 'Live ✓',
  failed: 'Deploy failed. Check Vercel.',
}

export function DeployStatus({ sha, onLive }: { sha: string; onLive?: () => void }) {
  const [state, setState] = useState<DeployState>('building')
  const onLiveRef = useRef(onLive)

  useEffect(() => {
    onLiveRef.current = onLive
  })

  useEffect(() => {
    let stopped = false
    let tries = 0
    const tick = async () => {
      if (stopped) return
      try {
        const s = await getDeployState(sha)
        if (stopped) return
        setState(s)
        if (s === 'live') return void onLiveRef.current?.()
        if (s === 'failed') return
      } catch {
        /* keep polling */
      }
      if (++tries < 40) setTimeout(tick, 5000)
    }
    void tick()
    return () => {
      stopped = true
    }
  }, [sha])

  return <div className={`deploy deploy-${state}`}>{label[state]}</div>
}
