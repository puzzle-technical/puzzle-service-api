const Category = require('../models/category.model')
const wrap = require('../utills/wrap')

exports.find = (request, response) => {
  wrap(response, Category.find(), 'Categorias encontradas com sucesso')
}

exports.findById = (request, response) => {
  wrap(response, Category.findById(request.params.idCategory), 'Categori encontrada com sucesso')
}

exports.findSubcategories = (request, response) => {
  wrap(response, Category.findSubcategories(), 'Subcategorias encontradas com sucesso')
}

exports.findSubcategoryById = (request, response) => {
  wrap(response, Category.findSubcategoryById(request.params.idSubcategory), 'Subcategoria encontrada com sucesso')
}

exports.findSubcategoriesByCategory = (request, response) => {
  wrap(response, Category.findSubcategoriesByCategory(request.params.idCategory), 'Subcategorias encontrada com sucesso')
}
