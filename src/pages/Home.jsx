import SendTask from '../components/SendTask.jsx'
import Task from '../components/Task'
import { useTodoContext } from '../context/TodoListContext.jsx'

function Home () {
  const { todoList, completedTasks } = useTodoContext()

  return (
    <section className='flex flex-col gap-10 bg-gray-800 min-h-[100vh]'>
      <ul className='flex flex-col gap-4 ml-3 mt-3'>
        {todoList.map((item, index) => (
          <Task todoList={todoList} item={item} key={index} />
        ))}
      </ul>
      <SendTask />
      <div>
        <h3 className='text-white text-3xl font-bold mb-3'>SECCION COMPLETADAS</h3>
        <ul className='flex flex-col gap-4 ml-3 mt-3'>
          {completedTasks.map((completedTask, id) => (
            <Task item={completedTask} key={id} />
          ))}
        </ul>

      </div>
    </section>
  )
}

export default Home
