const express = require('express')
const router = express.Router()

const notificationsController = require('../controllers/notification.controller')

router.get('/findByUser/:idUser', notificationsController.findByUser)

router.post('/create', notificationsController.create)

router.put('/update/:idUser', notificationsController.update)

module.exports = router
