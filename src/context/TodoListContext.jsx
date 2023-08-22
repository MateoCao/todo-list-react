import { createContext, useContext, useState } from 'react'

const TodoContext = createContext()

export const useTodoContext = () => {
  return useContext(TodoContext)
}

export const TodoProvider = ({ children }) => {
  const [todoList, setTodoList] = useState([])
  const [completedTasks, setCompletedTasks] = useState([])

  const moveTaskToCompleted = (task) => {
    setTodoList(todoList.filter(item => item.id !== task.id))
    task.id = completedTasks.length > 0 ? completedTasks[completedTasks.length - 1].id + 1 : 1
    task.completed = true
    const newCompletedTasks = [...completedTasks, task]
    setCompletedTasks(newCompletedTasks)
  }

  return (
    <TodoContext.Provider value={{ todoList, completedTasks, moveTaskToCompleted, setTodoList }}>
      {children}
    </TodoContext.Provider>
  )
}
