'use strict';
const Service = require('../models/service.model');

exports.find = (request, response) => {
  Service.find(request.query['idService'])
  .then(res => {
    response.json(res);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  })
}

exports.create = (request, response) => {
  Service.create(request.body)
  .then(res => {
    response.send(`Servico adicionado com id ${res.insertId}`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao adicionar servico\n\n' + err);
  })
}

exports.update = (request, response) => {
  Service.update(request.params.id, request.body)
  .then(res => {
    response.send(`Servico ${request.params.id} atualizado com sucesso`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao atualizar servico\n\n' + err);
  })
}

exports.delete = (request, response) => {
  Service.delete(request.params.id)
  .then(res => {
    response.send(`Servico ${request.params.id} removido com sucesso`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao remover servico\n\n' + err);
  })
}

exports.addCategory = (request, response) => {
  Service.addCategory(request.body.idService, request.body.idCategory)
  .then(res => {
    response.send(`Categoria adicionada ao servico`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao adicionar categoria ao servico\n\n' + err);
  })
}