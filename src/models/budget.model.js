'use strict';
var con = require('../../config/db.config');

const Budget = function(service) {
  this.idBudget = service.idBudget;
  this.descricao = service.descricao;
  this.dataFinal = service.dataFinal;
  this.idService = service.idService;
  this.idProvider = service.idProvider;
}

Budget.find = async (idBudget = undefined) => {
  let result;
  
  if (idBudget) {
    result = await con.query('SELECT * FROM tb_budgets WHERE idBudget = ?', [idBudget]);
    if (result[0].length < 1) return null;
    return result[0][0];
  }  

  result = await con.query('SELECT * FROM tb_budgets');
  return result[0];
}

Budget.create = async (service) => {
  const newBudget = new Budget(service);

  const result = await con.query('INSERT INTO tb_budgets SET ?', newBudget);
  return result[0];
}

Budget.update = async (id, service) => {
  const result = await con.query('UPDATE tb_budgets SET ? WHERE idBudget = ?', [service, Number(id)]);
  return result[0];
}

Budget.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_budgets WHERE idBudget = ?', [id]);
  return result[0];
}

module.exports = Budget;