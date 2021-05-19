const User = require('../models/user.model')
const path = require('path')
const wrap = require('../utills/wrap')
const Response = require('../utills/response')


exports.findByID = (request, response) => {
  wrap(response, User.findByID(request.params.idUser), 'Usuário encontrado com sucesso')
}

exports.findByType = (request, response) => {
  wrap(response, User.findByType(request.params.tipoUser), 'Usuários encontrados com sucesso')
}

exports.findBySubcategories = (request, response) => {
  let subcategoriesIds
  try { subcategoriesIds = JSON.parse(request.params.subcategoriesIds) }
  catch (error) { console.log(err); return response.send(new Response(false)) }
  wrap(response, User.findBySubcategories(subcategoriesIds), 'Usuários encontrados com sucesso')
}

exports.findByLocations = (request, response) => {
  let nomes
  try { nomes = JSON.parse(request.params.nomes) }
  catch (error) { console.log(err); return response.send(new Response(false)) }
  wrap(response, User.findByLocations(nomes), 'Usuários encontrados com sucesso')
}

exports.getSubcategories = (request, response) => {
  wrap(response, User.getSubcategories(request.params.idUser), 'Subcategorias encontradas com sucesso')
}

exports.getLocations = (request, response) => {
  wrap(response, User.getLocations(request.params.idUser), 'Locais encontrados com sucesso')
}

exports.getOpenedServices = (request, response) => {
  wrap(response, User.getOpenedServices(request.params.idUser), 'Serviços encontrados com sucesso')
}

exports.create = (request, response) => {
  User.create(request.body.user)
  .then(res => { response.json(new Response(true, 'Usuário criado com sucesso', res)) })
  .catch(err => {
    console.log(err)
    if (err.code == 'ER_DUP_ENTRY') {
      let feedback = err.sqlMessage.indexOf("key 'email'") != -1 ? 'Email já cadastrado.' :
        err.sqlMessage.indexOf("key 'cpfUser'") != -1 ? 'CPF já cadastrado.' : ''
      return response.json(new Response(false, feedback))
    }
    response.json(new Response(false));
  })
}

exports.login = (request, response) => {
  User.login(request.body.email, request.body.senha)
  .then(res => { response.json(new Response(!!res, !res ? 'Email e/ou senha incorretos.' : 'Login válido', res)) })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.validateToken = (request, response) => {
  wrap(response, User.findByID(request.idUser), 'Token válido')
}

exports.addSubcategories = (request, response) => {
  wrap(response, User.addSubcategories(request.params.idUser, request.body.subcategoriesIds), 'Subcategorias adicionadas ao profissional com sucesso')
}

exports.addLocations = (request, response) => {
 wrap(response, User.addLocations(request.params.idUser, request.body.nomes), 'Local de atuação adicionado ao profissional com sucesso')
}

exports.addAvatar = (request, response) => {
  if (!request.files || !Object.keys(request.files).length) {
    return response.json(new Response(false, 'Nenhum arquivo enviado'));
  }
  User.findByID(request.params.idUser)
  .then(res => {
    if (!res) return response.json(new Response(false, `Nenhum usuário com id ${request.params.idUser} foi encontrado`, null));

    let samplefile = request.files.avatar
    let imageType = samplefile.name.split('.')[1]
    let uploadPath = path.join(__dirname, `../../public/img/users/user_${request.params.idUser}.${imageType}`)
    
    samplefile.mv(uploadPath, function(err) {
      if (err) {
        console.log(err)
        return response.json(new Response(false));
      }
  
      User.update(request.params.idUser, { avatar: `${process.env.APP_HOST}:${process.env.APP_PORT}/img/users/user_${request.params.idUser}.${imageType}` })
      response.json(new Response(true, 'Arquivo enviado com sucesso'));
    })
  })  
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.addOpenedService = (request, response) => {
  wrap(response, User.addOpenedService(request.params.idUser, request.body.idService), 'Serviço salvo com sucesso')
}

exports.update = (request, response) => {
  wrap(response, User.update(request.params.idUser, request.body.user), 'Informações atualizadas com sucesso')
}

exports.replaceSubcategories = (request, response) => {
  wrap(response, User.replaceSubcategories(request.params.idUser, request.body.subcategoriesIds), 'Subcategorias atualizadas com sucesso')
}

exports.replaceLocations = (request, response) => {
  wrap(response, User.replaceLocations(request.params.idUser, request.body.nomes), 'Locais de atuação atualizados com sucesso')
}

exports.delete = (request, response) => {
  wrap(response, User.delete(request.params.idUser))
}
