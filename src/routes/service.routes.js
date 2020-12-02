const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');

router.get('/', serviceController.find);

router.post('/create', serviceController.create);

router.put('/update/:id', serviceController.update);

router.delete('/delete/:id', serviceController.delete);

router.post('/addCategory', serviceController.addCategory);

router.get('/:id/getCategories/', serviceController.getCategories);

router.delete('/:idService/removeCategory/:idCategory/', serviceController.removeCategory);

module.exports = router;