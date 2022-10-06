import { useState, useEffect, useContext } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const AddOrder = () => {
  const { setAlert } = useContext(MainContext)

  const { salonId } = useParams()

  const navigate = useNavigate()

  const [services, setServices] = useState([])

  const [workers, setWorkers] = useState([])

  const [form, setForm] = useState({})

  const handleForm = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(form)
    axios
      .post('/api/orders/new', form)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        navigate('/orders')
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/services/?salonId=' + salonId)
      .then(resp => setServices(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }, [setAlert, navigate, salonId])

  useEffect(() => {
    axios
      .get('/api/workers/?salon=' + salonId)
      .then(resp => setWorkers(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [setAlert, salonId])

  return (
    <>
      <h1>Order a Service</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <select name="serviceId" onChange={handleForm}>
            <option value="0">Select Service</option>
            {services &&
              services.map(service => (
                <option key={service.id} value={service.id}>
                  {service.name + ' | Duration: ' + service.duration}
                </option>
              ))}
          </select>
        </div>
        <div>
          <select name="workerId" onChange={handleForm}>
            <option value="0">Select Worker</option>
            {workers &&
              workers.map(worker => (
                <option key={worker.id} value={worker.id}>
                  {worker.first_name + ' ' + worker.last_name}
                </option>
              ))}
          </select>
        </div>
        <div>
          <label>Choose a date:</label>
          <input type="datetime-local" name="order_date" onChange={handleForm} />
        </div>
        <div>
          <input type="submit" value="Place an Order" />
        </div>
      </form>
    </>
  )
}

export default AddOrder
