const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { verifyJWT } = require('../services/auth');


// GET
router.get('/:idUser', userController.findByID);

router.get('/findByType/:tipoUser', userController.findByType);

router.get('/findBySubcategories/:subcategoriesIds', userController.findBySubcategories);

router.get('/findByLocations/:nomes', userController.findByLocations);

router.get('/:idUser/getSubcategories', userController.getSubcategories);

router.get('/:idUser/getLocations', userController.getLocations);

router.get('/:idUser/getOpenedServices', userController.getOpenedServices);


// // POST
router.post('/create', userController.create);

router.post('/login', userController.login);

router.post('/validateToken', verifyJWT, userController.validateToken);

router.post('/:idUser/addSubcategories', userController.addSubcategories);

router.post('/:idUser/addLocations', userController.addLocations);

router.post('/:idUser/addAvatar', userController.addAvatar);

router.post('/:idUser/addOpenedService', userController.addOpenedService);


// // PUT
router.put('/:idUser/update', userController.update);

router.put('/:idUser/replaceSubcategories', userController.replaceSubcategories);

router.put('/:idUser/replaceLocations', userController.replaceLocations);


// // DELETE
router.delete('/:idUser/delete', userController.delete);

// router.delete('/:idUser/removeOpenedService', userController.addOpenedService)


module.exports = router;