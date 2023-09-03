export const API = {
  // url: 'http://localhost:1235/user',
  // url: 'https://todo-list-le4v-dev.fl0.io/user',
  url: 'https://carmine-crayfish-fez.cyclic.cloud/user',

  // Registro

  async registerRequest (user) {
    try {
      const response = await fetch(`${this.url}/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return response
    } catch (error) {
      console.error('Error al registrar el usuario', error)
    }
  },

  // Login

  async loginRequest (user) {
    try {
      const response = await fetch(`${this.url}/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(user)
      })
      return response
    } catch (error) {
      console.error('Error al logear el usuario', error)
    }
  },

  async verifyTokenRequest (token) {
    try {
      const response = await fetch(`${this.url}/verify-token`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Cookie: `token=${token}`
        },
        credentials: 'include'
      })
      console.log(response)
      if (response.ok) {
        return response
      }
    } catch (error) {
      console.error('Error al verificar el token')
    }
  }
}
