require('dotenv').config()
const express = require('express')
const fileUpload = require('express-fileupload')
const cors = require('cors')
const dbConn = require('./config/db.config')
const schedule = require('node-schedule')

const ServiceModel = require('./src/models/service.model')

const job = schedule.scheduleJob('00 00 01 * * *', function () {
  ServiceModel.verifyExpiration()
})

const app = express()
const port = process.env.APP_PORT || 3000

app.use(fileUpload())
app.use(cors())
app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.get('/api', async (req, res) => {
  console.log('hello world')
  var result = await dbConn
    .query('SHOW TABLES')
    .catch((err) => console.log(err))
  res.json(result[0])
})

// routers

const adminRoutes = require('./src/routes/admin.routes')
app.use('/api/admin', adminRoutes)

const userRoutes = require('./src/routes/user.routes')
app.use('/api/users', userRoutes)

const serviceRoutes = require('./src/routes/service.routes')
app.use('/api/services', serviceRoutes)

const categoryRoutes = require('./src/routes/category.routes')
app.use('/api/categories', categoryRoutes)

const budgetRoutes = require('./src/routes/budget.routes')
app.use('/api/budgets', budgetRoutes)

const pointsRoutes = require('./src/routes/points.routes')
app.use('/api/points', pointsRoutes)

const notificationsRoutes = require('./src/routes/notification.routes')
const Service = require('./src/models/service.model')
app.use('/api/notifications', notificationsRoutes)

app.use('/', express.static('public'))

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`)
})

module.exports = app
