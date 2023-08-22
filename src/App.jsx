import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/home'
import TaskRecord from './pages/TaskRecord.jsx'

function App () {
  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/historial' element={<TaskRecord />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
