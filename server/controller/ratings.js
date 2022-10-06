import express from 'express'
import db from '../database/connect.js'
import { ratingsValidator } from '../middleware/validate.js'
import { auth } from '../middleware/auth.js'

const router = express.Router()

router.post('/worker/:wid/order/:oid', auth, ratingsValidator, async (req, res) => {
  const user_id = req.session.user.id

  req.body.userId = user_id

  req.body.workerId = req.params.wid
  req.body.orderId = req.params.oid

  try {
    await db.ratings.create(req.body)
    res.send('New rating successfully saved')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router
