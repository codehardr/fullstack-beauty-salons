import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const EditService = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { setAlert } = useContext(MainContext)

  const [form, setForm] = useState({
    name: '',
    duration: '',
    price: '',
    salonId: '',
  })

  const [salons, setSalons] = useState([])

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .put('/api/services/edit/' + id, form)
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
      .get('/api/services/single/' + id)
      .then(resp => setForm(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [id, setAlert])

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
      <h1>Edit Service</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleForm} />
        </div>
        <div>
          <label>Duration:</label>
          <input type="text" name="duration" value={form.duration} onChange={handleForm} />
        </div>
        <div>
          <label>Price:</label>
          <input type="text" name="price" value={form.price} onChange={handleForm} />
        </div>
        <div>
          <label>Salon:</label>
          <select name="salonId" onChange={handleForm} value={form.salonId ? form.salonId : ''}>
            {salons.map(salon => (
              <option key={salon.id} value={salon.id}>
                {salon.name}
              </option>
            ))}
          </select>
        </div>
        <div>
          <input type="submit" value="Update" />
        </div>
      </form>
    </>
  )
}

export default EditService
