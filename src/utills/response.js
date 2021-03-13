const Response = function (success, feedback, data) {
  this.success = success
  this.feedback = feedback || 'Ocorreu algum problema. Tente novamente mais tarde.'
  this.data = data
}

module.exports = Response