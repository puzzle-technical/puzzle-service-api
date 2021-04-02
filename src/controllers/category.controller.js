'use strict';
const Category = require('../models/category.model');
const Response = require('../utills/response')

exports.find = (request, response) => {
  Category.find(request.query['idCategory'])
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhuma categoria com este id não encontrado', res));
      return
    }
    response.json(new Response(true, 'Categoria(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.create = (request, response) => {
  Category.create(request.body)
  .then(res => {
    response.json(new Response(true, 'Categoria criada com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.update = (request, response) => {
  Category.update(request.params.id, request.body)
  .then(res => {
    response.json(new Response(true, 'Categoria atualizada com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.delete = (request, response) => {
  Category.delete(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Categoria removido com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}


exports.findSubcategory = (request, response) => {
  Category.findSubcategory(request.query['idSubcategory'])
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhuma categoria com este id não encontrado', res));
      return
    }
    response.json(new Response(true, 'Categoria(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getSubcategoriesGroups = (request, response) => {
  Category.getSubcategoriesGroups()
  .then(res => {
    if (res == null) {
      response.json(new Response(false, 'Nenhuma categoria com este id não encontrado', res));
      return
    }
    response.json(new Response(true, 'Categoria(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}