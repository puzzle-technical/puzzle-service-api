const con = require('../../config/db.config');
const auth = require('../services/auth');
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
  this.puzzlePoints = user.puzzlePoints
  this.infoAdicional = user.infoAdicional

  let { senha, salt } = auth.gerarSenha(user.senha)
  this.senha = senha
  this.senhaSalt = salt
}

const userBasicInfo = ['idUser', 'tipoUser', 'nome', 'email', 'celular', 'avaliacao', 'puzzlePoints', 'infoAdicional']
const userAdressInfo = ['logradouro', 'numero', 'complemento', 'bairro', 'cidade', 'uf', 'cep']
const userFullInfo = userBasicInfo.concat(userAdressInfo)
const userInfoPrefix = (prefix, info) => info.map(key => `${prefix}.${key}`)

User.findByID = async (idUser) => {
  let user = await con.query(`SELECT ${userFullInfo} FROM tb_users WHERE status = 2 AND idUser = ${idUser}`);
  if (!user[0] || user[0].length < 1) return null;
  return user[0][0];
}

User.findByType = async (tipoUser) => {
  let user = await con.query(`SELECT ${userFullInfo} FROM tb_users WHERE status = 2 AND tipoUser = ${tipoUser}`);
  return user[0];
}

User.findBySubcategories = async (subcategoriesIds) => {
  let users = await con.query(`SELECT DISTINCT ${userInfoPrefix('u', userFullInfo)} FROM tb_users u, tb_users_subcategories us WHERE u.idUser = us.idUser AND us.idSubcategory IN (${con.escape(subcategoriesIds)})`);
  return users[0];
}

User.findByLocations = async (nomes) => {
  let users = await con.query(`SELECT DISTINCT ${userInfoPrefix('u', userFullInfo)} FROM tb_users u, tb_users_locations ul WHERE u.idUser = ul.idUser AND ul.nome IN (${con.escape(nomes)})`);
  return users[0];
}

User.getSubcategories = async (idUser) => {
  let subcategories = await con.query(`SELECT DISTINCT s.* FROM tb_subcategories S, tb_users_subcategories us WHERE s.idSubcategory = us.idSubcategory AND us.idUser = ${idUser}`);
  return subcategories[0];
}

User.getLocations = async (idUser) => {
  const result = await con.query(`SELECT * FROM tb_users_locations WHERE idUser = ${idUser}`)
  return result[0]
}

User.getOpenedServices = async (idUser) => {
  let result = await con.query(`SELECT s.* FROM tb_services s, tb_users_openedservices os WHERE s.idService = os.idService AND os.idUser = ${idUser}`)
  return result[0]
}

User.create = async (user) => {
  const newUser = new User(user);
  const result = await con.query('INSERT INTO tb_users SET ?', newUser);
  return result[0];
}

User.login = async (email, senha) => {
  const result = await con.query('SELECT * FROM tb_users WHERE email = ?', [email.toLowerCase()])
  if (!result[0].length) return false
  let user = result[0][0]
  // console.log(user);
  let validPassword = user.senha == auth.combineSenhaSalt(senha, user.senhaSalt).senha
  let validStatus = user.status.toLowerCase() == 'ativo'
  let returnUser = {}
  userFullInfo.forEach(key => returnUser[key] = user[key])
  return validPassword && validStatus ? { user: returnUser, token: auth.generateToken(user.idUser) } : false
}

User.addSubcategories = async (idUser, subcategoriesIds) => {
  if (!subcategoriesIds.length) return []
  let values = subcategoriesIds.map(id => `(${id}, ${idUser})`).join(', ')
  let result = await con.query(`INSERT INTO tb_users_subcategories (idSubcategory, idUser) VALUES ${values}`)
  return result[0];
}

User.addLocations = async (idUser, nomes) => {
  if (!nomes.length) return []
  let values = nomes.map(nome => `(${idUser}, "${nome}")`).join(', ')
  let result = await con.query(`INSERT INTO tb_users_locations (idUser, nome) VALUES ${values}`)
  return result[0];
}

User.addOpenedService = async (idUser, idService) => {
  let result = await con.query(`INSERT INTO tb_users_openedservices SET ?`, { idUser, idService })
  await User.addPuzzlePoints(idUser, Points.getServicePoints() * (-1))
  return result[0]
}

User.addPuzzlePoints = async (idUser, points) => {
  let result = await con.query(`UPDATE tb_users SET puzzlePoints = puzzlePoints + ${points} WHERE idUser = ${idUser}`)
  return result[0]
}

User.update = async (idUser, user) => {
  const result = await con.query(`UPDATE tb_users SET ? WHERE idUser = ${idUser}`, user);
  return result[0];
}

User.replaceSubcategories = async (idUser, subcategoriesIds) => {
  const result = await con.query(`DELETE FROM tb_users_subcategories WHERE idUser = ${idUser}`);
  await User.addSubcategories(idUser, subcategoriesIds)
  return result[0];
}

User.replaceLocations = async (idUser, nomes) => {
  const result = await con.query(`DELETE FROM tb_users_locations WHERE idUser = ${idUser}`);
  await User.addLocations(idUser, nomes)
  return result[0];
}

User.delete = async (idUser) => {
  const result = await con.query(`DELETE FROM tb_users WHERE idUser = ${idUser}`);
  return result[0];
}

module.exports = User;