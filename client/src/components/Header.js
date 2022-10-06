import { Link } from 'react-router-dom'

const Header = () => {
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
          <button>Login</button>
          <button>Register</button>
        </div>
      </nav>
    </header>
  )
}

export default Header
