'use strict';
const Category = require('../models/category.model');

exports.find = (request, response) => {
  Category.find(request.query['idCategory'])
  .then(res => {
    response.json(res);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  })
}

exports.create = (request, response) => {
  Category.create(request.body)
  .then(res => {
    response.send(`Categoria adicionada com id ${res.insertId}`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao adicionar categoria\n\n' + err);
  })
}

exports.update = (request, response) => {
  Category.update(request.params.id, request.body)
  .then(res => {
    response.send(`Categoria ${request.params.id} atualizado com sucesso`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao atualizar categoria\n\n' + err);
  })
}

exports.delete = (request, response) => {
  Category.delete(request.params.id)
  .then(res => {
    response.send(`Categoria ${request.params.id} removido com sucesso`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao remover categoria\n\n' + err);
  })
}