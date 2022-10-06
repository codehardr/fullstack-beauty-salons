import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const Salons = () => {
  const navigate = useNavigate()

  const { alert, setAlert } = useContext(MainContext)

  const [salons, setSalons] = useState([])

  const handleDelete = id => {
    axios
      .delete('/api/salons/delete/' + id)
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
      .get('/api/salons/')
      .then(resp => setSalons(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [alert, setAlert])

  return (
    <>
      <h1>Beauty Salons</h1>
      {salons ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Address</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {salons.map(salon => (
              <tr key={salon.id}>
                <td>{salon.id}</td>
                <td>{salon.name}</td>
                <td>{salon.address}</td>
                <td>{salon.phone}</td>
                <td>
                  <Link className="btn" to={'/admin/salons/edit/' + salon.id}>
                    Update
                  </Link>
                  <button className="btn" onClick={() => handleDelete(salon.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Salons Found...</h2>
      )}
      <Link to={'/admin/salons/new'} className="btn btn-add">
        Add Salon
      </Link>
    </>
  )
}

export default Salons
