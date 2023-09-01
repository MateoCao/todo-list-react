import { useState, useEffect } from 'react'

export function useTimer () {
  // Contiene la fecha seleccionada
  const [selectedDate, setSelectedDate] = useState('')
  // Si el contador llega a 0, es false
  const [countdownStarted, setCountdownStarted] = useState(true)
  // La cantidad de segundos que faltan para que termine el contador
  const [totalSeconds, setTotalSeconds] = useState(1)

  // Comienza el timer

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
