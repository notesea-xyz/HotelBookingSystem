import { createContext, useState, useEffect, useContext } from 'react'
import { loginUser, registerUser, logoutUser, getCurrentUser } from '@api/authApi'
import toast from 'react-hot-toast'

export const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('token')
      if (token) {
        const response = await getCurrentUser()
        // Extract user data and normalize the id field
        const userData = response.data || response
        setUser({
          ...userData,
          id: userData.id || userData._id
        })
        setIsAuthenticated(true)
      }
    } catch (error) {
      localStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (credentials) => {
    try {
      const data = await loginUser(credentials)
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success('Login successful!')
      return data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed')
      throw error
    }
  }

  const register = async (userData) => {
    try {
      const data = await registerUser(userData)
      localStorage.setItem('token', data.token)
      setUser(data.user)
      setIsAuthenticated(true)
      toast.success('Registration successful!')
      return data
    } catch (error) {
      toast.error(error.response?.data?.message || 'Registration failed')
      throw error
    }
  }

  const logout = async () => {
    try {
      await logoutUser()
      localStorage.removeItem('token')
      setUser(null)
      setIsAuthenticated(false)
      toast.success('Logged out successfully')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  const updateUser = (updatedData) => {
    setUser({ ...user, ...updatedData })
  }

  const value = {
    user,
    loading,
    isAuthenticated,
    login,
    register,
    logout,
    updateUser,
    checkAuth,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
