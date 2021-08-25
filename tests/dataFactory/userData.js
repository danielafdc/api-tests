const faker = require('faker')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

module.exports = {
  dadosDoUsuarioComum: () => {
    return {
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'false'
    }
  },

  dadosDoUsuarioAdmin: () => {
    return {
      nome: faker.name.firstName() + ' ' + faker.name.lastName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      administrador: 'true'
    }
  },

  criarUsuario: async (usuario) => {
    const responseUser = await testServer.post(rota.rotaUsuarios)
      .send(usuario)
    return responseUser
  }
}
