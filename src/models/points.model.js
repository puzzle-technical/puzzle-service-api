const stripe = require('stripe')(process.env.STRIPE_SECRET)

// CONSTANTS //
const servicePoints = 10
const pointsRealPrice = 0.025

const packs = [
  {
    idPack: 0,
    name: 'pack1',
    quantity: 200,
    backgroundImage: `${process.env.APP_HOST}:${process.env.APP_PORT}/img/icons/puzzlePoint.png`,
    price: 500,
    discount: 0
  },
  {
    idPack: 1,
    name: 'pack2',
    quantity: 600,
    backgroundImage: `${process.env.APP_HOST}:${process.env.APP_PORT}/img/icons/puzzlePoint_2.png`,
    price: 1425,
    discount: 5
  },
  {
    idPack: 2,
    name: 'pack3',
    quantity: 800,
    backgroundImage: `${process.env.APP_HOST}:${process.env.APP_PORT}/img/icons/puzzlePoint_3.png`,
    price: 1800,
    discount: 10
  }
]

const Points = function() {}

Points.getServicePoints = () => servicePoints

Points.getPointsPrice = () => pointsRealPrice

Points.getPacks = () => packs

Points.handlePayment = async (paymentId, amount, quantity, email) => {
  return stripe.paymentIntents.create({
    amount,
    currency: 'BRL',
    description: `PuzzlePoints [${quantity}]`,
    payment_method: paymentId,
    receipt_email: email,
    confirm: true,
  })
}

module.exports = Points