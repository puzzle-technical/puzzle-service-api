'use strict';
var con = require('../../config/db.config');

const Category = function(category) {
  this.idCategory = category.idCategory;
  this.nome = category.nome;
}

Category.find = async (idCategory = undefined) => {
  let result;
  
  if (idCategory) {
    result = await con.query('SELECT * FROM tb_categories WHERE idCategory = ?', [idCategory]);
    if (result[0].length < 1) return null;
    return result[0][0];
  }  

  result = await con.query('SELECT * FROM tb_categories');
  return result[0];
}

Category.create = async (category) => {
  const newCategory = new Category(category);

  const result = await con.query('INSERT INTO tb_categories SET ?', newCategory);
  return result[0];
}


Category.update = async (id, category) => {
  const result = await con.query('UPDATE tb_categories SET ? WHERE idCategory = ?', [category, Number(id)]);
  return result[0];
}

Category.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_categories WHERE idCategory = ?', [id]);
  return result[0];
}

Category.createSubcategory = async (category) => {
  const subcat = {
    idCategory: category.idCategory,
    nome: category.nome
  }

  const result = await con.query('INSERT INTO tb_subcategories SET ?', subcat);
  return result[0];
}

Category.findSubcategory = async (idSubcategory = undefined) => {
  let result;
  
  if (idSubcategory) {
    result = await con.query('SELECT * FROM tb_subcategories WHERE idSubcategory = ?', [idSubcategory]);
    if (result[0].length < 1) return null;
    return result[0][0];
  }  

  result = await con.query('SELECT * FROM tb_subcategories');
  return result[0];
}


Category.getSubcategoriesGroups = async () => {
  let result = [];
  const pushToResult = value => { result.push(value) }

  let categories = await con.query('SELECT * FROM tb_categories');
  categories = categories[0]

  // console.log('categ: ', categories);

  for (let cat of categories) {
    let subcategories = await con.query('SELECT * FROM tb_subcategories WHERE idCategory = ?', [cat.idCategory])
    subcategories = subcategories[0]

    // console.log('subcateg: ', subcategories);

    pushToResult({
      idCategory: cat.idCategory,
      nome: cat.nome,
      subcategories
    })
  }
  return result
}

module.exports = Category;