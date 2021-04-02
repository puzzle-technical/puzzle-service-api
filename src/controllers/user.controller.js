'use strict';
const User = require('../models/user.model');
const Response = require('../utills/response')

exports.findByType = (request, response) => {
  User.findByType(request.params.tipoUser)
  .then(res => {
    response.json(new Response(true, 'Usuário(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.findByID = (request, response) => {
  User.findByID(request.params.idUser)
  .then(res => {
    if (!res) response.json(new Response(false, `Nenhum usuário com id ${request.params.idUser} foi encontrado`, null));
    response.json(new Response(true, 'Usuário encontrado com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.findByCategory = (request, response) => {
  User.findByCategory(request.params.idCategory)
  .then(res => {
    response.json(new Response(true, 'Usuário(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.findProvidersByCategories = (request, response) => {
  User.findProvidersByCategories(request.body.categoriesIds)
  .then(res => {
    response.json(new Response(true, 'Usuário(s) encontrado(s) com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.findBySubcategory = (request, response) => {
  User.findBySubcategory(request.params.idSubcategory)
  .then(res => {
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
        err.sqlMessage.indexOf("key 'cpfUser'") != -1 ? 'CPF já cadastrado.' : ''
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

exports.addSubcategory = (request, response) => {
  User.addSubcategory(request.body.idUser, request.body.idSubcategory)
  .then(res => {
    response.json(new Response(true, 'Subcategoria adicionada ao profissional com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.removeSubcategory = (request, response) => {
  User.removeSubcategory(request.params.idUser, request.params.idSubcategory)
  .then(res => {
    response.json(new Response(true, 'Subcategoria removida do profissional com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getSubcategories = (request, response) => {
  User.getSubcategories(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Subcategorias encontradas com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getCategories = (request, response) => {
  User.getCategories(request.params.id)
  .then(res => {
    response.json(new Response(true, 'Subcategorias encontradas com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.login = (request, response) => {
  User.login(request.body.email, request.body.senha)
  .then(res => {
    console.log(res);
    response.json(new Response(!!res, !res ? 'Email e/ou senha incorretos.' : 'Login válido', res));
  })
  .catch(err => {
    response.json(new Response(false));
  })
}

exports.validateToken = (request, response) => {
  User.findByID(request.idUser)
  .then(res => {
    response.json(new Response(true, 'token valido', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getLocations = (request, response) => {
  User.getLocations(request.params.idUser)
  .then(res => {
    response.json(new Response(true, 'Locais encontrados com sucesso', res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.addLocation = (request, response) => {
  User.addLocation(request.body.idUser, request.body.location)
  .then(res => {
    response.json(new Response(true, 'Local de atuação adicionado ao profissional com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}
