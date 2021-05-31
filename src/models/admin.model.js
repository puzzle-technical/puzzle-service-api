'use strict';
var con = require('../../config/db.config');
const auth = require('../services/auth')

const Admin = function(admin) {
  this.idAdmin = admin.idAdmin
  this.nome = admin.nome
  this.email = admin.email

  let { senha, salt } = auth.gerarSenha(admin.senha)
  this.senha = senha
  this.senhaSalt = salt
}


Admin.findByID = async (idAdmin) => {
  let user = await con.query('SELECT * FROM tb_admin WHERE idAdmin = ?', [idAdmin]);
  if (!user || user[0].length < 1) return null;
  return user[0][0];
}

Admin.create = async (admin) => {
  const newAdmin = new Admin(admin);

  const result = await con.query('INSERT INTO tb_admin SET ?', newAdmin);
  return result[0];
}

Admin.login = async (email, senha) => {
  const result = await con.query('SELECT * FROM tb_admin WHERE email = ?', [email.toLowerCase()])
  if (!result[0].length) return false
  let user = result[0][0]

  let validPassword = user.senha == auth.combineSenhaSalt(senha, user.senhaSalt).senha
  return validPassword ? { user, token: auth.generateToken(user.idUser) } : false
}

Admin.findActiveUsers = async () => {
  const result = await con.query(`SELECT * FROM tb_users WHERE status = 'ativo'`)
  return result[0]
}

Admin.findPendingUsers = async () => {
  const result = await con.query(`SELECT * FROM tb_users WHERE status = 'pendente'`)
  return result[0]
}


module.exports = Admin