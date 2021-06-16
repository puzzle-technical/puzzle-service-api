'use strict'
var con = require('../../config/db.config')

const Budget = function (budget) {
  this.idBudget = budget.idBudget
  this.descricao = budget.descricao
  this.status = budget.status
  this.dataPublic = budget.dataPublic
  this.idService = budget.idService
  this.idUser = budget.idUser
}

Budget.find = async (idBudget = undefined) => {
  let result

  if (idBudget) {
    result = await con.query('SELECT * FROM tb_budgets WHERE idBudget = ?', [
      idBudget,
    ])
    if (result[0].length < 1) return null
    return result[0][0]
  }

  result = await con.query('SELECT * FROM tb_budgets')
  return result[0]
}

Budget.findByService = async (idService) => {
  const result = await con.query(
    `SELECT * FROM tb_budgets WHERE idService = ? AND status != 'recusado' AND status != 'cancelado' ORDER BY idBudget DESC`,
    [idService]
  )
  return result[0]
}

Budget.findByUser = async (idUser) => {
  const result = await con.query(
    'SELECT * FROM tb_budgets WHERE idUser = ? ORDER BY idBudget DESC',
    [idUser]
  )
  return result[0]
}

Budget.create = async (budget) => {
  const newBudget = new Budget(budget)

  const result = await con.query('INSERT INTO tb_budgets SET ?', newBudget)
  return result[0]
}

Budget.update = async (id, budget) => {
  const result = await con.query('UPDATE tb_budgets SET ? WHERE idBudget = ?', [
    budget,
    Number(id),
  ])
  return result[0]
}

Budget.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_budgets WHERE idBudget = ?', [
    id,
  ])
  return result[0]
}

module.exports = Budget
