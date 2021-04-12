const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');

router.get('/', serviceController.find);

router.post('/findBySubcategories', serviceController.findBySubcategories);

router.post('/findByLocations', serviceController.findByLocations);

router.post('/create', serviceController.create);

router.put('/update/:id', serviceController.update);

router.delete('/delete/:id', serviceController.delete);

router.post('/addSubcategory', serviceController.addSubcategory);

router.get('/:idService/getSubcategories/', serviceController.getSubcategories);

router.delete('/:idService/removeCategory/:idCategory/', serviceController.removeCategory);

router.post('/addLocation', serviceController.addLocation);

router.get('/toUser/:idUser', serviceController.servicesToUser);

router.get('/:idService/getLocation/', serviceController.getSubcategories);

module.exports = router;