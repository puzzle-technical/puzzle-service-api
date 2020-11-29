const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');

router.get('/', userController.findAll);

router.get('/:id', userController.findByID);

router.post('/add', userController.create);

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.delete);

module.exports = router;