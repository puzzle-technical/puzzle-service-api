'use strict';
const Budget = require('../models/budget.model');

exports.find = (request, response) => {
  Budget.find(request.query['idBudget'])
  .then(res => {
    response.json(res);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  })
}

exports.create = (request, response) => {
  Budget.create(request.body)
  .then(res => {
    response.send(`Orcamento adicionada com id ${res.insertId}`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao adicionar orcamento\n\n' + err);
  })
}

exports.update = (request, response) => {
  Budget.update(request.params.id, request.body)
  .then(res => {
    response.send(`Orcamento ${request.params.id} atualizado com sucesso`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao atualizar orcamento\n\n' + err);
  })
}

exports.delete = (request, response) => {
  Budget.delete(request.params.id)
  .then(res => {
    response.send(`Categoria ${request.params.id} removido com sucesso`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao remover categoria\n\n' + err);
  })
}