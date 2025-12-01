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
      <div className="new-timer">{time}</div>
      <div className="laps">
        {laps.map((lap, i) => (
          <div className="lap" key={i}>
            <div>{i + 1}</div>
            <div>{lap.lapTime}</div>
            <div>{lap.elapsed}</div>
          </div>
        ))}
      </div>
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