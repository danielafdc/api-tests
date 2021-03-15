const user = require('../utils/userData')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

var usuario
var user_id

beforeEach( async () => {
  usuario = user.dadosDoUsuario()

  const response_user = await user.criarUsuario(usuario)

  user_id = await response_user.body._id
})

describe('Excluir um usuário através da rota DELETE com sucesso', () => {
  it('Excluir um usuário com sucesso pelo id', async () => {
    const response = await testServer.delete(rota.rotaUsuarios + '/' + user_id)
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
