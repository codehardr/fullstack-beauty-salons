import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const EditWorker = () => {
  const { id } = useParams()

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
      .put('/api/workers/edit/' + id, formData)
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
      .get('/api/workers/single/' + id)
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
      <h1>Edit Worker</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>First Name:</label>
          <input type="text" name="first_name" value={form.first_name} onChange={handleForm} />
        </div>
        <div>
          <label>Last Name:</label>
          <input type="text" name="last_name" value={form.last_name} onChange={handleForm} />
        </div>
        {form.photo && typeof form.photo === 'string' && (
          <div>
            <img src={form.photo} alt="" height="100" />
            <div>
              <button className="btn" onClick={e => setForm({ ...form, photo: '' })}>
                Remove
              </button>
            </div>
          </div>
        )}
        <div>
          <label>Photo:</label>
          <input className="btn" type="file" name="photo" onChange={handleForm} />
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

export default EditWorker
