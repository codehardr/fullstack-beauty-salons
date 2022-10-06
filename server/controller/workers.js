import express from 'express'
import db from '../database/connect.js'
import upload from '../middleware/multer.js'
import Sequelize from 'sequelize'
import { workersValidator } from '../middleware/validate.js'
import { adminAuth } from '../middleware/auth.js'

const router = express.Router()

router.get('/', async (req, res) => {
  try {
    const options = {
      include: [
        { model: db.salons, attributes: ['name'] },
        { model: db.ratings, attributes: ['rating'] },
      ],
      attributes: {
        include: [[Sequelize.fn('AVG', Sequelize.col('ratings.rating')), 'avg_rating']],
      },
      group: ['id'],
    }

    if (req.query.salon) options.where = { salonId: req.query.salon }

    if (req.query.sorting)
      options.order = [
        [Sequelize.literal('avg_rating'), req.query.sorting === '1' ? 'ASC' : 'DESC'],
      ]

    const workers = await db.workers.findAll(options)
    res.json(workers)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.get('/single/:id', adminAuth, async (req, res) => {
  try {
    const worker = await db.workers.findByPk(req.params.id, {
      attributes: ['first_name', 'last_name', 'photo', 'salonId'],
    })
    res.json(worker)
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.post('/new', adminAuth, upload.single('photo'), workersValidator, async (req, res) => {
  try {
    if (req.file) req.body.photo = '/uploads/' + req.file.filename
    await db.workers.create(req.body)
    res.send('New worker successfully added')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.put('/edit/:id', adminAuth, upload.single('photo'), workersValidator, async (req, res) => {
  try {
    if (req.file) req.body.photo = '/uploads/' + req.file.filename
    const worker = await db.workers.findByPk(req.params.id)
    await worker.update(req.body)
    res.send('Worker successfully updated')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

router.delete('/delete/:id', adminAuth, async (req, res) => {
  try {
    const worker = await db.workers.findByPk(req.params.id)
    await worker.destroy()
    res.send('Worker successfully removed')
  } catch (error) {
    console.log(error)
    res.status(500).send('Server error')
  }
})

export default router
