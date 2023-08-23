import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Home from './pages/Home.jsx'
import TaskRecord from './pages/TaskRecord.jsx'
import Navbar from './components/Navbar.jsx'

function App () {
  return (
    <>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/historial' element={<TaskRecord />} />
        </Routes>
      </Router>
    </>
  )
}

export default App
