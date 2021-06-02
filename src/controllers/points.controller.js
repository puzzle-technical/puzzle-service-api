const Points = require('../models/points.model');
const User = require('../models/user.model');
const Response = require('../utills/response')

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

exports.payment = async (request, response) => {
  let { paymentId, amount, quantity, email, idUser } = request.body
  
  Points.handlePayment(paymentId, amount, quantity, email)
  .then(payment => {
    User.addPuzzlePoints(idUser, quantity)
    .then(res => {
      response.json(new Response(true, 'Operação bem sucedida', payment))
    })
    .catch(err => {
      console.log(err)
      response.json(new Response(false))
    })
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false))
  })
}