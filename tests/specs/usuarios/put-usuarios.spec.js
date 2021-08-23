const user = require('../../dataFactory/userData')
const testServer = require('../../utils/testServer')
const rota = require('../../utils/rotas')

let usuario
let userId

describe('PUT /usuarios', () => {
  beforeEach(async () => {
    usuario = user.dadosDoUsuarioAdmin()

    const responseUser = await user.criarUsuario(usuario)

    userId = await responseUser.body._id
  })

  describe('Editar um usuário através da rota PUT com sucesso', () => {
    it('Editar o nome do usuário com sucesso', async () => {
      const response = await testServer.put(rota.rotaUsuarios + '/' + userId)
        .send({
          nome: 'Nome alterado',
          email: usuario.email,
          password: usuario.password,
          administrador: usuario.administrador
        })
      expect(response.status).toBe(200)
      expect(response.body).toHaveProperty('message', 'Registro alterado com sucesso')
    })
  })

  describe('Editar um usuário através da rota PUT sem sucesso', () => {
    it('Editar o email do usuário usando um já existente deve falhar', async () => {
      const response = await testServer.put(rota.rotaUsuarios + '/' + userId)
        .send({
          nome: usuario.nome,
          email: 'fulano@qa.com',
          password: usuario.password,
          administrador: usuario.administrador
        })
      expect(response.status).toBe(400)
      expect(response.body).toHaveProperty('message', 'Este email já está sendo usado')
    })
  })
})
