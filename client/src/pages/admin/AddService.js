import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const AddService = () => {
  const navigate = useNavigate()

  const { setAlert } = useContext(MainContext)

  const [form, setForm] = useState({
    name: '',
    duration: '',
    price: '',
  })

  const [salons, setSalons] = useState([])

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .post('/api/services/new', form)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        navigate('/admin/services')
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/salons/')
      .then(resp => setSalons(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [setAlert])

  return (
    <>
      <h1>Add Service</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" onChange={handleForm} />
        </div>
        <div>
          <label>Duration:</label>
          <input type="text" name="duration" onChange={handleForm} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" onChange={handleForm} />
        </div>
        <div>
          <label>Salon:</label>
          <select name="salonId" onChange={handleForm} required>
            <option value="">Select Salon</option>
            {salons.map(salon => (
              <option key={salon.id} value={salon.id}>
                {salon.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type="submit" value="Add" />
        </div>
      </form>
    </>
  )
}

export default AddService
