const user = require('../dataFactory/userData')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

let usuario
let userId

describe('DELETE /usuarios', () => {
  beforeEach(async () => {
    usuario = user.dadosDoUsuarioComum()

    const responseUser = await user.criarUsuario(usuario)

    userId = await responseUser.body._id
  })
  describe('Excluir um usuário através da rota DELETE com sucesso', () => {
    it('Excluir um usuário com sucesso pelo id', async () => {
      const response = await testServer.delete(rota.rotaUsuarios + '/' + userId)
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Registro excluído com sucesso')
    })
  })

  describe('Excluir um usuário através da rota DELETE sem sucesso', () => {
    it('Tentar excluir um usuário inexistente', async () => {
      const response = await testServer.delete(rota.rotaUsuarios + '/' + 'essenaoexiste')
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Nenhum registro excluído')
    })
  })
})
