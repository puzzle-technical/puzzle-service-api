const Points = require('../models/points.model')
const Response = require('../utills/response')
const wrap = require('../utills/wrap')

exports.getServicePoints = (request, response) => {
  let points = Points.getServicePoints()
  response.json(new Response(true, 'Pontos por serviço encontrado com sucesso', points))
}

exports.getPointsPrice = (request, response) => {
  let price = Points.getPointsPrice()
  response.json(new Response(true, 'Preço encontrado com sucesso', price))
}

exports.getPacks = (request, response) => {
  let packs = Points.getPacks()
  response.json(new Response(true, 'Pacotes encontrados com sucesso', packs))
}

exports.createCheckoutSession = (request, response) => {
  wrap(response, Points.createCheckoutSession(request.body.idPack, request.body.email), 'Sessão criada com sucesso')  
}