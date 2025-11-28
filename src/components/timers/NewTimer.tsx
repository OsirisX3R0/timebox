import { useMemo, useState } from "react"
import db from "../../db"
import truncateTime from "../../utils/truncateTime"

interface Props {
  close?: () => void
}

const NewTimer = ({ close = () => {} }: Props) => {
  const [newTimer, setTimer] = useState('')

  const splitTimer = useMemo(() => {
    const fullTimer = newTimer.padStart(6, '0')
    return fullTimer.match(/.{1,2}/g) || []
  }, [newTimer])

  const formattedTimer = useMemo(() => {
    const [h, m, s] = splitTimer
    
    return `${h}h ${m}m ${s}s`
  }, [newTimer])

  const duration = useMemo(() => {
    const [h = '00', m = '00', s = '00'] = splitTimer
    return (+h * 3600) + (+m * 60) + +s
  }, [newTimer])

  const label = useMemo(() => {
    const segs = formattedTimer.split(' ')

    return truncateTime(segs, seg => seg.includes('00') )
      .map(seg => seg.charAt(0) === '0' ? seg.slice(1) : seg)
      .join(' ')
      .concat(' Timer')
  }, [newTimer])

  const updateTimer = (...vals: string[]) => {
    let timerLength = newTimer.length
    for(const val of vals) {
      if (timerLength === 6 || !timerLength && val.includes('0')) return

      timerLength++
      setTimer(prevTimer => prevTimer + val)
    }
  }
  const backspace = () => setTimer(prevTimer => prevTimer.slice(0, -1))
  const closeDialog = () => {
    setTimer('')
    close()
  }

  const createTimer = async () => {
    await db.timers.add({ label, duration, running: false })
    closeDialog()
  }

  return (
    <>
      <div className="new-timer">{formattedTimer}</div>
      <div className="enter-timer">
        <button className="rounded" onClick={() => updateTimer('1')}>1</button>
        <button className="rounded" onClick={() => updateTimer('2')}>2</button>
        <button className="rounded" onClick={() => updateTimer('3')}>3</button>
        <button className="rounded" onClick={() => updateTimer('4')}>4</button>
        <button className="rounded" onClick={() => updateTimer('5')}>5</button>
        <button className="rounded" onClick={() => updateTimer('6')}>6</button>
        <button className="rounded" onClick={() => updateTimer('7')}>7</button>
        <button className="rounded" onClick={() => updateTimer('8')}>8</button>
        <button className="rounded" onClick={() => updateTimer('9')}>9</button>
        <button className="rounded" onClick={() => updateTimer('0', '0')}>00</button>
        <button className="rounded" onClick={() => updateTimer('0')}>0</button>
        <button className="rounded" onClick={backspace}>⌫</button>
        <button className="rounded" onClick={closeDialog}>X</button>
        <button className="rounded" disabled={!duration} onClick={createTimer}>▶︎</button>
      </div>
    </>
  )
}

export default NewTimer