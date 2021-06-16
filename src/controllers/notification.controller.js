const Notification = require('../models/notification.model')
const Response = require('../utills/response')

exports.findByUser = (request, response) => {
  Notification.findByUser(request.params.idUser)
    .then((res) => {
      response.json(
        new Response(true, 'Notificações encontradas com sucesso', res)
      )
    })
    .catch((err) => {
      console.log(err)
      response.json(new Response(false))
    })
}

exports.create = (request, response) => {
  Notification.create(request.body)
    .then((res) => {
      response.json(new Response(true, 'Notificação criada com sucesso', res))
    })
    .catch((err) => {
      console.log(err)
      response.json(new Response(false))
    })
}

exports.update = (request, response) => {
  Notification.update(request.params.idUser, request.body)
    .then((res) => {
      response.json(
        new Response(true, 'Notificação atualizada com sucesso', res)
      )
    })
    .catch((err) => {
      console.log(err)
      response.json(new Response(false))
    })
}
