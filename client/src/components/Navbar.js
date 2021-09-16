import React from 'react'
import { Link } from 'react-router-dom'
import { useGlobalContext } from '../context'

const Navbar = () => {
  const { logout, isAdmin } = useGlobalContext()

  return (
    <nav className='navbar navbar-expand-sm navbar-dark bg-dark d-flex justify-content-around'>
      <div className='navbar-brand'>
        <h1 className='fw-bold'>BLOGSHOTS</h1>
        <i className='fas fa-glass-whiskey'></i>
      </div>

      <ul className='navbar-nav'>
        <li className='nav-item'>
          <Link to='/' className='nav-link'>
            Home
          </Link>
        </li>

        <li className='nav-item'>
          <Link to='/about' className='nav-link'>
            About
          </Link>
        </li>

        {isAdmin && (
          <li className='nav-item'>
            <Link to='/' className='nav-link' onClick={logout}>
              Logout
            </Link>
          </li>
        )}
        {isAdmin && (
          <li className='nav-item'>
            <Link to='/newblog' className='nav-link'>
              New
            </Link>
          </li>
        )}
      </ul>
    </nav>
  )
}

export default Navbar
