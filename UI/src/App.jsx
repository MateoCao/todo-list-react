import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { AuthProvider } from './context/AuthContext.jsx'
import { TodoProvider } from './context/TodoListContext.jsx'

import HomePage from './pages/HomePage.jsx'
import Taskspage from './pages/TasksPage.jsx'
import TaskRecordPage from './pages/TaskRecordPage.jsx.jsx'
import Navbar from './components/Navbar.jsx'
import RegisterPage from './pages/RegisterPage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import ProtectedRoute from './ProtectedRoute.jsx'

function App () {
  return (
    <AuthProvider>
      <TodoProvider>
        <Router>
          <Navbar />
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/register' element={<RegisterPage />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/tasks' element={<Taskspage />} />
              <Route path='/historial' element={<TaskRecordPage />} />
            </Route>
          </Routes>
        </Router>
      </TodoProvider>
    </AuthProvider>
  )
}

export default App
