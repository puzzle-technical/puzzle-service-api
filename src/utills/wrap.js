const Response = require('./response')

const wrap = async (response, action, successMessage, failureMessage) => {
  await action
  .then(res => {
    response.json(new Response(true, successMessage, res))
  })
  .catch(err => {
    console.log(err)
    response.json(new Response(false, failureMessage));
  })
}

module.exports = wrap