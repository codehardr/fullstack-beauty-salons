import { useState, useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import axios from 'axios'

import MainContext from './context/MainContext'

import Alert from './components/Alert'
import Header from './components/Header'

// ADMIN
import Salons from './pages/admin/Salons'
import AddSalon from './pages/admin/AddSalon'
import EditSalon from './pages/admin/EditSalon'
import Services from './pages/admin/Services'
import AddService from './pages/admin/AddService'
import EditService from './pages/admin/EditService'
import Workers from './pages/admin/Workers'
import AddWorker from './pages/admin/AddWorker'
import EditWorker from './pages/admin/EditWorker'
import Orders from './pages/admin/Orders'
import EditOrder from './pages/admin/EditOrder'

// PUBLIC
import SalonsPublic from './pages/public/SalonsPublic'
import WorkersPublic from './pages/public/WorkersPublic'
import AddOrder from './pages/public/AddOrder'
import OrdersPublic from './pages/public/OrdersPublic'
import Register from './pages/public/Register'
import Login from './pages/public/Login'

const App = () => {
  const [alert, setAlert] = useState({ msg: '', status: '' })

  const [userInfo, setUserInfo] = useState({})

  const contextValues = { alert, setAlert, userInfo, setUserInfo }

  useEffect(() => {
    axios.get('/api/users/check-auth/').then(resp => setUserInfo(resp.data))
  }, [])

  return (
    <BrowserRouter>
      <MainContext.Provider value={contextValues}>
        <Header />
        <div className="container">
          <Alert />
          <Routes>
            {userInfo.role === 1 && (
              <Route path="admin">
                <Route path="salons" element={<Salons />} />
                <Route path="salons/new" element={<AddSalon />} />
                <Route path="salons/edit/:id" element={<EditSalon />} />
                <Route path="services" element={<Services />} />
                <Route path="services/new" element={<AddService />} />
                <Route path="services/edit/:id" element={<EditService />} />
                <Route path="workers" element={<Workers />} />
                <Route path="workers/new" element={<AddWorker />} />
                <Route path="workers/edit/:id" element={<EditWorker />} />
                <Route path="orders" element={<Orders />} />
                <Route path="orders/edit/:id" element={<EditOrder />} />
              </Route>
            )}
            <Route path="/" element={<SalonsPublic />} />
            <Route path="/workers" element={<WorkersPublic />} />

            {userInfo.id && (
              <>
                <Route path="/order/:salonId" element={<AddOrder />} />
                <Route path="/orders" element={<OrdersPublic />} />
              </>
            )}

            <Route path="/register" element={<Register />} />
            <Route path="/login" element={<Login />} />

            <Route path="*" element={<Login />} />
          </Routes>
        </div>
      </MainContext.Provider>
    </BrowserRouter>
  )
}

export default App
