const mysql = require('dotenv').config();
const auth = require('./src/services/auth')

var User = require('./src/models/user.model');
var Service = require('./src/models/service.model');
var Category = require('./src/models/category.model');
var Budget = require('./src/models/budget.model');

let names = ['Alice', 'Miguel', 'Sophia', 'Arthur', 'Helena', 'Bernardo', 'Valentina', 'Heitor', 'Laura', 'Davi', 'Isabella', 'Lorenzo', 'Manuela', 'Théo', 'Júlia', 'Pedro', 'Heloísa', 'Gabriel', 'Luiza', 'Enzo', 'Maria Luiza', 'Matheus', 'Lorena', 'Lucas', 'Lívia', 'Benjamin', 'Giovanna', 'Nicolas', 'Maria Eduarda', 'Guilherme', 'Beatriz', 'Rafael', 'Maria Clara', 'Joaquim', 'Cecília', 'Samuel', 'Eloá', 'Enzo Gabriel', 'Lara', 'João Miguel', 'Maria Júlia', 'Henrique', 'Isadora', 'Gustavo', 'Mariana', 'Murilo', 'Emanuelly', 'Pedro Henrique', 'Ana Júlia', 'Pietro', 'Ana Luiza', 'Lucca', 'Ana Clara', 'Felipe', 'Melissa', 'João Pedro', 'Yasmin', 'Isaac', 'Maria Alice', 'Benício', 'Isabelly', 'Daniel', 'Lavínia', 'Anthony', 'Esther', 'Leonardo', 'Sarah', 'Davi Lucca', 'Elisa', 'Bryan', 'Antonella', 'Eduardo', 'Rafaela', 'João Lucas', 'Maria Cecília', 'Victor', 'Liz', 'João', 'Marina', 'Cauã', 'Nicole', 'Antônio', 'Maitê', 'Vicente', 'Isis', 'Caleb', 'Alícia', 'Gael', 'Luna', 'Bento', 'Rebeca', 'Caio', 'Agatha', 'Emanuel', 'Letícia', 'Vinícius', 'Maria-', 'João Guilherme', 'Gabriela', 'Davi Lucas', 'Ana Laura', 'Noah', 'Catarina', 'João Gabriel', 'Clara', 'João Victor', 'Ana Beatriz', 'Luiz Miguel', 'Vitória', 'Francisco', 'Olívia', 'Kaique', 'Maria Fernanda', 'Otávio', 'Emilly', 'Augusto', 'Maria Valentina', 'Levi', 'Milena', 'Yuri', 'Maria Helena', 'Enrico', 'Bianca', 'Thiago', 'Larissa', 'Ian', 'Mirella', 'Victor Hugo', 'Maria Flor', 'Thomas', 'Allana', 'Henry', 'Ana Sophia', 'Luiz Felipe', 'Clarice', 'Ryan', 'Pietra', 'Arthur Miguel', 'Maria Vitória', 'Davi Luiz', 'Maya', 'Nathan', 'Laís', 'Pedro Lucas', 'Ayla', 'Davi Miguel', 'Ana Lívia', 'Raul', 'Eduarda', 'Pedro Miguel', 'Mariah', 'Luiz Henrique', 'Stella', 'Luan', 'Ana', 'Erick', 'Gabrielly', 'Martin', 'Sophie', 'Bruno', 'Carolina', 'Rodrigo', 'Maria Laura', 'Luiz Gustavo', 'Maria Heloísa', 'Arthur Gabriel', 'Maria Sophia', 'Breno', 'Fernanda', 'Kauê', 'Malu', 'Enzo Miguel', 'Analu', 'Fernando', 'Amanda', 'Arthur Henrique', 'Aurora', 'Luiz Otávio', 'Maria Isis', 'Carlos Eduardo', 'Louise', 'Tomás', 'Heloise', 'Lucas Gabriel', 'Ana Vitória', 'André', 'Ana Cecília', 'José', 'Ana Liz', 'Yago', 'Joana', 'Danilo']

let lastNames = ['Silva', 'Souza', 'Costa', 'Santos', 'Oliveira', 'Pereira', 'Rodrigues', 'Almeida', 'Nascimento', 'Lima', 'Araújo', 'Fernandes', 'Carvalho', 'Gomes', 'Martins', 'Rocha', 'Ribeiro', 'Alves', 'Monteiro', 'Mendes', 'Barros', 'Freitas', 'Barbosa', 'Pinto', 'Moura', 'Cavalcanti', 'Dias', 'Castro', 'Campos', 'Cardoso']

let cities = ['Olinda', 'Recife', 'Paulista', 'Igarassu', 'Afogados da Ingazeira', 'Jaboatão dos Guararapes', 'Arcoverde', 'Petrolina', 'Carpina', 'Belo Jardim', 'Gravatá', 'Caruaru', 'Goiana']

let bairros = ['Boa Viagem', 'Casa Amarela', 'Jardim Paulista', 'Mirueira', 'Janga', 'Pau Amarelo', 'Boa Vista', 'Ouro Preto', 'Rio Doce', 'Paratibe', 'Arthur Lundgren', 'Centro', 'Nobre']

let categories = {
  'Construção': ['Construção de casas', 'Construção de telhados', 'Construção de muros', 'Construção de piscinas'],
  'Hidráulica': ['Instalações hidráulicas', 'Manutenção de encanamento', 'Manutenção de piscinas', "Manutenção de bomba d'água"],
  'Reformas': ['Reformas de banheiros', 'Reformas de cozinhas', 'Reformas de escritórios', 'Reformas de imóveis'],
  'Elétrica': ['Instalações elétricas', 'Troca de disjuntores', 'Fiações elétricas', 'Iluminações', 'Quadros e painéis elétricos', 'Instalação de força elétrica']
}

  
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
  // return name.split(' ')[0] + '@gmail.com'
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


