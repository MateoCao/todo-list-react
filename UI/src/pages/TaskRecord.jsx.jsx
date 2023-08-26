import { useTodoContext } from '../context/TodoListContext'
import { useEffect } from 'react'
import Task from '../components/Task'

const TaskRecord = () => {
  const { completedTasks, setCompletedTasks, getTasks, expiredTasks, setExpiredTasks } = useTodoContext()

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks(true)
      setCompletedTasks(tasks.filter(task => !task.expired))
      setExpiredTasks(tasks.filter(task => task.expired))
    }
    fetchTasks()
  }, [])

  return (
    <section className='flex flex-col gap-10 bg-gray-800 min-h-[100vh]'>
      <h3 className='text-white text-3xl font-bold mb-3'>SECCION COMPLETADAS</h3>
      <ul className='flex flex-col gap-4 ml-3 mt-3'>
        {completedTasks?.map((completedTask, id) => (
          <Task item={completedTask} key={id} />
        ))}
      </ul>
      <h3 className='text-white text-3xl font-bold mb-3'>SECCION EXPIRADAS</h3>
      <ul className='flex flex-col gap-4 ml-3 mt-3'>
        {expiredTasks?.map((expiredTask, id) => (
          <Task item={expiredTask} key={id} />
        ))}
      </ul>
    </section>
  )
}

export default TaskRecord
