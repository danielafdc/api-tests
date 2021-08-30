const user = require('../../dataFactory/userData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')
const dao = require('../../utils/DAO')

let usuario
let response

describe('POST /usuarios', () => {
  beforeEach(() => {
    usuario = user.dadosDoUsuarioComum()
  })

  describe('Criar usuário através da rota POST com sucesso', () => {
    it('Cadastrar um novo usuário comum com sucesso', async () => {
      response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Cadastro realizado com sucesso')
    })

    it('Cadastrar um novo usuário administrador com sucesso', async () => {
      usuario.administrador = 'true'
      response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(201)
    })

    afterEach(() => {
      const user = {
        id: response.body._id
      }
      dao.clearAllUsersFromDBButMockData(user)
    })
  })

  describe('Criar usuário através da rota POST sem sucesso', () => {
    it('Tentar cadastrar um usuário com email já existente deve falhar', async () => {
      usuario.email = 'fulano@qa.com'
     response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', 'Este email já está sendo usado')
    })

    it('Tentar cadastrar um usuário com o nome em branco deve falhar', async () => {
      usuario.nome = ''
      response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({ nome: 'nome não pode ficar em branco' })
    })
  })
})
