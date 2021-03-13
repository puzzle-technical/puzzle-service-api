'use strict';
var con = require('../../config/db.config');
var auth = require('../services/auth');

const Provider = function (provider) {
  this.idProvider = provider.idProvider
  this.cpfProvider = provider.cpfProvider
  this.nome = provider.nome
  this.email = provider.email
  this.celular = provider.celular
  this.dataNasc = provider.dataNasc
  this.logradouro = provider.logradouro
  this.numero = provider.numero
  this.complemento = provider.complemento
  this.bairro = provider.bairro
  this.cidade = provider.cidade
  this.uf = provider.uf
  this.cep = provider.cep
  this.avaliacao = provider.avaliacao

  let { senha, salt } = auth.gerarSenha(provider.senha)
  this.senha = senha
  this.senhaSalt = salt
}

Provider.find = async(idProvider = undefined, idCategory = undefined) => {
  let providers;

  // find by id
  if (idProvider) {
    let provider = await con.query('SELECT * FROM tb_providers WHERE idProvider = ?', [idProvider]);
    if (!provider || provider[0].length < 1) return null;
    return provider[0][0];
  }

  // find by category
  else if (idCategory) {
    providers = await con.query('SELECT p.* FROM tb_providers p, tb_categories_providers cp WHERE p.idProvider = cp.idProvider AND cp.idCategory = ?', idCategory);
    return providers[0];
  }
  
  //find all
  else {
    providers = await con.query('SELECT * FROM tb_providers');
    return providers[0];
  }
}

Provider.create = async (provider) => {
  const newProvider = new Provider(provider);

  const result = await con.query('INSERT INTO tb_providers SET ?', newProvider);
  return result[0];
}

Provider.update = async (id, provider) => {
  const result = await con.query('UPDATE tb_providers SET ? WHERE idProvider = ?', [provider, Number(id)]);
  return result[0];
}

Provider.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_providers WHERE idProvider = ?', [id]);
  return result[0];
}

Provider.getCategories = async (idProvider) => {
  let categories = await con.query('SELECT c.idCategory, c.nome FROM tb_categories_providers cp, tb_categories c WHERE c.idCategory = cp.idCategory AND cp.idProvider = ?', [idProvider]);
  return categories = categories[0];
}

Provider.addCategory = async (idProvider, idCategory) => {
  let result = await con.query('INSERT INTO tb_categories_providers SET ?', { idProvider, idCategory })
  return result;
}

Provider.removeCategory = async (idProvider, idCategory) => {
  let result = await con.query('DELETE FROM tb_categories_providers WHERE idProvider = ? AND idCategory = ?', [idProvider, idCategory]);
  return result;
}

Provider.validateLogin = async (email, senha) => {
  const result = await con.query('SELECT * FROM tb_providers WHERE email = ?', [email])
  if (!result[0].length) return false
  let provider = result[0][0]
  return provider.senha == auth.combineSenhaSalt(senha, provider.senhaSalt).senha
}

module.exports = Provider;