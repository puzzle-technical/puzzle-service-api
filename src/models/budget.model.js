var con = require('../../config/db.config')

const Budget = function(budget) {
  this.idBudget = budget.idBudget;
  this.descricao = budget.descricao;
  this.status = budget.status;
  this.dataPublic = budget.dataPublic;
  this.idService = budget.idService;
  this.idUser = budget.idUser;
}

Budget.findById = async (idBudget) => {
  const result = await con.query(`SELECT * FROM tb_budgets WHERE idBudget = ${idBudget}`);
  return result[0];
}

Budget.findByUser = async (idUser) => {
  const result = await con.query(`SELECT * FROM tb_budgets WHERE idUser = ${idUser}`);
  return result[0];
}

Budget.findByService = async (idService) => {
  const result = await con.query(`SELECT * FROM tb_budgets WHERE idService = ${idService}`);
  return result[0];
}


Budget.findByService = async (idService) => {
  const result = await con.query(`SELECT * FROM tb_budgets WHERE idService = ${idService}`);
  return result[0];
}

Budget.create = async (budget) => {
  const newBudget = new Budget(budget);
  const result = await con.query(`INSERT INTO tb_budgets SET ?`, newBudget);
  return result[0];
}

Budget.update = async (idBudget, budget) => {
  const result = await con.query(`UPDATE tb_budgets SET ? WHERE idBudget = ${idBudget}`, [budget]);
  return result[0];
}

Budget.delete = async (idBudget) => {
  const result = await con.query(`DELETE FROM tb_budgets WHERE idBudget = ${idBudget}`);
  return result[0];
}

module.exports = Budget;