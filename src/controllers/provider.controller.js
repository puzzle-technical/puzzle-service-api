'use strict';
const Provider = require('../models/provider.model');

exports.find = (request, response) => {
  Provider.find(request.query['idProvider'], request.query['idCategory'])
  .then(res => {
    response.json(res);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  })
}

exports.create = (request, response) => {
  Provider.create(request.body)
  .then(res => {
    response.send(`Profissional adicionado com id ${res.insertId}`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao adicionar profissional\n\n' + err);
  })
}

exports.update = (request, response) => {
  Provider.update(request.params.id, request.body)
  .then(res => {
    response.send(`Profissional ${request.params.id} atualizado com sucesso`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao atualizar profissional\n\n' + err);
  })
}

exports.delete = (request, response) => {
  Provider.delete(request.params.id)
  .then(res => {
    response.send(`Profissional ${request.params.id} removido com sucesso`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao remover profissional\n\n' + err);
  })
}

exports.addCategory = (request, response) => {
  Provider.addCategory(request.body.idProvider, request.body.idCategory)
  .then(res => {
    response.send(`Categoria adicionada ao profissional`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao adicionar categoria ao profissional\n\n' + err);
  })
}

exports.removeCategory = (request, response) => {
  Provider.removeCategory(request.params.idProvider, request.params.idCategory)
  .then(res => {
    response.send(`Categoria removida ao profissional`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao remover categoria do profissional\n\n' + err);
  })
}

exports.getCategories = (request, response) => {
  Provider.getCategories(request.params.id)
  .then(res => {
    response.json(res);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  })
}