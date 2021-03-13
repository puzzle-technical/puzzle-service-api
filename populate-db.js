const mysql = require('dotenv').config();

var Provider = require('./src/models/provider.model');
var User = require('./src/models/user.model');
var Service = require('./src/models/service.model');
var Category = require('./src/models/category.model');
var Budget = require('./src/models/budget.model');

let names = ['Alice', 'Miguel', 'Sophia', 'Arthur', 'Helena', 'Bernardo', 'Valentina', 'Heitor', 'Laura', 'Davi', 'Isabella', 'Lorenzo', 'Manuela', 'Théo', 'Júlia', 'Pedro', 'Heloísa', 'Gabriel', 'Luiza', 'Enzo', 'Maria Luiza', 'Matheus', 'Lorena', 'Lucas', 'Lívia', 'Benjamin', 'Giovanna', 'Nicolas', 'Maria Eduarda', 'Guilherme', 'Beatriz', 'Rafael', 'Maria Clara', 'Joaquim', 'Cecília', 'Samuel', 'Eloá', 'Enzo Gabriel', 'Lara', 'João Miguel', 'Maria Júlia', 'Henrique', 'Isadora', 'Gustavo', 'Mariana', 'Murilo', 'Emanuelly', 'Pedro Henrique', 'Ana Júlia', 'Pietro', 'Ana Luiza', 'Lucca', 'Ana Clara', 'Felipe', 'Melissa', 'João Pedro', 'Yasmin', 'Isaac', 'Maria Alice', 'Benício', 'Isabelly', 'Daniel', 'Lavínia', 'Anthony', 'Esther', 'Leonardo', 'Sarah', 'Davi Lucca', 'Elisa', 'Bryan', 'Antonella', 'Eduardo', 'Rafaela', 'João Lucas', 'Maria Cecília', 'Victor', 'Liz', 'João', 'Marina', 'Cauã', 'Nicole', 'Antônio', 'Maitê', 'Vicente', 'Isis', 'Caleb', 'Alícia', 'Gael', 'Luna', 'Bento', 'Rebeca', 'Caio', 'Agatha', 'Emanuel', 'Letícia', 'Vinícius', 'Maria-', 'João Guilherme', 'Gabriela', 'Davi Lucas', 'Ana Laura', 'Noah', 'Catarina', 'João Gabriel', 'Clara', 'João Victor', 'Ana Beatriz', 'Luiz Miguel', 'Vitória', 'Francisco', 'Olívia', 'Kaique', 'Maria Fernanda', 'Otávio', 'Emilly', 'Augusto', 'Maria Valentina', 'Levi', 'Milena', 'Yuri', 'Maria Helena', 'Enrico', 'Bianca', 'Thiago', 'Larissa', 'Ian', 'Mirella', 'Victor Hugo', 'Maria Flor', 'Thomas', 'Allana', 'Henry', 'Ana Sophia', 'Luiz Felipe', 'Clarice', 'Ryan', 'Pietra', 'Arthur Miguel', 'Maria Vitória', 'Davi Luiz', 'Maya', 'Nathan', 'Laís', 'Pedro Lucas', 'Ayla', 'Davi Miguel', 'Ana Lívia', 'Raul', 'Eduarda', 'Pedro Miguel', 'Mariah', 'Luiz Henrique', 'Stella', 'Luan', 'Ana', 'Erick', 'Gabrielly', 'Martin', 'Sophie', 'Bruno', 'Carolina', 'Rodrigo', 'Maria Laura', 'Luiz Gustavo', 'Maria Heloísa', 'Arthur Gabriel', 'Maria Sophia', 'Breno', 'Fernanda', 'Kauê', 'Malu', 'Enzo Miguel', 'Analu', 'Fernando', 'Amanda', 'Arthur Henrique', 'Aurora', 'Luiz Otávio', 'Maria Isis', 'Carlos Eduardo', 'Louise', 'Tomás', 'Heloise', 'Lucas Gabriel', 'Ana Vitória', 'André', 'Ana Cecília', 'José', 'Ana Liz', 'Yago', 'Joana', 'Danilo']

let lastNames = ['Silva', 'Souza', 'Costa', 'Santos', 'Oliveira', 'Pereira', 'Rodrigues', 'Almeida', 'Nascimento', 'Lima', 'Araújo', 'Fernandes', 'Carvalho', 'Gomes', 'Martins', 'Rocha', 'Ribeiro', 'Alves', 'Monteiro', 'Mendes', 'Barros', 'Freitas', 'Barbosa', 'Pinto', 'Moura', 'Cavalcanti', 'Dias', 'Castro', 'Campos', 'Cardoso']

let cities = ['Olinda', 'Recife', 'Paulista', 'Igarassu', 'Afogados da Ingazeira', 'Jaboatão dos Guararapes', 'Arcoverde', 'Petrolina', 'Carpina', 'Belo Jardim', 'Gravatá', 'Caruaru', 'Goiana']

