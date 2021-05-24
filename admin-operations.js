const mysql = require('dotenv').config();
const auth = require('./src/services/auth')

var Admin = require('./src/models/admin.model');

const create = async (nome, email, senha) => {
  let admin = {
    nome: nome,
    email: email,
    senha: senha
  }
  await Admin.create(admin)
  .then(() => { console.log('Admin criado com sucesso!') })
  .catch(err => console.log(err))
}

console.log(process.argv);

switch (process.argv[2]) {
  case 'create':
    create(process.argv[3], process.argv[4], process.argv[5])
  default:
    break
}