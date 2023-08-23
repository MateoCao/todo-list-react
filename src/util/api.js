export const API = {
  url: 'http://localhost:1235/tasks',

  // GET
  async getTasks (setTodoList) {
    try {
      const response = await fetch(this.url)
      if (response.ok) {
        const tasks = await response.json()
        setTodoList(tasks.filter(task => !task.completed))
      } else {
        console.error('Error al cargar las tareas.')
      }
    } catch (error) {
      console.error('Error al obtener las tareas', error)
    }
  },

  async sendTask (entry, todoList, setTodoList, e) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(entry)
      })

      if (response.ok) {
        const res = await response.json()
        console.log(res._id)
        entry._id = res._id
        const newTodoList = [...todoList, entry]
        setTodoList(newTodoList)
        e.target.reset()
      } else {
        console.error('Error al crear la tarea')
      }
    } catch (error) {
      console.error('Error al cargar tarea')
    }
  },

  async updateCompletedTasks (todoList, setTodoList, completedTasks, setCompletedTasks, task) {
    try {
      setTodoList(todoList.filter(item => item._id !== task._id))
      task.completed = true

      const response = await fetch(`${this.url}/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(task)
      })

      if (response.ok) {
        const newCompletedTasks = [...completedTasks, task]
        setCompletedTasks(newCompletedTasks)
      } else {
        console.error('Error al completar la tarea')
      }
    } catch (error) {
      console.error('Error al completar la tarea:', error)
    }
  }

}
