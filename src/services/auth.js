require('dotenv').config()
const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const Response = require('../utills/response')

// --------- Authentication ----------- //

module.exports.gerarSalt = (length = 16) => crypto.randomBytes(Math.ceil(length / 2)).toString('hex').slice(0, 16)

module.exports.combineSenhaSalt = (senha, salt) => {
  var hash = crypto.createHmac('sha512', salt)
  hash.update(senha)
  var senha = hash.digest('hex')
  return { salt, senha }
}

module.exports.gerarSenha = (senha) => {
  var salt = this.gerarSalt()
  var senhaESalt = this.combineSenhaSalt(senha, salt)
  return senhaESalt
}


// --------- Authorization ----------- //

module.exports.verifyJWT = (req, res, next) => {
  const token = req.headers['x-access-token']
  if (!token) return res.status(401).json(new Response(false, 'No token provided'))

  jwt.verify(token, process.env.JWT_SECRET, function (err, decoded) {
    if (err) return res.status(500).json(new Response(false, 'Failed to authenticate token', err));

    req.idUser = decoded.idUser
    next()
  })
}

module.exports.generateToken = (idUser) => {
  return jwt.sign({ idUser }, process.env.JWT_SECRET, {
    expiresIn: 3000
  })
}