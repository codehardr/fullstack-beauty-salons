import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'
import defaultWorker from '../../resources/default-worker.jpg'

const Workers = () => {
  const navigate = useNavigate()

  const { alert, setAlert } = useContext(MainContext)

  const [workers, setWorkers] = useState([])

  const handleDelete = id => {
    axios
      .delete('/api/workers/delete/' + id)
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
      .get('/api/workers/')
      .then(resp => setWorkers(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [alert, setAlert])

  return (
    <>
      <h1>Beauty Workers</h1>
      {workers ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Photo</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Salon</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {workers.map(worker => (
              <tr key={worker.id}>
                <td>{worker.id}</td>
                <td>
                  {worker.photo ? (
                    <img
                      src={worker.photo}
                      alt={worker.first_name + ' ' + worker.last_name}
                      height="100"
                    />
                  ) : (
                    <img src={defaultWorker} alt="" height="100" />
                  )}
                </td>
                <td>{worker.first_name}</td>
                <td>{worker.last_name}</td>
                {/* <td>{worker.salon ? worker.salon.name : ''}</td> */}
                <td>{worker.salon?.name}</td>
                <td>
                  <Link className="btn" to={'/admin/workers/edit/' + worker.id}>
                    Update
                  </Link>
                  <button className="btn" onClick={() => handleDelete(worker.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Workers Found...</h2>
      )}
      <Link to={'/admin/workers/new'} className="btn btn-add">
        Add Worker
      </Link>
    </>
  )
}

export default Workers
