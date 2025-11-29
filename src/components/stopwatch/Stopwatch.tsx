import { Activity, useState } from "react"
import useStopwatch from "../../hooks/useStopwatch"

const Stopwatch = () => {
  const [
    time,
    laps,
    startStopWatch,
    takeLap,
    pauseStopWatch,
    stopStopWatch
  ] = useStopwatch()
  const [active, setActive] = useState(false)
  const [paused, setPaused] = useState(false)

  const start = () => {
    setActive(true)
    setPaused(false)
    startStopWatch()
  }

  const pause = () => {
    setPaused(true)
    pauseStopWatch()
  }

  const stop = () => {
    setActive(false)
    stopStopWatch()
  }

  return (
    <>
      <div>{time}</div>
      <ul className="laps">
        {laps.map((lap, i) => <li key={i}>{lap.lapTime} {lap.elapsed}</li>)}
      </ul>
      <Activity mode={!active || paused ? 'visible' : 'hidden'}>
        <button onClick={start}>Start ▶︎</button>
      </Activity>
      <Activity mode={active && !paused ? 'visible' : 'hidden'}>
        <button onClick={pause}>Pause ⏸</button>
      </Activity>
      <Activity mode={!active ? 'hidden' : 'visible'}>
        <button onClick={stop}>Reset ↺</button>
      </Activity>
      <Activity mode={!active ? 'hidden' : 'visible'}>
        <button onClick={takeLap}>Lap</button>
      </Activity>
    </>
  )
}

export default Stopwatch