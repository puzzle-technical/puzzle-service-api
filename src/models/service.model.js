'use strict';
var con = require('../../config/db.config');

const Service = function(service) {
  this.idService = service.idService;
  this.nome = service.nome;
  this.descricao = service.descricao;
  this.dataPublic = service.dataPublic;
  this.idUser = service.idUser;
  this.receivers = service.receivers;
}

Service.find = async (idService = undefined) => {
  let result;
  
  if (idService) {
    result = await con.query('SELECT * FROM tb_services WHERE idService = ?', [idService]);
    if (result[0].length < 1) return null;
    return result[0][0];
  }  

  //find all
  else {
    result = await con.query('SELECT * FROM tb_services');
    return result[0];
  }
}


Service.findBySubcategories = async (subcategoriesIds) => {
  let services = await con.query(`SELECT DISTINCT s.* FROM tb_services s, tb_subcategories_services ss WHERE s.idService = ss.idService AND ss.idSubcategory IN (${con.escape(subcategoriesIds)})`)
  services = services[0];

  let result = []

  for (let service of services) {
    let subcategories = await con.query('SELECT sb.* FROM tb_subcategories sb, tb_subcategories_services ss WHERE sb.idSubcategory = ss.idSubcategory AND ss.idService = ?', [service.idService])

    let location = await con.query('SELECT * FROM tb_services_locations WHERE idService = ?', [service.idService])

    let user = await con.query('SELECT u.* FROM tb_users u, tb_services s WHERE s.idUser = u.idUser AND s.idService = ?', [service.idService])

    result.push({
      ...service,
      subcategories: subcategories[0],
      location: location[0][0],
      user: user[0][0],
    })
  }
  return result
}


Service.findByLocations = async (locations) => {
  let services = await con.query(`SELECT DISTINCT s.* FROM tb_services s, tb_services_locations sl WHERE sl.idService = s.idService AND sl.cidade IN (${con.escape(locations)})`)
  services = services[0];

  let result = []

  for (let service of services) {
    let subcategories = await con.query('SELECT sb.* FROM tb_subcategories sb, tb_subcategories_services ss WHERE sb.idSubcategory = ss.idSubcategory AND ss.idService = ?', [service.idService])

    let location = await con.query('SELECT * FROM tb_services_locations WHERE idService = ?', [service.idService])

    let user = await con.query('SELECT u.* FROM tb_users u, tb_services s WHERE s.idUser = u.idUser AND s.idService = ?', [service.idService])

    result.push({
      ...service,
      subcategories: subcategories[0],
      location: location[0][0],
      user: user[0][0],
    })
  }

  return result
}

Service.create = async (service) => {
  const newService = new Service(service);

  const result = await con.query('INSERT INTO tb_services SET ?', newService);
  return result[0];
}

Service.update = async (id, service) => {
  const result = await con.query('UPDATE tb_services SET ? WHERE idService = ?', [service, Number(id)]);
  return result[0];
}

Service.delete = async (id) => {
  const result = await con.query('DELETE FROM tb_services WHERE idService = ?', [id]);
  return result[0];
}

Service.getSubcategories = async (idService) => {
  let categories = await con.query('SELECT s.* FROM tb_subcategories_services ss, tb_subcategories s WHERE ss.idSubcategory = s.idSubcategory AND ss.idService = ?', [idService]);
  return categories = categories[0];
}

Service.getLocation = async (idService) => {
  let categories = await con.query('SELECT * FROM tb_services_locations WHERE idService = ?', [idService]);
  return categories = categories[0];
}

Service.addSubcategory = async (idService, idSubcategory) => {
  let result = await con.query('INSERT INTO tb_subcategories_services SET ?', { idService, idSubcategory })
  return result;
}

Service.removeCategory = async (idService, idCategory) => {
  let result = await con.query('DELETE FROM tb_categories_services WHERE idService = ? AND idCategory = ?', [idService, idCategory]);
  return result;
}

Service.addLocation = async (idService, location) => {
  let loc = { ...location, idService }
  let result = await con.query('INSERT INTO tb_services_locations SET ?', loc)
  return result;
}

Service.servicesToUser = async (idUser) => {
  let services = await con.query('SELECT * FROM `tb_services` WHERE `receivers` LIKE "%' + idUser + '%"')
  services = services[0];

  let result = []

  for (let service of services) {
    let subcategories = await con.query('SELECT sb.* FROM tb_subcategories sb, tb_subcategories_services ss WHERE sb.idSubcategory = ss.idSubcategory AND ss.idService = ?', [service.idService])

    let location = await con.query('SELECT * FROM tb_services_locations WHERE idService = ?', [service.idService])

    let user = await con.query('SELECT u.* FROM tb_users u, tb_services s WHERE s.idUser = u.idUser AND s.idService = ?', [service.idService])

    result.push({
      ...service,
      subcategories: subcategories[0],
      location: location[0][0],
      user: user[0][0],
    })
  }

  return result
}

module.exports = Service;