import { Link } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

const Navbar = () => {
  const { isAuthenticated, logout, user } = useAuth()
  return (
    <header className='bg-slate-900 text-white py-1'>
      <nav className='w-11/12 mx-auto'>
        <ul className='flex gap-6 text-2xl'>
          {isAuthenticated
            ? <>
              <li>
                Bienvenido {user.username}
              </li>
              <li>
                <Link to='/tasks'>Tasks</Link>
              </li>
              <li>
                <Link to='/historial'>Historial</Link>
              </li>
              <li>
                <Link onClick={() => logout()} to='/'>Logout</Link>
              </li>
            </>
            : <>
              <li>
                <Link to='/login'>Login</Link>
              </li>
              <li>
                <Link to='/register'>Register</Link>
              </li>
            </>}

        </ul>
      </nav>
    </header>
  )
}

export default Navbar
