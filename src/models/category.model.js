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

module.exports = Category;