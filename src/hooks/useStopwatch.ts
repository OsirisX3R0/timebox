import { useRef, useState } from "react"
import useTime from "./useTime"

interface Lap {
  lapTime: number,
  elapsed: number
}

const useStopwatch = (): [string, Lap[], () => void, () => void, () => void, () => void] => {
  const [time, setTime] = useState(0)
  const timer = useTime(time, true, true, 2)
  const [laps, setLaps] = useState<Lap[]>([])
  const stopwatch = useRef<number>(undefined)

  const startStopWatch = () => {
    stopwatch.current = setInterval(() => {
      setTime(prevTime => prevTime += 0.01)
    }, 10)
  }

  const takeLap = () => {
    const [lastLap] = laps.slice(-1)

    if (!lastLap)
      setLaps(prevLaps => [...prevLaps, { lapTime: time.toFixed(2), elapsed: time.toFixed(2) }])
    else {
      setLaps(prevLaps => [...prevLaps, { lapTime: (time - lastLap.elapsed).toFixed(2), elapsed: time.toFixed(2) }])
    }
  }

  const pauseStopWatch = () => {
    clearInterval(stopwatch.current)
  }

  const stopStopWatch = () => {
    clearInterval(stopwatch.current)
    setTime(0)
    setLaps([])
  }

  return [
    timer,
    laps,
    startStopWatch,
    takeLap,
    pauseStopWatch,
    stopStopWatch
  ]
}

export default useStopwatch