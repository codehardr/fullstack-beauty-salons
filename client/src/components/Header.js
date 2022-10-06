import { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../context/MainContext'

const Header = () => {
  const navigate = useNavigate()

  const { setAlert, userInfo, setUserInfo } = useContext(MainContext)

  const handleLogout = () => {
    axios.get('/api/users/logout/').then(resp => {
      setUserInfo({})
      setAlert({ msg: resp.data, status: 'success' })
      navigate('/')
    })
  }

  return (
    <header>
      <p className="logo">
        <span>N</span>eon<span>B</span>angs<span>'96</span>
      </p>
      <nav>
        {userInfo.role === 1 && <span>Public:</span>}
        <ul>
          <li>
            <Link to="/">Salons</Link>
          </li>
          <li>
            <Link to="/workers">Workers</Link>
          </li>
          {userInfo.id && (
            <li>
              <Link to="/orders">Orders</Link>
            </li>
          )}
        </ul>
        {userInfo.role === 1 && (
          <>
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
          </>
        )}
        <div>
          {userInfo.id ? (
            <button onClick={handleLogout}>Logout</button>
          ) : (
            <>
              <Link to="/register" className="head-btn">
                Register
              </Link>
              <Link to="/login" className="head-btn">
                Login
              </Link>
            </>
          )}
        </div>
      </nav>
    </header>
  )
}

export default Header
