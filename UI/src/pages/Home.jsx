import { useEffect } from 'react'
import { API } from '../util/api.js'

import SendTask from '../components/SendTask.jsx'
import Task from '../components/Task'
import { useTodoContext } from '../context/TodoListContext.jsx'

function Home () {
  const { todoList, setTodoList } = useTodoContext()

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const tasks = await API.getTasks()
        setTodoList(tasks.filter(task => !task.completed))
      } catch (error) {
        console.error('Error al cargar las tareas:', error)
      }
    }

    fetchTasks()
  }, [])

  return (
    <section className='flex flex-col gap-10 bg-gray-800 min-h-[100vh]'>
      <ul className='flex flex-col gap-4 ml-3 mt-3'>
        {todoList.map((task, index) => (
          <Task item={task} key={index} />
        ))}
      </ul>
      <SendTask />
    </section>
  )
}

export default Home
