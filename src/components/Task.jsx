import { useTodoContext } from '../context/TodoListContext.jsx'

const Task = ({ item }) => {
  const { moveTaskToCompleted } = useTodoContext()

  const completeTask = () => {
    moveTaskToCompleted(item)
  }

  return (
    <li data-id={item.id} className='flex gap-3 justify-between bg-gray-300 w-4/5 rounded'>

      <div className='p-2 '>
        <h3 className='text-2xl font-bold'>{item.title}</h3>
        <p className='text-lg '>{item.description}</p>
      </div>
      {!item.completed &&
        <div className='flex items-center p-2'>
          <button onClick={completeTask} className='bg-green-700 text-white p-2 rounded'>Check</button>
        </div>}
    </li>
  )
}

export default Task
