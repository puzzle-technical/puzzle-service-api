const con = require('../../config/db.config')
const auth = require('../services/auth')
const Points = require('./points.model')

const User = function (user) {
  this.idUser = user.idUser
  this.tipoUser = user.tipoUser
  this.status = user.status
  this.cpf = user.cpf
  this.nome = user.nome
  this.email = user.email.toLowerCase()
  this.celular = user.celular
  this.dataNasc = user.dataNasc
  this.logradouro = user.logradouro
  this.numero = user.numero
  this.complemento = user.complemento
  this.bairro = user.bairro
  this.cidade = user.cidade
  this.uf = user.uf
  this.cep = user.cep
  this.avaliacao = user.avaliacao
  this.infoAdicional = user.infoAdicional
  this.puzzlePoints = user.puzzlePoints || 0
  this.avatar = user.avatar

  let { senha, salt } = auth.gerarSenha(user.senha)
  this.senha = senha
  this.senhaSalt = salt
}

User.findByID = async (idUser) => {
  let user = await con.query('SELECT * FROM tb_users WHERE idUser = ?', [
    idUser,
  ])
  if (!user || user[0].length < 1) return null
  return user[0][0]
}

User.findProvidersBySubcategories = async (subcategoriesIds) => {
  let users = await con.query(
    `SELECT DISTINCT u.* FROM tb_users u, tb_users_subcategories us WHERE u.idUser = us.idUser AND us.idSubcategory IN (${con.escape(
      subcategoriesIds
    )})`
  )
  return users[0]
}

User.findByCategory = async (idCategory) => {
  users = await con.query(
    'SELECT DISTINCT u.* FROM tb_users u, tb_subcategories s, tb_users_subcategories uc WHERE u.idUser = uc.idUser AND uc.idSubcategory = s.idSubcategory AND s.idCategory = ?',
    idCategory
  )
  return users[0]
}

User.findBySubcategory = async (idSubcategory) => {
  users = await con.query(
    'SELECT DISTINCT u.* FROM tb_users u, tb_subcategories s, tb_users_subcategories uc WHERE u.idUser = uc.idUser AND uc.idSubcategory = s.idSubcategory AND s.idSubcategory = ?',
    idSubcategory
  )
  return users[0]
}

User.findByType = async (tipoUser = 1) => {
  let user = await con.query(
    'SELECT * FROM tb_users WHERE status = 2 AND tipoUser = ?',
    [tipoUser]
  )
  return user[0]
}

User.create = async (user) => {
  const newUser = new User(user)

  const result = await con.query('INSERT INTO tb_users SET ?', newUser)
  return result[0]
}

User.update = async (id, user) => {
  // console.log(user);
  if (Object.keys(user).includes('senha')) {
    let { senha, salt } = auth.gerarSenha(user.senha)
    user.senha = senha
    user.senhaSalt = salt
  }
  const result = await con.query('UPDATE tb_users SET ? WHERE idUser = ?', [
    user,
    Number(id),
  ])
  console.log(result)
  return result[0]
}

User.updatePassword = async (id, password) => {
  let { senha, salt } = auth.gerarSenha(password)
  let set = { senha: senha, senhaSalt: salt }
  const result = await con.query('UPDATE tb_users SET ? WHERE idUser = ?', [
    set,
    Number(id),
  ])
  return result[0]
}

User.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_users WHERE idUser = ?', [id])
  return result[0]
}

User.getCategories = async (idUser) => {
  let categories = await con.query(
    'SELECT DISTINCT c.* FROM tb_categories c, tb_subcategories S, tb_users_subcategories us WHERE c.idCategory = s.idCategory AND s.idSubcategory = us.idSubcategory AND us.idUser = ?',
    [idUser]
  )
  return categories[0]
}

User.getSubcategories = async (idUser) => {
  let subcategories = await con.query(
    'SELECT DISTINCT s.* FROM tb_subcategories S, tb_users_subcategories us WHERE s.idSubcategory = us.idSubcategory AND us.idUser = ?',
    [idUser]
  )
  return subcategories[0]
}

User.updateSubcategories = async (idUser, subcategoriesIds) => {
  await con.query('DELETE FROM tb_users_subcategories WHERE idUser = ?', [
    idUser,
  ])
  for (let idSubcategory of subcategoriesIds) {
    await User.addSubcategory(idUser, idSubcategory)
  }
  return subcategoriesIds
}

User.addSubcategory = async (idUser, idSubcategory) => {
  let result = await con.query('INSERT INTO tb_users_subcategories SET ?', {
    idUser,
    idSubcategory,
  })
  return result
}

User.removeSubcategory = async (idUser, idSubcategory) => {
  let result = await con.query(
    'DELETE FROM tb_users_subcategories WHERE idUser = ? AND idSubcategory = ?',
    [idUser, idSubcategory]
  )
  return result
}

