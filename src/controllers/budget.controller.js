const Budget = require('../models/budget.model')
const wrap = require('../utills/wrap')
const Response = require('../utills/response')

exports.findById = (request, response) => {
  wrap(response, Budget.findById(request.params.idBudget), 'Orçamento encontrado com sucesso')
}

exports.findByUser = (request, response) => {
  wrap(response, Budget.findByUser(request.params.idUser), 'Orçamento encontrado com sucesso')
}

exports.findByService = (request, response) => {
  wrap(response, Budget.findByService(request.params.idService), 'Orçamento encontrado com sucesso')
}

exports.create = (request, response) => {
  wrap(response, Budget.create(request.body.budget), 'Orçamento enviado com sucesso')
}

exports.update = (request, response) => {
  wrap(response, Budget.update(request.params.idBudget, request.body.budget), 'Orçamento atualizado com sucesso')
}

exports.delete = (request, response) => {
  wrap(response, Budget.delete(request.params.idBudget), 'Orçamento removido com sucesso')
}