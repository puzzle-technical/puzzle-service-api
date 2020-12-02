const express = require('express');
const router = express.Router();

const providerController = require('../controllers/provider.controller');

router.get('/', providerController.find);

router.post('/create', providerController.create);

router.put('/update/:id', providerController.update);

router.delete('/delete/:id', providerController.delete);

router.post('/addCategory', providerController.addCategory);

router.get('/:id/getCategories/', providerController.getCategories);

router.delete('/:idProvider/removeCategory/:idCategory/', providerController.removeCategory);

module.exports = router;