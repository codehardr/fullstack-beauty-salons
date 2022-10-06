import express from 'express'
import db from '../database/connect.js'
import { ratingsValidator } from '../middleware/validate.js'

const router = express.Router()

router.post('/worker/:id', ratingsValidator, async (req, res) => {
  const user_id = 1

  req.body.workerId = req.params.id
  req.body.userId = user_id

  try {
    await db.ratings.create(req.body)
    res.send('New rating successfully saved')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router
