import joi from 'joi'

const validate = (schema, req, res, next) => {
  const options = { abortEarly: true, stripUnknown: true }
  const { error, value } = schema.validate(req.body, options)
  let msg = ''
  if (error) {
    switch (error.details[0].path[0]) {
      case 'first_name':
        msg = 'Incorrect first name'
        break
      case 'last_name':
        msg = 'Incorrect last name'
        break
      case 'email':
        msg = 'Incorrect email'
        break
      case 'password':
        msg = 'Incorrect password'
        break
      default:
        msg = 'Entries are incorrect'
        break
    }
    return res.status(500).send(msg)
  }
  req.body = value
  next()
}

export const registerValidator = (req, res, next) => {
  const schema = joi.object({
    first_name: joi.string().min(2).max(255).required(),
    last_name: joi.string().min(2).max(255).required(),
    email: joi.string().email().required(),
    password: joi.string().min(6).max(255).required(),
  })
  validate(schema, req, res, next)
}

export const loginValidator = (req, res, next) => {
  const schema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(6).max(255).required(),
  })
  validate(schema, req, res, next)
}

export const workersValidator = (req, res, next) => {
  const schema = joi.object({
    first_name: joi.string().min(2).max(255).required(),
    last_name: joi.string().min(2).max(255).required(),
    photo: joi.string().allow(''),
    salonId: joi.number().integer().required(),
  })
  validate(schema, req, res, next)
}

export const servicesValidator = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(2).max(255).required(),
    duration: joi.string().min(1).max(255).required(),
    price: joi.string().min(1).max(255).required(),
    salonId: joi.number().integer().required(),
  })
  validate(schema, req, res, next)
}

export const salonsValidator = (req, res, next) => {
  const schema = joi.object({
    name: joi.string().min(2).max(255).required(),
    address: joi.string().min(1).max(255).required(),
    phone: joi.string().min(1).max(255).required(),
  })
  validate(schema, req, res, next)
}

export const ordersValidator = (req, res, next) => {
  const schema = joi.object({
    order_date: joi.date().required(),
    status: joi.number().integer(),
    serviceId: joi.number().integer().required(),
    workerId: joi.number().integer().required(),
  })
  validate(schema, req, res, next)
}

export const ratingsValidator = (req, res, next) => {
  const schema = joi.object({
    rating: joi.number().required(),
  })
  validate(schema, req, res, next)
}

export default validate
