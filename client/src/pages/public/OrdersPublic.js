import { useState, useEffect, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const OrdersPublic = () => {
  const navigate = useNavigate()

  const { alert, setAlert } = useContext(MainContext)

  const [orders, setOrders] = useState([])

  const handleRatings = (e, workerId, orderId) => {
    axios
      .post('/api/ratings/worker/' + workerId + '/order/' + orderId, { rating: e.target.value })
      .then(resp => setAlert({ msg: resp.data, status: 'success' }))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }

  useEffect(() => {
    axios
      .get('/api/orders/user/')
      .then(resp => setOrders(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
        if (error.response.status === 401) navigate('/login')
      })
  }, [alert, setAlert, navigate])

  return (
    <>
      <h1>Your Orders</h1>
      {orders ? (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Salon</th>
              <th>Service</th>
              <th>Worker</th>
              <th>Rating</th>
              <th>Order Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map(order => (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.service.salon?.name}</td>
                <td>{order.service?.name}</td>
                <td>{order.worker?.first_name + ' ' + order.worker?.last_name}</td>
                <td>
                  {order.rating ? (
                    'Your rating: ' + order.rating.rating
                  ) : (
                    <select onChange={e => handleRatings(e, order.workerId, order.id)}>
                      <option value="1">1</option>
                      <option value="2">2</option>
                      <option value="3">3</option>
                      <option value="4">4</option>
                      <option value="5">5</option>
                    </select>
                  )}
                </td>
                <td>{new Date(order.order_date).toLocaleString('lt-LT')}</td>
                <td>{order.status ? '✅ Confirmed' : '❎ Waiting for confirmation...'}</td>
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

export default OrdersPublic
