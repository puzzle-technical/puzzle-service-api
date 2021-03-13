'use strict';
const Budget = require('../models/budget.model');
const Response = require('../utills/response')

exports.find = (request, response) => {
  Budget.find(request.query['idBudget'])
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhum orçamento com este id não encontrado', res));
      return
    }
    response.json(new Response(true, 'Orçamento(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.create = (request, response) => {
  Budget.create(request.body)
  .then(res => {
    response.json(new Response(true, 'Orçamento criado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.update = (request, response) => {
  Budget.update(request.params.id, request.body)
  .then(res => {
    response.json(new Response(true, 'Orçamento atualizado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.delete = (request, response) => {
  Budget.delete(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Orçamento removido com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}