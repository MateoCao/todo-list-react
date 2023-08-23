import { useTodoContext } from '../context/TodoListContext'
import { API } from '../util/api'
import { useEffect } from 'react'
import Task from '../components/Task'

const TaskRecord = () => {
  const { completedTasks, setCompletedTasks } = useTodoContext()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await API.getTasks()
        setCompletedTasks(tasks.filter(task => task.completed))
      } catch (error) {
        console.error('Error al cargar las tareas:', error)
      }
    }

    fetchTasks()
  }, [])
  return (
    <section className='flex flex-col gap-10 bg-gray-800 min-h-[100vh]'>
      <h3 className='text-white text-3xl font-bold mb-3'>SECCION COMPLETADAS</h3>
      <ul className='flex flex-col gap-4 ml-3 mt-3'>
        {completedTasks.map((completedTask, id) => (
          <Task item={completedTask} key={id} />
        ))}
      </ul>
    </section>
  )
}

export default TaskRecord
