import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const Login = () => {
  const { setAlert, setUserInfo } = useContext(MainContext)

  const [form, setForm] = useState({ email: '', password: '' })

  const navigate = useNavigate()

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('/api/users/login/', form)
      .then(resp => {
        console.log(resp)
        setUserInfo(resp.data.user)
        setAlert({ msg: resp.data.message, status: 'success' })
        setTimeout(() => {
          if (resp.data.user.role === 1) navigate('/admin')
          navigate('/')
        }, 1500)
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }

  return (
    <>
      <h1>Prisijungimas</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Email:</label>
          <input type="email" name="email" onChange={handleForm} />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" name="password" onChange={handleForm} />
        </div>
        <div>
          <input type="submit" className="btn" />
        </div>
      </form>
    </>
  )
}

export default Login
