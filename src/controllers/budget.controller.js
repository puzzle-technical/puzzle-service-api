'use strict';
const Budget = require('../models/budget.model');
const Response = require('../utills/response')

exports.find = (request, response) => {
  Budget.find(request.query['idBudget'])
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhum orçamento com este id foi encontrado', res));
      return
    }
    response.json(new Response(true, 'Orçamento(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.findByService = (request, response) => {
  Budget.findByService(request.params.idService)
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhum orçamento deste serviço foi encontrado', res));
      return
    }
    response.json(new Response(true, 'Orçamento(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}


exports.findByUser = (request, response) => {
  Budget.findByUser(request.params.idUser)
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhum orçamento deste serviço foi encontrado', res));
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
  Budget.create(request.body.budget)
  .then(res => {
    response.json(new Response(true, 'Proposta de orçamento criada com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.update = (request, response) => {
  Budget.update(request.params.idBudget, request.body.budget)
  .then(res => {
    response.json(new Response(true, 'Orçamento atualizado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.delete = (request, response) => {
  Budget.delete(request.params.idBudget)
  .then(res => {
    response.json(new Response(true, 'Orçamento removido com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}