import { useState, useEffect, useContext } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const EditOrder = () => {
  const { id } = useParams()

  const navigate = useNavigate()

  const { setAlert } = useContext(MainContext)

  const [form, setForm] = useState({
    order_date: '',
    status: '',
  })

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    axios
      .put('/api/orders/edit/' + id, form)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        navigate('/admin/orders')
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/orders/single/' + id)
      .then(resp => {
        resp.data.order_date = new Date(resp.data.order_date).toLocaleString('lt-LT')
        resp.data.status = resp.data.status ? '1' : '0'
        setForm(resp.data)
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [id, setAlert])

  return (
    <>
      <h1>Edit Order</h1>
      <form onSubmit={e => handleSubmit(e)}>
        <div>
          <label>Order Date:</label>
          <input
            type="datetime-local"
            name="order_date"
            value={form.order_date}
            onChange={handleForm}
          />
        </div>
        <div>
          <label>Order Status:</label>
          <select name="status" value={form.status} onChange={handleForm}>
            <option value="0">Unconfirmed</option>
            <option value="1">Confirmed</option>
          </select>
        </div>
        <div>
          <input type="submit" value="Update" />
        </div>
      </form>
    </>
  )
}

export default EditOrder
