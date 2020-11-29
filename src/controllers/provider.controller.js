'use strict';

const Provider = require('../models/provider.model');

exports.findAll = (request, response) => {
  Provider.findAll()
  .then(res => {
    response.json(res);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  })
}

exports.findByID = (request, response) => {
  Provider.findByID(request.params.id)
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