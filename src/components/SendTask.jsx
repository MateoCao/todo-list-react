import { useTodoContext } from '../context/TodoListContext'

const SendTask = () => {
  const { todoList, setTodoList } = useTodoContext()

  const sendItem = (e) => {
    e.preventDefault()
    const entry = Object.fromEntries(new window.FormData(e.target))
    entry.id = todoList.length > 0 ? todoList[todoList.length - 1].id + 1 : 1
    entry.completed = false
    const newTodoList = [...todoList, entry]
    setTodoList(newTodoList)
  }

  return (
    <div className='ml-3'>
      <form onSubmit={sendItem} className='flex flex-col w-1/5 gap-2'>
        <input className='outline-none p-2 rounded' name='title' placeholder='Titulo' />
        <textarea className='resize-none outline-none p-2 rounded' name='description' placeholder='Task' />
        <button className='bg-gray-600 text-white rounded w-1/3' type='submit'>Crear tarea</button>
      </form>
    </div>
  )
}

export default SendTask
