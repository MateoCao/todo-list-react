import { useEffect } from 'react'

import SendTask from '../components/SendTask.jsx'
import Task from '../components/Task.jsx'
import { useTodoContext } from '../context/TodoListContext.jsx'
import { useAuth } from '../context/AuthContext.jsx'

function Taskspage () {
  const { todoList, setTodoList, getTasks } = useTodoContext()
  const { user } = useAuth()

  useEffect(() => {
    const fetchTasks = async () => {
      const tasks = await getTasks(false)
      setTodoList(tasks)
    }
    fetchTasks()
  }, [])

  return (
    <section className='flex flex-col gap-10 bg-gray-800 min-h-[100vh]'>
      <h3 className='text-white text-xl'>Hola {user.username}, estas son tus tareas</h3>
      <ul className='flex flex-col gap-4 ml-3 mt-3'>
        {todoList.map((task, index) => (
          <Task item={task} key={index} />
        ))}
      </ul>
      <SendTask />
    </section>
  )
}

export default Taskspage
