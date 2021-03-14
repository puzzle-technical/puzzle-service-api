'use strict';
var con = require('../../config/db.config');
var auth = require('../services/auth');

const User = function (user) {
  this.idUser = user.idUser
  this.cpfUser = user.cpfUser
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

User.find = async(idUser = undefined) => {
  let result;
  
  if (idUser) {
    result = await con.query('SELECT * FROM tb_users WHERE idUser = ?', [idUser]);
    if (result[0].length < 1) return null;
    return result[0][0];
  }  

  result = await con.query('SELECT * FROM tb_users');
  return result[0];
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

User.validateLogin = async (email, senha) => {
  const result = await con.query('SELECT * FROM tb_users WHERE email = ?', [email.toLowerCase()])
  if (!result[0].length) return false
  let user = result[0][0]
  return user.senha == auth.combineSenhaSalt(senha, user.senhaSalt).senha
}

User.uploadPicture = async (id, file) => {
  let uploadPath = `uploads/images/users/user_${id}.${file.name.split('.')[1]}`;
  await file.mv(uploadPath, function(err) {
    if (err) throw err
  })
  return true
}

module.exports = User;