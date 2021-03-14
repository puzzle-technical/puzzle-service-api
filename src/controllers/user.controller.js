'use strict';
const User = require('../models/user.model');
const Response = require('../utills/response')

exports.find = (request, response) => {
  User.find(request.query['idUser'])
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhum usuário com este id não encontrado', res));
      return
    }
    response.json(new Response(true, 'Usuário(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.create = (request, response) => {
  User.create(request.body)
  .then(res => {
    response.json(new Response(true, 'Usuário criado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    if (err.code == 'ER_DUP_ENTRY') {
      let feedback = err.sqlMessage.indexOf("key 'email'") != -1 ? 'Email já cadastrado.' :
        err.sqlMessage.indexOf("key 'cpfUser'") != -1 ? 'CPF já cadastrado.' :
      response.json(new Response(false, feedback))
      return
    }
    response.json(new Response(false));
  })
}

exports.update = (request, response) => {
  User.update(request.params.id, request.body)
  .then(res => {
    response.json(new Response(true, 'Usuário atualizado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.delete = (request, response) => {
  User.delete(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Usuário removido com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.login = (request, response) => {
  User.validateLogin(request.body.email, request.body.senha)
  .then(res => {
    response.json(new Response(res, !res ? 'Email e/ou senha incorretos.' : 'Login válido', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.uploadPicture = (request, response) => {
  User.uploadPicture(request.params.id, request.files.file)
  .then(res => {
    response.json(new Response(true, 'Foto atualizada com sucesso.', res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}