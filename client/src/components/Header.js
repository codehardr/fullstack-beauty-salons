import { useContext } from 'react'
import { Link } from 'react-router-dom'
import MainContext from '../context/MainContext'

const Header = () => {
  const { userInfo } = useContext(MainContext)

  return (
    <header>
      <p className="logo">
        <span>N</span>eon<span>B</span>angs<span>'96</span>
      </p>
      <nav>
        <span>Public:</span>
        <ul>
          <li>
            <Link to="/">Salons</Link>
          </li>
          <li>
            <Link to="/workers">Workers</Link>
          </li>
          <li>
            <Link to="/orders">Orders</Link>
          </li>
        </ul>
        <span>Admin:</span>
        <ul>
          <li>
            <Link to="/admin/salons">Salons</Link>
          </li>
          <li>
            <Link to="/admin/services">Services</Link>
          </li>
          <li>
            <Link to="/admin/workers">Workers</Link>
          </li>
          <li>
            <Link to="/admin/orders">Orders</Link>
          </li>
        </ul>
        <div>
          <Link to="/register" className="head-btn">
            Register
          </Link>
          <Link to="/login" className="head-btn">
            Login
          </Link>
          <button>Logout</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
