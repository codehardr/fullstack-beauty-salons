import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const AddWorker = () => {
  const navigate = useNavigate()

  const { setAlert } = useContext(MainContext)

  const [form, setForm] = useState({
    first_name: '',
    last_name: '',
    photo: '',
    salonId: '',
  })

  const [salons, setSalons] = useState([])

  const handleForm = e =>
    setForm({
      ...form,
      [e.target.name]: e.target.name === 'photo' ? e.target.files[0] : e.target.value,
    })

  const handleSubmit = e => {
    e.preventDefault()

    const formData = new FormData()
    for (const key in form) formData.append(key, form[key])

    axios
      .post('/api/workers/new', formData)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        navigate('/admin/workers')
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
      <h1>Add Worker</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" onChange={handleForm} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" onChange={handleForm} />
        </div>
        <div>
          <label>Photo:</label>
          <input type="file" name="photo" onChange={handleForm} />
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

export default AddWorker