User.login = async (email, senha) => {
  const result = await con.query('SELECT * FROM tb_users WHERE email = ?', [
    email.toLowerCase(),
  ])
  if (!result[0].length) return 'Email e/ou senha incorretos.'
  let user = result[0][0]
  // console.log(user);
  let validPassword =
    user.senha == auth.combineSenhaSalt(senha, user.senhaSalt).senha
  if (!validPassword) return 'Email e/ou senha incorretos.'
  let validStatus = user.status.toLowerCase() == 'ativo'
  if (!validStatus)
    return 'Esta conta está esperando aprovação. Quando ela for aprovada você receberá um email de confirmação.'
  return { user, token: auth.generateToken(user.idUser) }
}

User.getLocations = async (idUser) => {
  const result = await con.query(
    'SELECT * FROM `tb_users_locations` WHERE `idUser` = ?',
    [idUser]
  )
  // console.log(result)
  return result[0]
}

User.addLocation = async (idUser, nome) => {
  let result = await con.query('INSERT INTO tb_users_locations SET ?', {
    idUser,
    nome,
  })
  return result
}

User.updateLocations = async (idUser, locations) => {
  await con.query('DELETE FROM tb_users_locations WHERE idUser = ?', [idUser])
  for (let nome of locations) {
    await User.addLocation(idUser, nome)
  }
  return locations
}

User.getOpenedServices = async (idUser) => {
  let result = await con.query(
    'SELECT s.* FROM tb_services s, tb_users_openedservices os WHERE s.idService = os.idService AND os.idUser = ? AND s.status = ?',
    [idUser, 'aberto']
  )
  return result[0]
}

User.addOpenedService = async (idUser, idService) => {
  await con.query('INSERT INTO tb_users_openedservices SET ?', {
    idUser,
    idService,
  })
}

User.openService = async (idUser, idService) => {
  let neededPoints = Points.getServicePoints()
  let resultUserPoints = await con.query(
    `SELECT puzzlePoints FROM tb_users WHERE idUser = ?`,
    [idUser]
  )
  let userPoints = resultUserPoints[0][0].puzzlePoints
  // console.log(userPoints)

  await con.query(`UPDATE tb_users SET ? WHERE idUser = ?`, [
    { puzzlePoints: userPoints - neededPoints },
    idUser,
  ])

  let result = await con.query(`INSERT INTO tb_users_openedservices SET ?`, {
    idUser,
    idService,
  })
  return result
}

User.restorePassword = async (email) => {
  let user = await con.query('SELECT * FROM tb_users WHERE email = ?', [email])
  if (!user || user[0].length < 1) return 'USER_NOT_FOUND'
  user = user[0][0]

  let password = 'PZ1' + auth.gerarSalt(5)
  User.updatePassword(user.idUser, password)
  return password
}

User.addPuzzlePoints = async (idUser, points) => {
  let result = await con.query(
    `UPDATE tb_users SET puzzlePoints = puzzlePoints + ${points} WHERE idUser = ${idUser}`
  )
  return result[0]
}

User.checkRatingExists = async (idRatedUser, idEvaluatorUser) => {
  let result = await con.query(
    `SELECT * FROM tb_users_ratings WHERE idRatedUser = ${idRatedUser} AND idEvaluatorUser = ${idEvaluatorUser}`
  )
  // console.log(result[0]);
  return !!(result[0] && result[0].length)
}

User.getRating = async (idRatedUser) => {
  let average = await con.query(
    `SELECT AVG(value) FROM tb_users_ratings WHERE idRatedUser = ?`,
    [idRatedUser]
  )
  let count = await con.query(
    `SELECT COUNT(value) FROM tb_users_ratings WHERE idRatedUser = ?`,
    [idRatedUser]
  )
  average = average[0][0]['AVG(value)']
  count = count[0][0]['COUNT(value)']
  return {
    average,
    count,
  }
}

User.addRating = async (rating) => {
  let result = await con.query(`INSERT INTO tb_users_ratings SET ?`, rating)
  return result[0]
}

User.updateRating = async (rating) => {
  let { idRatedUser, idEvaluatorUser, value } = rating
  let result = await con.query(
    `UPDATE tb_users_ratings SET ? WHERE idRatedUser = ${idRatedUser} AND idEvaluatorUser = ${idEvaluatorUser}`,
    { value }
  )
  return result[0]
}

User.deleteRating = async (rating) => {
  let { idRatedUser, idEvaluatorUser } = rating
  let result = await con.query(
    `DELETE FROM tb_users_ratings WHERE idRatedUser = ${idRatedUser} AND idEvaluatorUser = ${idEvaluatorUser}`
  )
  return result[0]
}

module.exports = User
