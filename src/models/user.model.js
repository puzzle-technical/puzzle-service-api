const con = require('../../config/db.config');
const auth = require('../services/auth');

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

  let { senha, salt } = auth.gerarSenha(user.senha)
  this.senha = senha
  this.senhaSalt = salt
}

User.findByID = async (idUser) => {
  let user = await con.query('SELECT * FROM tb_users WHERE idUser = ?', [idUser]);
  if (!user || user[0].length < 1) return null;
  return user[0][0];
}

User.findProvidersBySubcategories = async (subcategoriesIds) => {
  let users = await con.query(`SELECT DISTINCT u.* FROM tb_users u, tb_users_subcategories us WHERE u.idUser = us.idUser AND us.idSubcategory IN (${con.escape(subcategoriesIds)})`);
  return users[0];
}

User.findByCategory = async (idCategory) => {
  users = await con.query('SELECT DISTINCT u.* FROM tb_users u, tb_subcategories s, tb_users_subcategories uc WHERE u.idUser = uc.idUser AND uc.idSubcategory = s.idSubcategory AND s.idCategory = ?', idCategory);
  return users[0];
}

User.findBySubcategory = async (idSubcategory) => {
  users = await con.query('SELECT DISTINCT u.* FROM tb_users u, tb_subcategories s, tb_users_subcategories uc WHERE u.idUser = uc.idUser AND uc.idSubcategory = s.idSubcategory AND s.idSubcategory = ?', idSubcategory);
  return users[0];
}

User.findByType = async (tipoUser = 1) => {
  let user = await con.query('SELECT * FROM tb_users WHERE status = 2 AND tipoUser = ?', [tipoUser]);
  return user[0];
}

User.create = async (user) => {
  const newUser = new User(user);

  const result = await con.query('INSERT INTO tb_users SET ?', newUser);
  return result[0];
}

User.update = async (id, user) => {
  const result = await con.query('UPDATE tb_users SET ? WHERE idUser = ?', [user, Number(id)]);
  return result[0];
}

User.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_users WHERE idUser = ?', [id]);
  return result[0];
}

User.getCategories = async (idUser) => {
  let categories = await con.query('SELECT DISTINCT c.* FROM tb_categories c, tb_subcategories S, tb_users_subcategories us WHERE c.idCategory = s.idCategory AND s.idSubcategory = us.idSubcategory AND us.idUser = ?', [idUser]);
  return categories[0];
}

User.getSubcategories = async (idUser) => {
  let subcategories = await con.query('SELECT DISTINCT s.* FROM tb_subcategories S, tb_users_subcategories us WHERE s.idSubcategory = us.idSubcategory AND us.idUser = ?', [idUser]);
  return subcategories[0];
}

User.addSubcategory = async (idUser, idSubcategory) => {
  let result = await con.query('INSERT INTO tb_users_subcategories SET ?', { idUser, idSubcategory })
  return result;
}

User.removeSubcategory = async (idUser, idSubcategory) => {
  let result = await con.query('DELETE FROM tb_users_subcategories WHERE idUser = ? AND idSubcategory = ?', [idUser, idSubcategory]);
  return result;
}

User.login = async (email, senha) => {
  const result = await con.query('SELECT * FROM tb_users WHERE email = ?', [email.toLowerCase()])
  if (!result[0].length) return false
  let user = result[0][0]
  console.log(user);
  let validPassword = user.senha == auth.combineSenhaSalt(senha, user.senhaSalt).senha
  let validStatus = user.status.toLowerCase() == 'ativo'
  return validPassword && validStatus ? { user, token: auth.generateToken(user.idUser) } : false
}

User.getLocations = async (idUser) => {
  const result = await con.query('SELECT * FROM `tb_users_locations` WHERE `idUser` = ?', [idUser])
  // console.log(result)
  return result[0]
}

User.addLocation = async (idUser, nome) => {
  let result = await con.query('INSERT INTO tb_users_locations SET ?', { idUser, nome })
  return result;
}

module.exports = User;