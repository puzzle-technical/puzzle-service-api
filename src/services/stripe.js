const stripe = require('stripe')(process.env.STRIPE_SECRET)

exports.createSessionOfPack = async (pack, user) => stripe.checkout.sessions.create({
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