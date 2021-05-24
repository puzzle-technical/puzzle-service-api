const express = require('express');
const router = express.Router();

const adminController = require('../controllers/admin.controller');
const { verifyJWT } = require('../services/auth');

router.post('/login', adminController.login);

router.post('/validateToken', verifyJWT, adminController.validateToken);

module.exports = router;