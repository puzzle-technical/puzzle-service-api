const stripe = require('../services/stripe')

// CONSTANTS //
const servicePoints = 10
const pointsRealPrice = 0.025

const packs = [
  {
    idPack: 0,
    name: 'pack1',
    amount: 200,
    backgroundImage: `${process.env.APP_HOST}:${process.env.APP_PORT}/img/icons/puzzlePoint.png`,
    price: 500,
    discount: 0
  },
  {
    idPack: 1,
    name: 'pack2',
    amount: 600,
    backgroundImage: `${process.env.APP_HOST}:${process.env.APP_PORT}/img/icons/puzzlePoint_2.png`,
    price: 1425,
    discount: 5
  },
  {
    idPack: 2,
    name: 'pack3',
    amount: 800,
    backgroundImage: `${process.env.APP_HOST}:${process.env.APP_PORT}/img/icons/puzzlePoint_3.png`,
    price: 1800,
    discount: 10
  }
]

const Points = function() {}

Points.getServicePoints = () => servicePoints

Points.getPointsPrice = () => pointsRealPrice

Points.getPacks = () => packs

Points.createCheckoutSession = async (idPack, user) => {
  let pack = packs.find(el => el.idPack == idPack)
  if (!pack) throw Error('nenhum pack foi informado')

  const session = await stripe.createSessionOfPack(pack, user)

  return { sessionId: session.id }
}

module.exports = Points