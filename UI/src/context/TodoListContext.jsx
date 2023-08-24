import { createContext, useContext, useState } from 'react'
import { API } from '../util/api'

const TodoContext = createContext()

export const useTodoContext = () => {
  return useContext(TodoContext)
}

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const getTasks = async (bool) => {
    try {
      const tasks = await API.getTasks()
      const filteredTasks = tasks.filter(task => task.completed === bool)
      return filteredTasks
    } catch (error) {
      console.error('Error al cargar las tareas:', error)
    }
  }

  const sendTask = async (task, e) => {
    const response = await API.sendTask(task)
    if (response.ok) {
      const data = await response.json()
      task._id = data._id
      const newTodoList = [...todoList, task]
      setTodoList(newTodoList)
      e.target.reset()
    } else {
      console.error('Error al crear la tarea')
    }
  }

  const moveTaskToCompleted = async (task) => {
    const response = await API.updateCompletedTasks(task)
    if (response.ok) {
      setTodoList(todoList.filter(item => item._id !== task._id))
    } else {
      console.error('Error al completar la tarea')
    }
  }

  const deleteTask = async (task) => {
    const response = await API.deleteTask(task)
    if (response.ok) {
      const index = completedTasks.findIndex(t => t._id === task._id)
      if (index !== -1) {
        const newCompletedTasks = completedTasks.filter(t => t._id !== task._id)
        setCompletedTasks(newCompletedTasks)
      }
    }
  }

  return (
    <TodoContext.Provider value={{ todoList, completedTasks, moveTaskToCompleted, setTodoList, getTasks, sendTask, setCompletedTasks, deleteTask }}>
      {children}
    </TodoContext.Provider>
  )
}
