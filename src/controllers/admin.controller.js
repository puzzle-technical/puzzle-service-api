'use strict';
const Admin = require('../models/admin.model');
const Response = require('../utills/response')

exports.login = (request, response) => {
  Admin.login(request.body.email, request.body.senha)
  .then(res => {
    response.json(new Response(!!res, !res ? 'Email e/ou senha incorretos.' : 'Login válido', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.validateToken = (request, response) => {
  Admin.findByID(request.idUser)
  .then(res => {
    response.json(new Response(true, 'token valido', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.findActiveUsers = (request, response) => {
  Admin.findActiveUsers()
  .then(res => {
    response.json(new Response(true, 'Usuarios encontrados com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.findPendingUsers = (request, response) => {
  Admin.findPendingUsers()
  .then(res => {
    response.json(new Response(true, 'Usuarios encontrados com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}