// ---------------------- CREATION ----------------------- //


// // categories 

// Object.keys(categories).forEach(async cat => {
//   console.log("INSERINDO CATEGORIA: ", cat);
//   await Category.create({ nome: cat })
//   .then(res => {
//     let id = res.insertId
//     console.log("INSERINDO SUBCATEGORIA: ", cat, ", EM: ", id);
//     categories[cat].forEach(async subcat => {
//       await Category.createSubcategory({ idCategory: id, nome: subcat })
//     })
//   })
//   .catch(err => { console.log(err) })
// })

// // users

// for (let i = 0; i < 30; i++) {
//   let name = generateName();
  
//   let user = {
//     tipoUser: i < 15 ? 1 : 2,
//     status: 'ativo',
//     cpf: generateCpf(),
//     nome: name,
//     email: generateEmail(name),
//     celular: generatePhone(),
//     dataNasc: generateBirthDate(),
//     logradouro: generateRua(),
//     numero: (rand(300) + 50),
//     complemento: "",
//     bairro: generateBairro(),
//     cidade: generateCity(),
//     uf: "PE",
//     cep: generateCep(),
//     avaliacao: Math.random() * 5,
//     senha: 'senha123'
//   }

//   User.create(user)
//   .then(async res => {
//     let id = res.insertId

//     if (user.tipoUser == 2) {
//       for (let i = 0; i < rand(4) + 1; i++) {
//         await User.addSubcategory(id, rand(17) + 1)
//       }
//       for (let i = 0; i < rand(3) + 1; i++) {
//         await User.addLocation(id, generateCity())
//       }
//     } 
//   })
//   .catch(err => { console.log(err) })
// }


// services
let a = ['Costruir', 'Consertar', 'Reparar', 'Instalar']
let f = {
  b: [' uma', ' a minha', ' minha', ''],
  c: [' casa', ' pia', ' privada', ' piscina', ' lampâda', ' cadeira', ' televisão', ' garagem'],
}
let m = {
  b: [' um', ' o meu', ' meu', ''],
  c: [' telhado', ' escritório', ' banheiro', ' disjuntor', ' chuveiro', ' portão']
}
let d = [`Lorem ipsum et dapibus mattis nostra laoreet odio fames, per congue placerat class viverra platea ut quis consectetur, rhoncus donec vitae vestibulum placerat cras tincidunt. venenatis nam mollis potenti tristique aenean molestie curabitur vulputate enim donec lectus, nam sed dictum volutpat proin commodo aenean velit augue donec, nunc aptent nunc laoreet habitant arcu mollis eget himenaeos curabitur.

Ac nunc ultricies sapien id cursus vel, donec netus volutpat habitasse auctor dictum euismod, egestas blandit sem praesent consequat. aptent integer ut egestas nec senectus primis vestibulum, curabitur ut suspendisse quis euismod nulla curabitur, curae ac primis sit class nullam.`,

`Lorem ipsum et dapibus mattis nostra laoreet odio fames, per congue placerat class viverra platea ut quis consectetur, rhoncus donec vitae vestibulum placerat cras tincidunt. `,

`Lorem ipsum et dapibus mattis nostra laoreet odio fames, per congue placerat class viverra platea ut quis consectetur, rhoncus donec vitae vestibulum placerat cras tincidunt venenatis nam mollis potenti tristique aenean molestie curabitur vulputate enim donec lectus.`,

`Lorem ipsum et dapibus mattis nostra laoreet odio fames, per congue placerat class viverra platea ut quis consectetur, rhoncus donec vitae vestibulum placerat cras tincidunt. venenatis nam mollis potenti tristique aenean molestie curabitur vulputate enim donec lectus.

Aptent integer ut egestas nec senectus primis vestibulum, curabitur ut suspendisse quis euismod nulla curabitur, curae ac primis sit class nullam.`,
]

for (let i = 0; i < 15; i++) {
  for (let j = 0; j < rand(3)+1; j++) {
    let service = {
      idUser: i,
      nome: `${a[rand(3)]}${yesNo() ? f.b[rand(3)] + f.c[rand(7)] : f.b[rand(3)] + f.c[rand(7)]} ${yesNo() ? '' : 'e mais outra coisa'}`,
      descricao: d[rand(3)],
      price: 10,
      dataPublic: new Date(),
      status: 'aberto'
    }
    Service.create(service)
    .then(res => {
      let id = res.insertId

      Service.addLocation(id, { 
        uf: "PE",
        logradouro: generateRua(),
        numero: rand(200) + 10,
        complemento: '',
        bairro: generateBairro(),
        cidade: generateCity(),
        cep: generateCep()
      })
      for (let index = 0; index < rand(3) + 1; index++) {
        Service.addSubcategory(id, rand(17) + 1)      
      }
    }).catch(err => { console.log(err) })
  }
}


// for (let i = 0; i < 15; i++) {
//   for (let j = 0; j < rand(3)+1; j++) {
//     let budget = {
//       idProvider: rand(10),
//       idService: i,
//       descricao: "Lorem ipsum dolor sic mundus creatus est. Imagine que este é um texto bastante longo.",
//       dataFinal: "2020-12-10 12:54"
//     }
//     Budget.create(budget)
//     .then().catch(err => { console.log(err) })
//   }
// }

// for (let i = 0; i < 15; i++) {
//   for (let j = 0; j < rand(3); j++) {
//     Service.addCategory(rand(10), rand(10))
//     .then().catch(err => { console.log(err) })
//   }
// }