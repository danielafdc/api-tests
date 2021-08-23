const user = require('../../dataFactory/userData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')

let usuario

describe('POST /usuarios', () => {
  beforeEach(() => {
    usuario = user.dadosDoUsuarioComum()
  })

  describe('Criar usuário através da rota POST com sucesso', () => {
    it('Cadastrar um novo usuário comum com sucesso', async () => {
      const response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(201)
      expect(response.body).toHaveProperty('message', 'Cadastro realizado com sucesso')
    })

    it('Cadastrar um novo usuário administrador com sucesso', async () => {
      usuario.administrador = 'true'
      const response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(201)
    })
  })

  describe('Criar usuário através da rota POST sem sucesso', () => {
    it('Tentar cadastrar um usuário com email já existente deve falhar', async () => {
      usuario.email = 'fulano@qa.com'
      const response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', 'Este email já está sendo usado')
    })

    it('Tentar cadastrar um usuário com o nome em branco deve falhar', async () => {
      usuario.nome = ''
      const response = await testServer.post(rota.rotaUsuarios)
        .send(usuario)
      expect(response.status).toBe(400)
      expect(response.body).toMatchObject({ nome: 'nome não pode ficar em branco' })
    })
  })
})
