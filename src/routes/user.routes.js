const express = require('express');
const router = express.Router();
const multer = require('multer')()

const userController = require('../controllers/user.controller');

router.get('/', userController.find);

router.post('/create', userController.create);

router.put('/update/:id', userController.update);

router.delete('/delete/:id', userController.delete);

router.post('/login', userController.login);

router.post('/uploadPicture/:id', multer.single('file'), userController.uploadPicture);

module.exports = router;