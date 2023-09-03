import { createContext, useState, useContext, useEffect } from 'react'
import { API } from '../util/apiAuth'
import Cookies from 'js-cookie'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used  within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [errors, setErrors] = useState(null)
  const [loading, setLoading] = useState(true)

  // Registro

  const signUp = async (user) => {
    try {
      const res = await API.registerRequest(user)
      const data = await res.json()
      console.log(data)
      if (res.ok) {
        setUser(data)
        setIsAuthenticated(true)
      } else {
        setErrors(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  // Login

  const signIn = async (user) => {
    try {
      const res = await API.loginRequest(user)
      const data = await res.json()

      const cookies = Cookies.get()
      console.log(cookies.token)
      Cookies.set('token', cookies.token)
      console.log(cookies)

      setTimeout(() => {
        const cookies = Cookies.get('token')
        console.log(cookies.token)
      }, 1000)

      console.log(data)
      if (res.ok) {
        setUser(data)
        setIsAuthenticated(true)
      } else {
        setErrors(data)
      }
    } catch (error) {
      console.log(error)
    }
  }

  const logout = async () => {
    Cookies.remove('token')
    setIsAuthenticated(false)
    setUser(null)
  }

  useEffect(() => {
    if (errors !== null) {
      const timer = setTimeout(() => {
        setErrors(null)
      }, 4000)
      return () => clearTimeout(timer)
    }
  }, [errors])

  useEffect(() => {
    const checkLogin = async () => {
      const cookies = Cookies.get()

      if (!cookies.token) {
        setIsAuthenticated(false)
        setLoading(false)
        return setUser(null)
      }
      try {
        const res = await API.verifyTokenRequest(cookies.token)
        const data = await res.json()

        if (!res.ok) {
          setIsAuthenticated(false)
          setLoading(false)
          return
        }

        setIsAuthenticated(true)
        setUser(data)
        setLoading(false)
      } catch (error) {
        setIsAuthenticated(false)
        setUser(null)
        setLoading(false)
      }
    }

    checkLogin()
  }, [])

  return (
    <AuthContext.Provider value={{
      signUp,
      signIn,
      logout,
      user,
      isAuthenticated,
      errors,
      loading
    }}
    >
      {children}
    </AuthContext.Provider>
  )
}
