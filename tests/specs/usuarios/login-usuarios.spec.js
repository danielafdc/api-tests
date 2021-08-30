const user = require('../../dataFactory/userData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')
const dao = require('../../utils/DAO')

let usuario
let dadosLogin

describe('POST /login', () => {
  describe('Realizar login através da rota POST com sucesso', () => {
    let responseSucesso

    beforeEach(async () => {
      usuario = user.dadosDoUsuarioComum()
  
      await user.criarUsuario(usuario)
    })
    
    it('Realizar login com email e senha', async () => {
      dadosLogin = {
        email: usuario.email,
        password: usuario.password
      }
      responseSucesso = await testServer.post(rota.rotaLogin)
        .send(dadosLogin)
      expect(responseSucesso.status).toBe(200)
      expect(responseSucesso.body).toHaveProperty('message', 'Login realizado com sucesso')
    })

    afterEach(() => {
      const user = {
        id: responseSucesso.body._id
      }
      dao.clearAllUsersFromDBButMockData(user)
    })
  })

  describe('Realizar login através da rota POST sem sucesso', () => {
    it('Tentar realizar login com senha errada deve falhar', async () => {
      dadosLogin = {
        email: 'fulano@qa.com',
        password: '00000'
      }
      const response = await testServer.post(rota.rotaLogin).send(dadosLogin)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Email e/ou senha inválidos')
    })

    it('Tentar realizar login com senha em branco deve falhar', async () => {
      dadosLogin = {
        email: 'fulano@qa.com',
        password: ''
      }
     const response = await testServer.post(rota.rotaLogin).send(dadosLogin)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('password', 'password não pode ficar em branco')
    })

    it('Tentar realizar login com usuário não cadastrado deve falhar', async () => {
      dadosLogin = {
        email: 'essenaoexiste@nao.com.br',
        password: '123456'
      }
      const response = await testServer.post(rota.rotaLogin)
        .send(dadosLogin)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Email e/ou senha inválidos')
    })
  })
})
