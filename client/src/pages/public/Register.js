import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const Register = () => {
  const [form, setForm] = useState({})

  const { setAlert } = useContext(MainContext)

  const navigate = useNavigate()

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()

    axios
      .post('/api/users/register/', form)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        window.scrollTo(0, 0)
        setTimeout(() => navigate('/login'), 1500)
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }

  return (
    <>
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" onChange={handleForm} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" onChange={handleForm} />
        </div>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleForm} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleForm} />
        </div>
        <div>
          <input type="submit" className="btn" value="Register" />
        </div>
      </form>
    </>
  )
}

export default Register
