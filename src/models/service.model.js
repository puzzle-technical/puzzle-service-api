'use strict';
var con = require('../../config/db.config');

const Service = function(service) {
  this.idService = service.idService;
  this.nome = service.nome;
  this.descricao = service.descricao;
  this.localizacao = service.localizacao;
  this.dataPublic = service.dataPublic;
  this.idUser = service.idUser;
}

Service.find = async (idService = undefined) => {
  let result;
  
  if (idService) {
    result = await con.query('SELECT * FROM tb_services WHERE idService = ?', [idService]);
    if (result[0].length < 1) return null;
    return result[0][0];
  }  

  //find all
  else {
    result = await con.query('SELECT * FROM tb_services');
    return result[0];
  }
}

Service.create = async (service) => {
  const newService = new Service(service);

  const result = await con.query('INSERT INTO tb_services SET ?', newService);
  return result[0];
}

Service.update = async (id, service) => {
  const result = await con.query('UPDATE tb_services SET ? WHERE idService = ?', [service, Number(id)]);
  return result[0];
}

Service.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_services WHERE idService = ?', [id]);
  return result[0];
}

Service.getCategories = async (idService) => {
  let categories = await con.query('SELECT c.idCategory, c.nome FROM tb_categories_services cs, tb_categories c WHERE c.idCategory = cs.idCategory AND cs.idService = ?', [idService]);
  return categories = categories[0];
}

Service.addCategory = async (idService, idCategory) => {
  let result = await con.query('INSERT INTO tb_categories_services SET ?', { idService, idCategory })
  return result;
}

Service.removeCategory = async (idService, idCategory) => {
  let result = await con.query('DELETE FROM tb_categories_services WHERE idService = ? AND idCategory = ?', [idService, idCategory]);
  return result;
}

module.exports = Service;