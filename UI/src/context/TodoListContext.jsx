import { createContext, useContext, useState } from 'react'
import { API } from '../util/apiTasks'
import Cookies from 'js-cookie'

const TodoContext = createContext()

export const useTodoContext = () => {
  return useContext(TodoContext)
}

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])
  const [expiredTasks, setExpiredTasks] = useState()

  // Obtener tareas

  const getTasks = async (bool) => {
    const cookies = Cookies.get()
    try {
      const tasks = await API.getTasks(cookies.token)
      const filteredTasks = tasks.filter(task => task.completed === bool)
      return filteredTasks
    } catch (error) {
      console.error('Error al cargar las tareas:', error)
    }
  }

  // Crear una tarea

  const sendTask = async (task, e) => {
    const response = await API.sendTask(task)
    if (response.ok) {
      const data = await response.json()
      console.log(data)
      task._id = data._id
      const newTodoList = [...todoList, task]
      setTodoList(newTodoList)
      e.target.reset()
    } else {
      console.error('Error al crear la tarea')
    }
  }

  // Completar una tarea

  const moveTaskToCompleted = async (task) => {
    const response = await API.updateCompletedTasks(task)
    if (response.ok) {
      const newTodoList = todoList.filter(item => item._id !== task._id)
      setTodoList(newTodoList)
    } else {
      console.error('Error al completar la tarea')
    }
  }

  // Eliminar una tarea

  const deleteTask = async (task) => {
    const response = await API.deleteTask(task)
    if (response.ok) {
      // Validación para actualizar el array de tareas correcto.
      if (task.expired) {
        const index = expiredTasks.findIndex(t => t._id === task._id)
        if (index !== -1) {
          const newExpiredTasks = expiredTasks.filter(t => t._id !== task._id)
          setExpiredTasks(newExpiredTasks)
        }
      } else {
        const index = completedTasks.findIndex(t => t._id === task._id)
        if (index !== -1) {
          const newCompletedTasks = completedTasks.filter(t => t._id !== task._id)
          setCompletedTasks(newCompletedTasks)
        }
      }
    }
  }

  return (
    <TodoContext.Provider value={{
      todoList,
      completedTasks,
      expiredTasks,
      moveTaskToCompleted,
      setTodoList,
      getTasks,
      sendTask,
      setCompletedTasks,
      deleteTask,
      setExpiredTasks
    }}
    >
      {children}
    </TodoContext.Provider>
  )
}
