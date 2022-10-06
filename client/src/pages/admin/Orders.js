import { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const Orders = () => {
  const navigate = useNavigate()

  const { alert, setAlert } = useContext(MainContext)

  const [orders, setOrders] = useState([])

  const handleDelete = id => {
    axios
      .delete('/api/orders/delete/' + id)
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
      .get('/api/orders/')
      .then(resp => setOrders(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [alert, setAlert])

  return (
    <>
      <h1>Beauty Orders</h1>
      {orders ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Service</th>
              <th>Order Date</th>
              <th>Client</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.service?.name}</td>
                <td>{new Date(order.order_date).toLocaleString('lt-LT')}</td>
                <td>{order.user && order.user.first_name + ' ' + order.user.last_name}</td>
                <td>{order.status ? '✅ Confirmed' : '❎ Waiting for confirmation...'}</td>
                <td>
                  <Link className="btn" to={'/admin/orders/edit/' + order.id}>
                    Update
                  </Link>
                  <button className="btn" onClick={() => handleDelete(order.id)}>
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <h2>No Orders Found...</h2>
      )}
    </>
  )
}

export default Orders
