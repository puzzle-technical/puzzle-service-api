const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.find);

router.post('/create', userController.create);

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.delete);

router.post('/login', userController.login);

module.exports = router;