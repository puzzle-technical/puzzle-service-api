'use strict';
const User = require('../models/user.model');
const Response = require('../utills/response')
const path = require('path')
const { sendMail } = require('../services/mailer')
const { forgottenPasswordMessage } = require('../services/mailer/mail')

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
    if (!res) return response.json(new Response(false, `Nenhum usuário com id ${request.params.idUser} foi encontrado`, null));
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

exports.findProvidersBySubcategories = (request, response) => {
  User.findProvidersBySubcategories(request.body.subcategoriesIds)
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
        err.sqlMessage.indexOf("key 'cpf'") != -1 ? 'CPF já cadastrado.' : ''
      response.json(new Response(false, feedback))
      return
    }
    response.json(new Response(false));
  })
}

exports.update = (request, response) => {
  User.update(request.params.id, request.body)
  .then(res => {
    response.json(new Response(true, 'Informações atualizadas com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.updatePassword = (request, response) => {
  User.updatePassword(request.params.id, request.body.password)
  .then(res => {
    response.json(new Response(true, 'Informações atualizadas com sucesso', res));
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

exports.updateSubcategories = (request, response) => {
  User.updateSubcategories(request.body.idUser, request.body.subcategoriesIds)
  .then(res => {
    response.json(new Response(true, 'Subcategorias atualizadas com sucesso', res));
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
  User.getSubcategories(request.params.idUser)
  .then(res => {
    response.json(new Response(true, 'Subcategorias encontradas com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getCategories = (request, response) => {
  User.getCategories(request.params.idUser)
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
    response.json(new Response(typeof res != 'string', typeof res == 'string' ? res : 'Login válido', res));
  })
  .catch(err => {
    console.log(err)
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
  User.addLocation(request.body.idUser, request.body.nome)
  .then(res => {
    response.json(new Response(true, 'Local de atuação adicionado ao profissional com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.updateLocations = (request, response) => {
  User.updateLocations(request.body.idUser, request.body.locations)
  .then(res => {
    response.json(new Response(true, 'Locais de atuação atualizadas com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
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

exports.getOpenedServices = (request, response) => {
  User.getOpenedServices(request.params.idUser)
  .then(res => {
    response.json(new Response(true, 'Serviço obtidos com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.addOpenedService = (request, response) => {
  User.addOpenedService(request.body.idUser, request.body.idService)
  .then(res => {
    response.json(new Response(true, 'Subcategoria adicionada ao profissional com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.openService = (request, response) => {
  User.openService(request.body.idUser, request.body.idService)
  .then(res => {
    response.json(new Response(true, 'Serviço salvo com sucesso', res));
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.forgottenPassword = (request, response) => {
  User.restorePassword(request.body.email)
  .then(async res => {
    if (res == 'USER_NOT_FOUND') return response.json(new Response(false, 'Email não encontrado. Certifíque-se de que este é o email da sua conta na plataforma.', null))

    await sendMail(request.body.email, 'Restauração de senha', forgottenPasswordMessage(res))
    .then(res => {
      response.json(new Response(true, 'Email enviado com sucesso', null))
    })
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })
}

exports.getRating = (request, response) => {
  User.getRating(request.params.idRatedUser)
  .then(res => {
    response.json(new Response(true, 'Avaliações recebidas com sucesso.', res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })  
}

exports.addRating = (request, response) => {
  User.addRating(request.body.rating)
  .then(res => {
    response.json(new Response(true, 'Avaliação adicionada com sucesso.', res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })  
}

exports.updateRating = (request, response) => {
  User.updateRating(request.body.rating)
  .then(res => {
    response.json(new Response(true, 'Avaliação atualizada com sucesso.', res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })  
}

exports.deleteRating = (request, response) => {
  User.deleteRating(request.body.rating)
  .then(res => {
    response.json(new Response(true, 'Avaliação removida com sucesso.', res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })  
}


exports.checkRatingExists = (request, response) => {
  User.checkRatingExists(request.params.idRatedUser, request.params.idEvaluatorUser)
  .then(res => {
    response.json(new Response(true, 'Avaliação checada com sucesso.', res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false));
  })  
}