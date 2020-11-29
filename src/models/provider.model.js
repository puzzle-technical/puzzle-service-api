'use strict';
var con = require('../../config/db.config');

const Provider = function (provider) {
  this.idProvider = provider.idProvider,
  this.cpfProvider = provider.cpfProvider,
  this.nome = provider.nome,
  this.email = provider.email,
  this.celular = provider.celular,
  this.dataNasc = provider.dataNasc,
  this.logradouro = provider.logradouro,
  this.numero = provider.numero,
  this.complemento = provider.complemento,
  this.bairro = provider.bairro,
  this.cidade = provider.cidade,
  this.uf = provider.uf,
  this.cep = provider.cep,
  this.avaliacao = provider.avaliacao,
  this.senha = provider.senha
}

Provider.findAll = async() => {
  const result = await con.query('SELECT * FROM tb_providers');
  return result[0];
}

Provider.findByID = async(id) => {
  const result = await con.query('SELECT * FROM tb_providers WHERE idProvider = ?', [id]);
  if (result[0].length < 1) return null;
  return result[0][0];
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

module.exports = Provider;