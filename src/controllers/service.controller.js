const Service = require('../models/service.model')
const wrap = require('../utills/wrap')
const Response = require('../utills/response')

exports.findById = (request, response) => {
  wrap(response, Service.findById(request.params.idService), 'Serviço encontrado com sucesso')
}

exports.findByUser = (request, response) => {
  wrap(response, Service.findByUser(request.params.idUser), 'Serviços encontrados com sucesso')
}

exports.findToProvider = (request, response) => {
  wrap(response, Service.findToProvider(request.params.idUser), 'Serviços encontrados com sucesso')
}

exports.findBySubcategories = (request, response) => {
  let subcategoriesIds
  try { subcategoriesIds = JSON.parse(request.params.subcategoriesIds) }
  catch (error) { console.log(err); return response.send(new Response(false)) }
  wrap(response, Service.findBySubcategories(subcategoriesIds), 'Serviços encontrados com sucesso')
}

exports.findByLocations = (request, response) => {
  let nomes
  try { nomes = JSON.parse(request.params.nomes) }
  catch (error) { console.log(err); return response.send(new Response(false)) }
  wrap(response, Service.findByLocations(nomes), 'Serviços encontrados com sucesso')
}

exports.getSubcategories = (request, response) => {
  wrap(response, Service.getSubcategories(request.params.idService), 'Subcategorias encontradas com sucesso')
}

exports.getLocation = (request, response) => {
  wrap(response, Service.getLocation(request.params.idService), 'Locais encontrados com sucesso')
}

exports.create = (request, response) => {
  wrap(response, Service.create(request.body.service), 'Serviço criado com sucesso.')
}

exports.addSubcategories = (request, response) => {
  wrap(response, Service.addSubcategories(request.params.idService, request.body.subcategoriesIds), 'Subcategoria adicionadas com sucesso')
}

exports.addLocation = (request, response) => {
  wrap(response, Service.addLocation(request.params.idService, request.body.location), 'Local adicionado com sucesso')
}

exports.update = (request, response) => {
  wrap(response, Service.update(request.params.idService, request.body.service), 'Serviço atualizado com sucesso')
}

exports.updateLocation = (request, response) => {
  wrap(response, Service.updateLocation(request.params.idService, request.body.location), 'Local do serviço atualizado com sucesso')
}

exports.replaceSubcategories = (request, response) => {
  wrap(response, Service.replaceSubcategories(request.params.idService, request.body.subcategoriesIds), 'Subcategorias do serviço atualizadas com sucesso')
}

exports.delete = (request, response) => {
  wrap(response, Service.delete(request.params.idService), 'Serviço removido com sucesso')
}