import { createContext, useContext, useState } from 'react'
import { API } from '../util/api'

const TodoContext = createContext()

export const useTodoContext = () => {
  return useContext(TodoContext)
}

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const moveTaskToCompleted = async (task) => {
    API.updateCompletedTasks(todoList, setTodoList, completedTasks, setCompletedTasks, task)
  }

  return (
    <TodoContext.Provider value={{ todoList, completedTasks, moveTaskToCompleted, setTodoList }}>
      {children}
    </TodoContext.Provider>
  )
}
