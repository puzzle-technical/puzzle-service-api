const express = require('express');
const router = express.Router();

const providerController = require('../controllers/provider.controller');

router.get('/', providerController.findAll);

router.get('/:id', providerController.findByID);

router.post('/add', providerController.create);

router.put('/update/:id', providerController.update);

router.delete('/delete/:id', providerController.delete);

module.exports = router;