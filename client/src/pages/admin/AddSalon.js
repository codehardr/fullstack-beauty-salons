import { useState, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const AddSalon = () => {
  const navigate = useNavigate()

  const { setAlert } = useContext(MainContext)

  const [form, setForm] = useState({
    name: '',
    address: '',
    phone: '',
  })

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('/api/salons/new', form)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        navigate('/admin')
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  return (
    <>
      <h1>Add Salon</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleForm} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" onChange={handleForm} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" onChange={handleForm} />
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </>
  )
}

export default AddSalon
