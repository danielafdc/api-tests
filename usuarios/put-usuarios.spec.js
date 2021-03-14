const testServer = require('../utils/testServer')
const faker = require('faker')

const rotaUsuarios = '/usuarios'
var user_id

const novoUsuarioSucesso = {
    nome: faker.name.firstName() + ' ' + faker.name.lastName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    administrador: `${faker.random.boolean()}`
}

beforeAll( async (done) => {
const response_user = await testServer.post(rotaUsuarios)
      .send(novoUsuarioSucesso);

user_id = await response_user.body._id
done()
})

describe('Editar um usuário através da rota PUT', () => {
  it('Editar um usuário com sucesso', async () => {
    const response = await testServer.put(rotaUsuarios + '/' + user_id)
      .send({'nome': 'Nome alterado',
            'email': novoUsuarioSucesso.email,
            'password': novoUsuarioSucesso.password,
            'administrador': novoUsuarioSucesso.administrador
            })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Registro alterado com sucesso')
  })
})