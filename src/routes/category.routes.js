const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.find);

router.post('/create', categoryController.create);

router.post('/createSubcategory', categoryController.createSubcategory);

router.put('/update/:id', categoryController.update);

router.put('/updateSubcategory/:id', categoryController.updateSubcategory);

router.delete('/delete/:id', categoryController.delete);

router.delete('/deleteSubcategory/:id', categoryController.deleteSubcategory);

router.get('/getSubcategoriesGroups', categoryController.getSubcategoriesGroups);

router.get('/findSubcategory', categoryController.findSubcategory);

module.exports = router;