import express from 'express'
import db from '../database/connect.js'
import { servicesValidator } from '../middleware/validate.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', auth, async (req, res) => {
  const options = { include: { model: db.salons, attributes: ['name'] } }

  if (req.query.salonId) options.where = { salonId: req.query.salonId }

  try {
    const services = await db.services.findAll(options)
    res.json(services)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.get('/single/:id', adminAuth, async (req, res) => {
  try {
    const service = await db.services.findByPk(req.params.id)
    res.json(service)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.post('/new', adminAuth, servicesValidator, async (req, res) => {
  try {
    await db.services.create(req.body)
    res.send('New service successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', adminAuth, servicesValidator, async (req, res) => {
  try {
    const service = await db.services.findByPk(req.params.id)
    await service.update(req.body)
    res.send('Service successfully updated')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.delete('/delete/:id', adminAuth, async (req, res) => {
  try {
    const service = await db.services.findByPk(req.params.id)
    await service.destroy()
    res.send('Service successfully removed')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router
