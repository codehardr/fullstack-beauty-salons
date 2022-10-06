import { Sequelize } from 'sequelize'
import mysql from 'mysql2/promise'

// [MODELIŲ IMPORTAI]
import { Users, Salons, Services, Workers, Ratings, Orders } from '../model/index.js'

const database = {}

const credentials = {
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'beauty_salon', // enter database name!
}

try {
  const connection = await mysql.createConnection({
    host: credentials.host,
    user: credentials.user,
    password: credentials.password,
  })

  await connection.query('CREATE DATABASE IF NOT EXISTS ' + credentials.database)

  const sequelize = new Sequelize(credentials.database, credentials.user, credentials.password, {
    dialect: 'mysql',
  })

  // [MODELIŲ PRISKYRIMAI IR RELIACIJOS]
  database.users = Users(sequelize)
  database.salons = Salons(sequelize)
  database.services = Services(sequelize)
  database.workers = Workers(sequelize)
  database.ratings = Ratings(sequelize)
  database.orders = Orders(sequelize)

  database.salons.hasMany(database.workers)
  database.workers.belongsTo(database.salons)

  database.salons.hasMany(database.services)
  database.services.belongsTo(database.salons)

  database.users.hasMany(database.orders)
  database.orders.belongsTo(database.users)

  database.services.hasMany(database.orders)
  database.orders.belongsTo(database.services)

  database.users.hasMany(database.ratings)
  database.ratings.belongsTo(database.users)

  database.workers.hasMany(database.ratings)
  database.ratings.belongsTo(database.workers)

  database.workers.hasMany(database.orders)
  database.orders.belongsTo(database.workers)

  database.orders.hasOne(database.ratings)
  database.ratings.belongsTo(database.orders)

  await sequelize.sync({ alter: false })
} catch {
  console.log('Database connection failed')
}

export default database
