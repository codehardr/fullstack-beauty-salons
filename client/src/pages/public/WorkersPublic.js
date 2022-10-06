import { useState, useEffect, useContext } from 'react'
import axios from 'axios'
import MainContext from '../../context/MainContext'
import defaultWorker from '../../resources/default-worker.jpg'

const WorkersPublic = () => {
  const { setAlert } = useContext(MainContext)

  const [workers, setWorkers] = useState([])

  const [salons, setSalons] = useState([])

  const [selectedSalon, setSelectedSalon] = useState('0')

  const [selectedSorting, setSelectedSorting] = useState('0')

  const handleFilter = e => setSelectedSalon(e.target.value)

  const handleSorting = e => setSelectedSorting(e.target.value)

  useEffect(() => {
    let url = '/api/workers/?'

    const searchParams = new URLSearchParams()

    if (selectedSalon !== '0') searchParams.append('salon', selectedSalon)
    if (selectedSorting !== '0') searchParams.append('sorting', selectedSorting)

    url += searchParams.toString()

    console.log(url)

    axios
      .get(url)
      .then(resp => {
        // temp solution
        // const workers = resp.data.map(worker => {
        //   if (worker.ratings.length > 0) {
        //     let sum = 0
        //     worker.ratings.map(rating => (sum += rating.rating))
        //     worker.avg_rating = (sum / worker.ratings.length).toFixed(2)
        //   }
        //   return worker
        // })
        setWorkers(resp.data)
      })
      .catch(error => {
        setAlert({ msg: error.response.data, status: 'danger' })
        window.scrollTo(0, 0)
      })
  }, [setAlert, selectedSalon, selectedSorting])

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
      <h1>Beauty Workers</h1>
      {salons && (
        <select onChange={handleFilter}>
          <option value="0">Select Salon</option>
          {salons.map(salon => (
            <option key={salon.id} value={salon.id}>
              {salon.name}
            </option>
          ))}
        </select>
      )}
      <select onChange={handleSorting}>
        <option value="0">Order by Rating</option>
        <option value="1">ASC</option>
        <option value="2">DESC</option>
      </select>
      <div className="databox">
        {workers &&
          workers.map(worker => (
            <div key={worker.id}>
              <div>
                <img
                  src={worker.photo ? worker.photo : defaultWorker}
                  alt={worker.first_name + ' ' + worker.last_name}
                  height="100"
                />
              </div>
              <h2>{worker.first_name + ' ' + worker.last_name}</h2>
              <div>{worker.salon.name}</div>
              <div>
                Rating: {worker.avg_rating ? Number(worker.avg_rating).toFixed(2) : 'Not Rated'}
              </div>
            </div>
          ))}
      </div>
    </>
  )
}

export default WorkersPublic
