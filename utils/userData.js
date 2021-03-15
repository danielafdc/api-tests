const faker = require('faker')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

module.exports = {
    dadosDoUsuario: () => {
        return {
            nome: faker.name.firstName() + ' ' + faker.name.lastName(),
            email: faker.internet.email(),
            password: faker.internet.password(),
            administrador: 'false'
        }
    },

    criarUsuario: async (usuario) => {
        const response_user = await testServer.post(rota.rotaUsuarios)
            .send(usuario)
            
        return responseUser
    }
}
