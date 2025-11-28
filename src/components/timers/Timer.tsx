import { Activity, useState, type ReactNode } from "react"
import type { ITimer } from "../../db/types"
import useTime from "../../hooks/useTime"
import useTimer from "../../hooks/useTimer"
import db from "../../db"

interface Props {
  timer: ITimer
}

const Timer = ({ timer }: Props) => {
  const [currentTimer, setCurrentTimer] = useState(timer)
  const [paused, setPaused] = useState(false)
  const [
    timeLeft, 
    startTimer,
    addToTimer, 
    pauseTimer, 
    stopTimer
  ] = useTimer(currentTimer.duration)
  const time = useTime(timeLeft)

  const start = () => {
    setPaused(false)
    setCurrentTimer(prevCurrentTimer => ({...prevCurrentTimer, running: true}))
    startTimer()
  }
  const pause = () => {
    setPaused(true)
    pauseTimer()
  }
  const stop = () => {
    setPaused(false)
    setCurrentTimer(prevCurrentTimer => ({...prevCurrentTimer, running: false}))
    stopTimer()
  }

  const mainButton = !currentTimer.running || paused
    ? <button onClick={start}>▶︎</button>
    : <button onClick={pause}>⏸</button>

  const ifRunning = (children: ReactNode) => (
    <Activity mode={currentTimer.running ? 'visible' : 'hidden'}>
      {children}
    </Activity>
  )

  const deleteTimer = async () => {
    await db.timers.delete(timer.id)
  }

  return (
    <div className="timer">
      <div className="row">
        {currentTimer.label}
        <button className="mini" onClick={deleteTimer}>X</button>
      </div>
      <div className="row">
        <div className="duration">
          <div>
            <div>
              {time}
              {ifRunning(<button onClick={stop}>↺</button>)}
            </div>
            <meter 
              min="0" 
              max={`${currentTimer.duration}`} 
              low={currentTimer.duration * .33}
              high={currentTimer.duration * .6}
              optimum={currentTimer.duration * .8}
              value={`${timeLeft}`}
            >{timeLeft}</meter>
          </div>
        </div>
        <div className="actions">
          {ifRunning(<button onClick={() => addToTimer(60)}>+01:00</button>)}
          {mainButton}
        </div>
      </div>
    </div>
  )
}

export default Timer