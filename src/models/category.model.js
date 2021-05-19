var con = require('../../config/db.config');

const Category = function(category) {
  this.idCategory = category.idCategory;
  this.nome = category.nome;
}

Category.find = async () => {
  const result = await con.query(`SELECT * FROM tb_categories`)
  return result[0]
}

Category.findById = async (idCategory) => {
  const result = await con.query(`SELECT * FROM tb_categories WHERE idCategory = ${idCategory}`)
  return result[0][0]
}

Category.findSubcategories = async () => {
  const result = await con.query(`SELECT * FROM tb_subcategories`)
  return result[0]
}

Category.findSubcategoryById = async (idSubcategory) => {
  const result = await con.query(`SELECT * FROM tb_subcategories WHERE idSubcategory = ${idSubcategory}`)
  return result[0]
}

Category.findSubcategoriesByCategory = async (idCategory) => {
  const result = await con.query(`SELECT * FROM tb_subcategories WHERE idCategory = ${idCategory}`)
  return result[0]
}

module.exports = Category;