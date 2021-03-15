const user = require('../utils/userData')
const testServer = require('../utils/testServer')
const rota = require('../utils/rotas')

let usuario
let user_id

beforeEach( async (done) => {
  usuario = user.dadosDoUsuario()

  const response_user = await user.criarUsuario(usuario)

  user_id = await response_user.body._id
  done()
})

describe('Editar um usuário através da rota PUT com sucesso', () => {
  it('Editar o nome do usuário com sucesso', async () => {
    const response = await testServer.put(rota.rotaUsuarios + '/' + user_id)
      .send({'nome': 'Nome alterado',
            'email': usuario.email,
            'password': usuario.password,
            'administrador': usuario.administrador
            })
    expect(response.status).toBe(200)
    expect(response.body).toHaveProperty('message', 'Registro alterado com sucesso')
  })
}),

describe('Editar um usuário através da rota PUT sem sucesso', () => {
  it('Editar o email do usuário usando um já existente deve falhar', async () => {
    const response = await testServer.put(rota.rotaUsuarios + '/' + user_id)
      .send({'nome': usuario.nome,
            'email': 'fulano@qa.com',
            'password': usuario.password,
            'administrador': usuario.administrador
            })
    expect(response.status).toBe(400)
    expect(response.body).toHaveProperty('message', 'Este email já está sendo usado')
  })
})
