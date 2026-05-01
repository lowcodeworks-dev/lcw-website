'use client'

import { useEffect, useState } from 'react'

export function SeoulClock() {
  const [time, setTime] = useState<string | null>(null)

  useEffect(() => {
    function tick() {
      setTime(
        new Intl.DateTimeFormat('en-GB', {
          timeZone: 'Asia/Seoul',
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
        }).format(new Date())
      )
    }
    tick()
    const id = setInterval(tick, 1000)
    return () => clearInterval(id)
  }, [])

  if (!time) return null

  return (
    <span className="text-xs text-background/30 tabular-nums">
      Seoul {time} KST
    </span>
  )
}