let bairros = ['Boa Viagem', 'Casa Amarela', 'Jardim Paulista', 'Mirueira', 'Janga', 'Pau Amarelo', 'Boa Vista', 'Ouro Preto', 'Rio Doce', 'Paratibe', 'Arthur Lundgren', 'Centro', 'Nobre']

let generateName = () => {
  let value = ''
  value += names[rand(names.length - 1)];
  value += ' ' + lastNames[rand(lastNames.length - 1)];
  return value;
}

let generateCity = () => {
  return cities[rand(cities.length - 1)];
}

let generateBairro = () => {
  return bairros[rand(bairros.length - 1)];
}

let generateRua = () => {
  return 'Rua ' + generateName();
}

let generateCpf = () => {
  let value = '';
  for (let i = 0; i < 11; i++) value+= rand(9);
  let formatted = value.replace(/^(\d{3})(\d{3})(\d{3})(\d{2}).*/, '$1.$2.$3-$4');
  return formatted;
}

let generateCep = () => {
  let value = '';
  for (let i = 0; i < 8; i++) value+= rand(9);
  let formatted = value.replace(/^(\d{2})(\d{3})(\d{3}).*/, '$1.$2-$3');
  return formatted;
}

let generateEmail = name => {
  let value = name;
  for (let i = 0; i < 3; i++) value+= rand(9);
  value += '@gmail.com';
  return value.replace(/\s/g, ''); 
}

let generatePhone = () => {
  let value = '';
  for (let i = 0; i < 11; i++) value+= rand(9);
  let formatted = value.replace(/^(\d{2})(\d{5})(\d{4}).*/, '($1) $2-$3');
  return formatted;
}

let generateBirthDate = () => {
  let year = yesNo() ? 1950 + rand(4)*10 : 1992;
  year += rand(9);
  let d = new Date(year, rand(11), rand(28));
  return d.toISOString().split('T')[0]
}

let yesNo = () => {
  return Math.random() > 0
}

let rand = (n) => {
  return Math.floor(Math.random() * n);
}


let categories = ['Construção de casas', 'Construção de telhados', 'Construção de muros', 'Construção de piscinas', 'Fornecer materiais de construção', 'Instalações elétricas', 'Instalações hidráulicas', 'Reformas de banheiros', 'Reformas de cozinhas', 'Reformas de escritórios', 'Reformas de imóveis', 'Restauração de fachadas']
for (let i = 0; i < categories.length; i++) {
  Category.create({ nome: categories[i] })
  .then().catch(err => { console.log(err) })
}

// providers 
for (let i = 0; i < 15; i++) {
  let name = generateName();
  let user = {
    cpfProvider: generateCpf(),
    nome: name,
    email: generateEmail(name),
    celular: generatePhone(),
    dataNasc: generateBirthDate(),
    logradouro: generateRua(),
    numero: (rand(300) + 50),
    complemento: "",
    bairro: generateBairro(),
    cidade: generateCity(),
    uf: "PE",
    cep: generateCep(),
    avaliacao: Math.random() * 5,
    senha: "senha"
  }

  Provider.create(user)
  .then().catch(err => { console.log(err) })
}

// users
for (let i = 0; i < 15; i++) {
  let name = generateName();
  let user = {
    cpfUser: generateCpf(),
    nome: name,
    email: generateEmail(name),
    celular: generatePhone(),
    dataNasc: generateBirthDate(),
    logradouro: generateRua(),
    numero: (rand(300) + 50),
    complemento: "",
    bairro: generateBairro(),
    cidade: generateCity(),
    uf: "PE",
    cep: generateCep(),
    avaliacao: Math.random() * 5,
    senha: "senha"
  }

  User.create(user)
  .then().catch(err => { console.log(err) })
}


for (let i = 0; i < 15; i++) {
  for (let j = 0; j < rand(3)+1; j++) {
    Provider.addCategory(i+1, rand(categories.length-1)+1)
    .then().catch(err => { console.log(err) })
  }
}

for (let i = 0; i < 15; i++) {
  for (let j = 0; j < rand(2)+1; j++) {
    let service = {
      idUser: i,
      nome: `Serviço ${i}: fazer alguma coisa ${yesNo() ? '' : 'e mais outra coisa'}`,
      descricao: "Lorem ipsum dolor sic mundus creatus est. Imagine que este é um texto bastante longo.",
      localizacao: "Rua Trinta, n 206 - Jardim Paulista - Paulista - PE",
      dataPublic: "2020-12-01 01:54"
    }
    Service.create(service)
    .then().catch(err => { console.log(err) })
  }
}


for (let i = 0; i < 15; i++) {
  for (let j = 0; j < rand(3)+1; j++) {
    let budget = {
      idProvider: rand(10),
      idService: i,
      descricao: "Lorem ipsum dolor sic mundus creatus est. Imagine que este é um texto bastante longo.",
      dataFinal: "2020-12-10 12:54"
    }
    Budget.create(budget)
    .then().catch(err => { console.log(err) })
  }
}

for (let i = 0; i < 15; i++) {
  for (let j = 0; j < rand(3); j++) {
    Service.addCategory(rand(10), rand(10))
    .then().catch(err => { console.log(err) })
  }
}