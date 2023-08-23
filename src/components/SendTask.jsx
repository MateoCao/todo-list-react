import { useTodoContext } from '../context/TodoListContext'
import { API } from '../util/api'

const SendTask = () => {
  const { todoList, setTodoList } = useTodoContext()

  const sendItem = async (e) => {
    e.preventDefault()
    const formData = new FormData(e.target)
    const entry = {
      title: formData.get('title'),
      description: formData.get('description'),
      completed: false
    }
    API.sendTask(entry, todoList, setTodoList, e)
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
