import { useEffect, useRef, useState } from "react"

const useTimer = (duration: number): [number, () => void, (amt: number) => void, () => void, () => void] => {
  const defaultDuration = useRef(duration)
  const [timeLeft, setTimeLeft] = useState(duration)
  const timer = useRef<number>(undefined)

  const startTimer = () => {
    timer.current = setInterval(() => {
      setTimeLeft(prevTimeLeft => prevTimeLeft -= 1)
    }, 1000)
  }

  useEffect(() => {
    if (!timeLeft) {
      clearInterval(timer.current)
    }
  }, [timeLeft])

  const addToTimer = (amt: number) => {
    setTimeLeft(prevTimeLeft => prevTimeLeft + amt)
  }

  const pauseTimer = () => {
    clearInterval(timer.current)    
  }

  const stopTimer = () => {
    clearInterval(timer.current)
    setTimeLeft(defaultDuration.current)
  }

  return [
    timeLeft, 
    startTimer,
    addToTimer, 
    pauseTimer, 
    stopTimer
  ]
}

export default useTimer