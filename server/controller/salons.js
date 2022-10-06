import express from 'express'
import db from '../database/connect.js'
import { salonsValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  const options = {}
  if (req.query.sort === '1') options.order = [['name', 'ASC']]
  if (req.query.sort === '2') options.order = [['name', 'DESC']]
  try {
    const salons = await db.salons.findAll(options)
    res.json(salons)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.get('/single/:id', adminAuth, async (req, res) => {
  try {
    const salon = await db.salons.findByPk(req.params.id)
    res.json(salon)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.post('/new', adminAuth, salonsValidator, async (req, res) => {
  try {
    await db.salons.create(req.body)
    res.send('New salon successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', adminAuth, salonsValidator, async (req, res) => {
  try {
    const salon = await db.salons.findByPk(req.params.id)
    await salon.update(req.body)
    res.send('Salon successfully updated')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.delete('/delete/:id', adminAuth, async (req, res) => {
  try {
    const salon = await db.salons.findByPk(req.params.id)
    await salon.destroy()
    res.send('Salon successfully removed')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router
