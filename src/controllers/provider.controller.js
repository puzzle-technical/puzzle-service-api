'use strict';
const Provider = require('../models/provider.model');
const Response = require('../utills/response')

exports.find = (request, response) => {
  Provider.find(request.query['idProvider'], request.query['idCategory'])
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhum profissional com este id não encontrado', res));
      return
    }
    response.json(new Response(true, 'Profissional(is) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.create = (request, response) => {
  Provider.create(request.body)
  .then(res => {
    response.json(new Response(true, 'Profissional criado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    if (err.code == 'ER_DUP_ENTRY') {
      let feedback = err.sqlMessage.indexOf("key 'email'") != -1 ? 'Email já cadastrado.' :
        err.sqlMessage.indexOf("key 'cpfProvider'") != -1 ? 'CPF já cadastrado.' : ''
      response.json(new Response(false, feedback))
      return
    }
    response.json(new Response(false));
  })
}

exports.update = (request, response) => {
  Provider.update(request.params.id, request.body)
  .then(res => {
    response.json(new Response(true, 'Profissional atualizado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.delete = (request, response) => {
  Provider.delete(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Profissional removido com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.addCategory = (request, response) => {
  Provider.addCategory(request.body.idProvider, request.body.idCategory)
  .then(res => {
    response.json(new Response(true, 'Categoria adicionada ao profissional com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.removeCategory = (request, response) => {
  Provider.removeCategory(request.params.idProvider, request.params.idCategory)
  .then(res => {
    response.json(new Response(true, 'Categoria removida do profissional com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getCategories = (request, response) => {
  Provider.getCategories(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Categorias encontradas com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.login = (request, response) => {
  Provider.validateLogin(request.body.email, request.body.senha)
  .then(res => {
    response.json(new Response(res, !res ? 'Email e/ou senha incorretos.' : 'Login válido', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}