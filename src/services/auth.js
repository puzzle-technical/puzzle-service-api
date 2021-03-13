const crypto = require('crypto')

const gerarSalt = (length = 16) => crypto.randomBytes(Math.ceil(length/2)).toString('hex').slice(0,16)

module.exports.combineSenhaSalt = (senha, salt) => {
    var hash = crypto.createHmac('sha512', salt)
    hash.update(senha)
    var senha = hash.digest('hex')
    return { salt, senha }
}

module.exports.gerarSenha = (senha) => {
    var salt = gerarSalt()
    var senhaESalt = this.combineSenhaSalt(senha, salt)
    return senhaESalt
}