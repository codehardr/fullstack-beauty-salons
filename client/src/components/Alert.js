import { useEffect, useContext } from 'react'
import MainContext from '../context/MainContext'

const Alert = () => {
  const { alert, setAlert } = useContext(MainContext)

  useEffect(() => {
    if (alert.msg === '') return
    setTimeout(() => setAlert({ msg: '' }), 3000)
  }, [alert.msg, setAlert])

  return alert.msg && <div className={'alert alert-' + alert.status}>{alert.msg}</div>
}

export default Alert
