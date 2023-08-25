import { useState, useEffect } from 'react'

export function useTimer () {
  const [selectedDate, setSelectedDate] = useState('')
  const [countdownStarted, setCountdownStarted] = useState(true)
  const [totalSeconds, setTotalSeconds] = useState(1)

  const handleStartCountdown = () => {
    const now = new Date()
    const selectedDateTime = new Date(selectedDate)
    const timeDiffInSeconds = Math.floor(
      (selectedDateTime - now) / 1000
    )
    if (timeDiffInSeconds > 0) {
      setCountdownStarted(true)
      setTotalSeconds(timeDiffInSeconds)
    } else {
      setCountdownStarted(false)
    }
  }

  useEffect(() => {
    let interval

    if (countdownStarted && totalSeconds > 0) {
      interval = setInterval(() => {
        setTotalSeconds(prevTotalSeconds => prevTotalSeconds - 1)
      }, 1000)
    }

    if (!countdownStarted || totalSeconds === 0) {
      clearInterval(interval)
    }

    return () => clearInterval(interval)
  }, [countdownStarted, totalSeconds])

  return { totalSeconds, setSelectedDate, handleStartCountdown, selectedDate, setTotalSeconds }
}
