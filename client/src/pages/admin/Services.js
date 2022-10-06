import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const Services = () => {
  const navigate = useNavigate()

  const { alert, setAlert } = useContext(MainContext)

  const [services, setServices] = useState([])

  const handleDelete = id => {
    axios
      .delete('/api/services/delete/' + id)
      .then(resp => {
        setAlert({ msg: resp.data, status: 'success' })
        window.scrollTo(0, 0)
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/services/')
      .then(resp => setServices(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [alert, setAlert])

  return (
    <>
      <h1>Beauty Services</h1>
      {services ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Duration</th>
              <th>Price</th>
              <th>Salon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {services.map(service => (
              <tr key={service.id}>
                <td>{service.id}</td>
                <td>{service.name}</td>
                <td>{service.duration}</td>
                <td>{service.price}</td>
                {/* <td>{service.salon ? service.salon.name : ''}</td> */}
                <td>{service.salon?.name}</td>
                <td>
                  <Link className="btn" to={'/admin/services/edit/' + service.id}>
                    Update
                  </Link>
                  <button className="btn" onClick={() => handleDelete(service.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Services Found...</h2>
      )}
      <Link to={'/admin/services/new'} className="btn btn-add">
        Add Service
      </Link>
    </>
  )
}

export default Services
