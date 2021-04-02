const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

router.get('/', categoryController.find);

router.post('/create', categoryController.create);

router.put('/update/:id', categoryController.update);

router.delete('/delete/:id', categoryController.delete);

router.get('/getSubcategoriesGroups', categoryController.getSubcategoriesGroups);

router.get('/findSubcategory', categoryController.findSubcategory);

module.exports = router;