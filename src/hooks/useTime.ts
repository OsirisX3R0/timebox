import { useEffect, useState } from "react"
import truncateTime from "../utils/truncateTime"

const useTime = (duration: number) => {
  const [hours, setHours] = useState(0)
  const [minutes, setMinutes] = useState(0)
  const [seconds, setSeconds] = useState(0)

  useEffect(() => {
    let seconds = duration
    const hours = Math.floor(duration / 3600)
    seconds -= (hours * 3600)
    const minutes = Math.floor(seconds / 60)
    seconds -= (minutes * 60)
    setHours(hours)
    setMinutes(minutes)
    setSeconds(seconds)
  }, [duration])
  
  return truncateTime([hours, minutes, seconds], seg => seg === 0)
    .map(seg => `${+seg < 10 ? `0${seg}` : seg}`)
    .join(':')

  //`${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`
}

export default useTime