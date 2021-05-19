var con = require('../../config/db.config');

const Service = function(service) {
  this.idService = service.idService;
  this.nome = service.nome;
  this.status = service.status;
  this.descricao = service.descricao;
  this.dataPublic = service.dataPublic;
  this.idUser = service.idUser;
  this.receivers = service.receivers;
  this.receiversOnly = service.receiversOnly;
}

Service.findById = async (idService) => {
  let result = await con.query(`SELECT * FROM tb_services WHERE idService = ${idService}`)
  return result[0][0]
}

Service.findByUser = async (idUser) => {
  let result = await con.query(`SELECT * FROM tb_services WHERE idUser = ${idUser}`)
  return result[0]
}

Service.findToProvider = async (idUser) => {
  let result = await con.query(`SELECT * FROM tb_services WHERE receivers LIKE "%${idUser};%" AND idService NOT IN (SELECT idService FROM tb_users_openedservices WHERE idUser = ${idUser})`)
  return result[0];
}

Service.findBySubcategories = async (subcategoriesIds) => {
  let result = await con.query(`SELECT DISTINCT s.* FROM tb_services s, tb_subcategories_services ss WHERE s.idService = ss.idService AND ss.idSubcategory IN (${con.escape(subcategoriesIds)})`);
  return result[0];
}

Service.findByLocations = async (nomes) => {
  let result = await con.query(`SELECT DISTINCT s.* FROM tb_services s, tb_services_locations sl WHERE s.idService = sl.idService AND sl.cidade IN (${con.escape(nomes)})`);
  return result[0];
}

Service.getSubcategories = async (idService) => {
  let categories = await con.query(`SELECT s.* FROM tb_subcategories_services ss, tb_subcategories s WHERE ss.idSubcategory = s.idSubcategory AND ss.idService = ${idService}`);
  return categories = categories[0];
}

Service.getLocation = async (idService) => {
  let locations = await con.query(`SELECT * FROM tb_services_locations WHERE idService = ${idService}`);
  return locations = locations[0][0];
}

Service.create = async (service) => {
  const newService = new Service(service);
  const result = await con.query('INSERT INTO tb_services SET ?', newService);
  return result[0];
}

Service.addSubcategories = async (idService, subcategoriesIds) => {
  if (!subcategoriesIds.length) return []
  let values = subcategoriesIds.map(id => `(${id}, ${idService})`).join(', ')
  let result = await con.query(`INSERT INTO tb_subcategories_services (idSubcategory, idService) VALUES ${values}`)
  return result[0];
}

Service.addLocation = async (idService, location) => {
  let loc = { ...location, idService }
  let result = await con.query('INSERT INTO tb_services_locations SET ?', loc)
  return result;
}

Service.update = async (idService, service) => {
  const result = await con.query(`UPDATE tb_services SET ? WHERE idService = ${idService}`, [service]);
  return result[0];
}

Service.updateLocation = async (idService, location) => {
  const result = await con.query(`UPDATE tb_services_locations SET ? WHERE idService = ${idService}`, [location]);
  return result[0];
}

Service.replaceSubcategories = async (idService, subcategoriesIds) => {
  const result = await con.query(`DELETE FROM tb_subcategories_services WHERE idService = ${idService}`);
  await Service.addSubcategories(idService, subcategoriesIds)
  return result[0];
}

Service.delete = async (idService) => {
  const result = await con.query(`DELETE FROM tb_services WHERE idService = ${idService}`);
  return result[0];
}


module.exports = Service;