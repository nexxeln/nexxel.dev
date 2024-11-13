"use client"

import { useScramble } from "use-scramble"

export function ScrambleText({
  text,
  className = "",
  speed = 0.5,
  tick = 1,
  step = 1,
  scramble = 5,
  seed = 3,
}: {
  text: string
  className?: string
  speed?: number
  tick?: number
  step?: number
  scramble?: number
  seed?: number
}) {
  const { ref } = useScramble({
    text,
    speed,
    tick,
    step,
    scramble,
    seed,
    overdrive: true,
  })

  return <span ref={ref} className={className} />
}
