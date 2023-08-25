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
  async sendTask (task) {
    try {
      const response = await fetch(this.url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(task)
      })
      return response
    } catch (error) {
      console.error('Error al cargar tarea')
    }
  },

  // PATCH
  async updateCompletedTasks (task) {
    try {
      const response = await fetch(`${this.url}/${task._id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          completed: true
        })
      })
      return response
    } catch (error) {
      console.error('Error al completar la tarea: ', error)
    }
  },

  async deleteTask (task) {
    try {
      const response = await fetch(`${this.url}/${task._id}`, {
        method: 'DELETE'
      })
      return response
    } catch (error) {
      console.error('Error al eliminar la tarea: ', error)
    }
  }

}
