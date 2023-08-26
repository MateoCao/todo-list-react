import { useEffect, useState } from 'react'
import { useTodoContext } from '../context/TodoListContext.jsx'
import { useTimer } from '../hooks/useTimer.jsx'
import { API } from '../util/api.js'
import CountdownTimer from './Timer.jsx'

const Task = ({ item }) => {
  const { moveTaskToCompleted, deleteTask } = useTodoContext()
  const { totalSeconds, setSelectedDate, handleStartCountdown, selectedDate, setTotalSeconds } = useTimer()
  const [isExpired, setIsExpired] = useState(false)

  useEffect(() => {
    setSelectedDate(item.date)
    handleStartCountdown()
  }, [selectedDate])

  useEffect(() => {
    if (totalSeconds === 0 || item.expired) {
      setIsExpired(true)
      setTotalSeconds(0)
      API.updateExpiredTasks(item)
      item.expired = true
    }
  }, [totalSeconds])

  return (
    <li data-id={item.id} className={`flex gap-3 justify-between w-4/5 rounded ${!isExpired ? 'bg-gray-300' : 'bg-red-600 text-white font-bold'}`}>

      <div className='p-2 '>
        <h3 className='text-2xl font-bold'>{item.title}</h3>
        <p className='text-lg '>{item.description}</p>
        {item.completed
          ? <div>{item.date}</div>
          : (totalSeconds > 0 && !isExpired
              ? <CountdownTimer totalSeconds={totalSeconds} />
              : <div>TAREA VENCIDA</div>)}

      </div>

      {!item.completed
        ? <div className='flex items-center p-2'>
          <button onClick={() => moveTaskToCompleted(item)} className={`${!isExpired ? 'bg-green-700' : 'bg-red-700'} text-white p-2 rounded`}>{!isExpired ? 'Check' : 'Mover a historial'}</button>
          </div>

        : <div className='flex items-center p-2'>
          <button onClick={() => deleteTask(item)} className='bg-red-700 text-white p-2 rounded'>Eliminar</button>
          </div>}
    </li>
  )
}

export default Task
