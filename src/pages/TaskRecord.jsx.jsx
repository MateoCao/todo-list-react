import { useTodoContext } from '../context/TodoListContext'

const TaskRecord = () => {
  const { completedTasks } = useTodoContext()
  console.log(completedTasks)
  return (
    <section>
      {completedTasks.map((completedTask, index) => (
        <div key={index}>
          <h3>{completedTask.title}</h3>
          <p>{completedTask.description}</p>
        </div>
      ))}
    </section>
  )
}

export default TaskRecord
