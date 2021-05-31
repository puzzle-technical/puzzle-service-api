const express = require('express');
const router = express.Router();

const userController = require('../controllers/user.controller');
const { verifyJWT } = require('../services/auth');

router.get('/:tipoUser', userController.findByType);

router.get('/findById/:idUser', userController.findByID);

router.get('/byCategory/:idCategory', userController.findByCategory);

router.post('/findProvidersBySubcategories', userController.findProvidersBySubcategories);

router.get('/bySubcategory/:idSubcategory', userController.findBySubcategory);

router.post('/create', userController.create);

router.put('/update/:id', userController.update);

router.put('/updatePassword/:id', userController.updatePassword);

router.delete('/delete/:id', userController.delete);

router.post('/addSubcategory', userController.addSubcategory);

router.get('/:idUser/getCategories', userController.getCategories);

router.get('/:idUser/getSubcategories', userController.getSubcategories);

router.put('/:idUser/updateSubcategories', userController.updateSubcategories);

router.delete('/:idUser/removeSubcategory/:idSubcategory', userController.removeSubcategory);

router.post('/login', userController.login);

router.post('/validateToken', verifyJWT, userController.validateToken);

router.get('/:idUser/getLocations', userController.getLocations)

router.post('/addLocation', userController.addLocation)

router.put('/:idUser/updateLocations', userController.updateLocations);

router.post('/:idUser/addAvatar', userController.addAvatar)

router.get('/:idUser/getOpenedServices', userController.getOpenedServices)

router.post('/addOpenedService', userController.addOpenedService)

router.post('/openService', userController.openService)

router.post('/forgottenPassword', userController.forgottenPassword)

module.exports = router;