import express from 'express'
import db from '../database/connect.js'
import { ordersValidator } from '../middleware/validate.js'
import { auth, adminAuth } from '../middleware/auth.js'

const router = express.Router()

// ADMIN orders list
router.get('/', adminAuth, async (req, res) => {
  try {
    const orders = await db.orders.findAll({
      include: [
        { model: db.users, attributes: ['first_name', 'last_name'] },
        { model: db.services, attributes: ['name'] },
      ],
    })
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

// USER orders list
router.get('/user', auth, async (req, res) => {
  const user_id = req.session.user.id

  try {
    const orders = await db.orders.findAll({
      where: { userId: user_id },
      include: [{ model: db.services, include: db.salons }, db.workers, db.ratings],
      group: ['id'],
    })
    res.json(orders)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.get('/single/:id', adminAuth, async (req, res) => {
  try {
    const order = await db.orders.findByPk(req.params.id)
    res.json(order)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.post('/new', auth, ordersValidator, async (req, res) => {
  try {
    req.body.userId = req.session.user.id
    await db.orders.create(req.body)
    res.send('New order successfully created')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', adminAuth, ordersValidator, async (req, res) => {
  try {
    const order = await db.orders.findByPk(req.params.id)
    await order.update(req.body)
    res.send('Order successfully updated')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.delete('/delete/:id', adminAuth, async (req, res) => {
  try {
    const order = await db.orders.findByPk(req.params.id)
    await order.destroy()
    res.send('Order successfully removed')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router
