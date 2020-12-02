'use strict';
const User = require('../models/user.model');

exports.find = (request, response) => {
  User.find(request.query['idUser'])
  .then(res => {
    response.json(res);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send(err);
  })
}

exports.create = (request, response) => {
  User.create(request.body)
  .then(res => {
    response.send(`Usuario adicionado com id ${res.insertId}`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao adicionar usuário\n\n' + err);
  })
}

exports.update = (request, response) => {
  User.update(request.params.id, request.body)
  .then(res => {
    response.send(`Usuario ${request.params.id} atualizado com sucesso`);
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao atualizar usuário\n\n' + err);
  })
}

exports.delete = (request, response) => {
  User.delete(request.params.id)
  .then(res => {
    response.send(`Usuario ${request.params.id} removido com sucesso`)
  })
  .catch(err => {
    console.log(err);
    response.status(500).send('Erro ao remover usuário\n\n' + err);
  })
}