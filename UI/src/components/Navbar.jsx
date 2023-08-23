import { Link } from 'react-router-dom'

const Navbar = () => {
  return (
    <header className='bg-slate-900 text-white py-1'>
      <nav className='w-11/12 mx-auto'>
        <ul className='flex gap-6 text-2xl'>
          <li>
            <Link to='/'>Home</Link>
          </li>
          <li>
            <Link to='/historial'>Historial</Link>
          </li>
        </ul>
      </nav>
    </header>
  )
}

export default Navbar
