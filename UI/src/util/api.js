export const API = {
  url: 'https://todo-list-le4v-dev.fl0.io/tasks',

  // GET
  async getTasks () {
    try {
      const response = await fetch(this.url)
      if (response.ok) {
        const tasks = await response.json()
        return tasks
      } else {
        console.error('Error al cargar las tareas.')
      }
    } catch (error) {
      console.error('Error al obtener las tareas', error)
    }
  },

  // POST
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

  // PATCH
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
      console.error('Error al completar la tarea: ', error)
    }
  },

  async deleteTask (task, setCompletedTasks, completedTasks) {
    try {
      const response = await fetch(`${this.url}/${task._id}`, {
        method: 'DELETE'
      })

      if (response.ok) {
        const index = completedTasks.findIndex(t => t._id === task._id)
        if (index !== -1) {
          const newCompletedTasks = completedTasks.filter(t => t._id !== task._id)
          setCompletedTasks(newCompletedTasks)
        }
      }
    } catch (error) {
      console.error('Error al eliminar la tarea: ', error)
    }
  }

}
