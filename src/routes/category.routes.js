const express = require('express');
const router = express.Router();

const categoryController = require('../controllers/category.controller');

//GET
router.get('/', categoryController.find);

router.get('/:idCategory', categoryController.findById);

router.get('/subcategories', categoryController.findSubcategories);

router.get('/subcategories/:idSubcategory', categoryController.findSubcategoryById);

router.get('/subcategories/findByCategory/:idCategory', categoryController.findSubcategoriesByCategory);

module.exports = router;