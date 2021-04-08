const user = require('../dataFactory/userData')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

let usuario
let dadosLogin

describe('POST /login', () => {
  beforeAll(async () => {
    usuario = user.dadosDoUsuarioComum()

    await user.criarUsuario(usuario)
  })

  describe('Realizar login através da rota POST com sucesso', () => {
    it('Realizar login com email e senha', async () => {
      dadosLogin = {
        email: usuario.email,
        password: usuario.password
      }
      const response = await testServer.post(rota.rotaLogin)
        .send(dadosLogin)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Login realizado com sucesso')
    })
  })

  describe('Realizar login através da rota POST sem sucesso', () => {
    it('Tentar realizar login com senha errada deve falhar', async () => {
      dadosLogin = {
        email: usuario.email,
        password: '00000'
      }
      const response = await testServer.post(rota.rotaLogin)
        .send(dadosLogin)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Email e/ou senha inválidos')
    })

    it('Tentar realizar login com senha em branco deve falhar', async () => {
      dadosLogin = {
        email: usuario.email,
        password: ''
      }
      const response = await testServer.post(rota.rotaLogin)
        .send(dadosLogin)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('password', 'password não pode ficar em branco')
    })

    it('Tentar realizar login com usuário não cadastrado deve falhar', async () => {
      dadosLogin = {
        email: 'essenaoexiste@nao.com.br',
        password: usuario.password
      }
      const response = await testServer.post(rota.rotaLogin)
        .send(dadosLogin)
      expect(response.status).toBe(401)
      expect(response.body).toHaveProperty('message', 'Email e/ou senha inválidos')
    })
  })
})
