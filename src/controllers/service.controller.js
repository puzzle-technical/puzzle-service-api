'use strict';
const Service = require('../models/service.model');
const Response = require('../utills/response')

exports.find = (request, response) => {
  Service.find(request.query['idService'])
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhum serviço com este id não encontrado', res));
      return
    }
    response.json(new Response(true, 'Serviço(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.create = (request, response) => {
  Service.create(request.body)
  .then(res => {
    response.json(new Response(true, 'Serviço criado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.update = (request, response) => {
  Service.update(request.params.id, request.body)
  .then(res => {
    response.json(new Response(true, 'Serviço atualizado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.delete = (request, response) => {
  Service.delete(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Serviço removido com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.addCategory = (request, response) => {
  Service.addCategory(request.body.idService, request.body.idCategory)
  .then(res => {
    response.json(new Response(true, 'Categoria adicionada ao serviço com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.removeCategory = (request, response) => {
  Service.removeCategory(request.params.idService, request.params.idCategory)
  .then(res => {
    response.json(new Response(true, 'Categoria removida do serviço com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getCategories = (request, response) => {
  Service.getCategories(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Categorias encontradas com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}