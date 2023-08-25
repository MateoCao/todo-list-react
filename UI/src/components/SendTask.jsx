import { useTodoContext } from '../context/TodoListContext.jsx'
import { useState } from 'react'
const SendTask = () => {
  const [selectedDate, setSelectedDate] = useState('')
  const { sendTask } = useTodoContext()

  const date = new Date()

  const sendItem = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const task = {
      title: formData.get('title'),
      description: formData.get('description'),
      completed: false,
      date: formData.get('date'),
      expired: false
    }
    sendTask(task, e)
  }

  return (
    <div className='ml-3'>
      <form onSubmit={sendItem} className='flex flex-col w-1/5 gap-2'>
        <input className='outline-none p-2 rounded' name='title' placeholder='Titulo / mínimo 5 caracteres' />
        <textarea className='resize-none outline-none p-2 rounded' name='description' placeholder='Descripción / mínimo 10 caracteres' />
        <label>Select a Date:</label>
        <input
          name='date'
          type='datetime-local'
          value={selectedDate}
          min={date}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <button className='bg-gray-600 text-white rounded w-1/3' type='submit'>Crear tarea</button>
      </form>
    </div>
  )
}

export default SendTask
