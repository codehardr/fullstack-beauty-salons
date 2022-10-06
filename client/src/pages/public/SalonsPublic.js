import { useState, useEffect, useContext } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import MainContext from '../../context/MainContext'

const SalonsPublic = () => {
  const { setAlert, userInfo } = useContext(MainContext)

  const [salons, setSalons] = useState([])

  const [sort, setSort] = useState('')

  useEffect(() => {
    let url = '/api/salons/'
    if (sort === '1' || sort === '2') url += '?sort=' + sort
    axios
      .get(url)
      .then(resp => setSalons(resp.data))
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [setAlert, sort])

  return (
    <>
      <h1>Beauty Salons</h1>
      <span>Sort: </span>
      <select onChange={e => setSort(e.target.value)}>
        <option>Default</option>
        <option value="1">Ascending</option>
        <option value="2">Descending</option>
      </select>
      <div className="databox">
        {salons &&
          salons.map(salon => (
            <div key={salon.id}>
              <h2>{salon.name}</h2>
              <div>{salon.address}</div>
              <div>{salon.phone}</div>
              <div>
                <Link to={userInfo.id ? '/order/' + salon.id : '/login'} className="btn">
                  Place an Order
                </Link>
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default SalonsPublic
