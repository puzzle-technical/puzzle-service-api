const express = require('express');
const router = express.Router();

const serviceController = require('../controllers/service.controller');


// GET
router.get('/:idService', serviceController.findById);

router.get('/findByUser/:idUser', serviceController.findByUser);

router.get('/findToProvider/:idUser', serviceController.findToProvider);

router.get('/findBySubcategories/:subcategoriesIds', serviceController.findBySubcategories);

router.get('/findByLocations/:nomes', serviceController.findByLocations);

router.get('/:idService/getSubcategories/', serviceController.getSubcategories);

router.get('/:idService/getLocation/', serviceController.getLocation);


// POST
router.post('/create', serviceController.create);

router.post('/:idService/addSubcategories', serviceController.addSubcategories);

router.post('/:idService/addLocation', serviceController.addLocation);


// PUT
router.put('/:idService/update', serviceController.update);

router.put('/:idService/updateLocation', serviceController.updateLocation);

router.put('/:idService/replaceSubcategories', serviceController.replaceSubcategories);


// DELETE
router.delete('/:idService/delete', serviceController.delete);


module.exports = router;