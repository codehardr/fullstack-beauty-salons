import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const EditSalon = () => {
  const { id } = useParams()

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
      .put('/api/salons/edit/' + id, form)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        navigate('/admin/salons')
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/salons/single/' + id)
      .then(resp => setForm(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [id, setAlert])

  return (
    <>
      <h1>Edit Salon</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={form.name} onChange={handleForm} />
        </div>
        <div>
          <label>Address:</label>
          <input type="text" name="address" value={form.address} onChange={handleForm} />
        </div>
        <div>
          <label>Phone:</label>
          <input type="text" name="phone" value={form.phone} onChange={handleForm} />
        </div>
        <div>
          <input type="submit" value="Update" />
        </div>
      </form>
    </>
  )
}

export default EditSalon
