import { useEffect, useState } from "react"
import truncateTime from "../utils/truncateTime"

const useTime = (
  duration: number, 
  allowZero: boolean = false, 
  excludeHours: boolean = false,
  secondsPlaces?: number
) => {
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

  let values = allowZero 
    ? [...(excludeHours ? [] : [hours]), minutes, seconds]
    : truncateTime([...(excludeHours ? [] : [hours]), minutes, seconds], seg => seg === 0)
  
  return values
    .map((seg, i) => {
      // let segment = seg
      // if (i === 2 && secondsPlaces) segment = seg.toFixed(secondsPlaces)
      return `${+seg < 10 ? `0${i === values.length - 1 && secondsPlaces ? seg.toFixed(secondsPlaces) : seg}` : i === values.length - 1 && secondsPlaces ? seg.toFixed(secondsPlaces) : seg}`
    })
    .join(':')
}

export default useTime