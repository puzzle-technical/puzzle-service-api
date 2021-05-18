const stripe = require('stripe')(process.env.STRIPE_SECRET)

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

  const session = await stripe.checkout.sessions.create({
    payment_method_types: ['card'],
    line_items: [
      {
        price_data: {
          currency: 'brl',
          product_data: {
            name: `PuzzlePoints [${pack.amount} PuzzlePoints]`,
            images: [`https://scontent.frec13-1.fna.fbcdn.net/v/t1.6435-9/179373184_5674254885982703_3307341976631522563_n.jpg?_nc_cat=106&ccb=1-3&_nc_sid=730e14&_nc_eui2=AeH3WsQqA6pHWbwziZyDz2grRHxE0mPvu1tEfETSY--7W7-hF-Ydhqhn50BoJ1Q5XA_TgmP30B9y3r2x9l1sDHnN&_nc_ohc=Eao94b7ZsPAAX8ZIbwc&_nc_oc=AQm0yydID7Gr30qZtCvw3zQoe7DMDNG7VwPFTo-g8DpyJBTsL8I4I2-ogh89a_J4Aus&_nc_ht=scontent.frec13-1.fna&oh=5b5c321242cd7e2ec29bada7fd1deabd&oe=60C88B1B` ],
          },
          unit_amount: pack.price,
        },
        quantity: 1,
      }
    ],
    mode: 'payment',
    customer_email: user.email,
    success_url: `${process.env.APP_DOMAIN}/user/points/success`,
    cancel_url: `${process.env.APP_DOMAIN}/user/points`,
  })

  return { sessionId: session.id }
}

module.exports = Points